import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// A function to render stars based on rating
const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Determine if there's a half star
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

    return (
        <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => (
                <span key={i}>&#9733;</span> // Full star: ★
            ))}
        </div>
    );
};

const index = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [mainImage, setMainImage] = useState(''); // State for the main product image

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(response.data); // Set the product data into state
                setMainImage(response.data.productImg[0]); // Set the first image as the default main image
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // Handle quantity input change
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > product.quantity) {
            setErrorMessage(`You cannot buy more than ${product.quantity} items.`);
        } else {
            setErrorMessage('');
            setQuantity(value);
        }
    };

    // Handle thumbnail click to change the main image
    const handleImageClick = (imgSrc) => {
        setMainImage(imgSrc);
    };

    if (!product) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="container mx-auto p-6">
            <div style={{marginTop:"5rem"}}  className="flex flex-col md:flex-row gap-8">
                {/* Product Images */}
                <div className="md:w-1/2">
                    {/* Main Product Image */}
                    <img
                        src={mainImage}
                        alt="Product"
                        className="w-full h-auto object-cover mb-4"
                    />
                    {product.salePercentage > 0 && (
                        <span style={{marginTop:"5rem"}}  className="text-red-500 font-semibold text-lg absolute top-4 left-4 bg-red-200 px-2 py-1 rounded-lg">
                            Sale {product.salePercentage}%
                        </span>
                    )}

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-4">
                        {product.productImg.map((imgSrc, index) => (
                            <img
                                key={index}
                                src={imgSrc}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-16 h-16 object-cover cursor-pointer border ${mainImage === imgSrc ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => handleImageClick(imgSrc)} // Change main image on click
                            />
                        ))}
                    </div>


                </div>

                {/* Product Details */}
                <div className="md:w-1/2 space-y-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-500">Category: {product.productCategory}</p>

                    {/* Average Rating */}
                    {product.avgRating > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Rating:</span>
                            {renderStars(product.avgRating)}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <span className="text-2xl line-through text-gray-400">Rs. {product.price}</span>
                        <span className="text-4xl text-red-600 font-bold">Rs. {(product.price - product.price * (product.salePercentage / 100)).toFixed(2)}</span>
                    </div>

                    {/* Stock Info */}
                    <div className="flex items-center gap-4">
                        <span className="font-bold">In Stock: {product.quantity}</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                        <span className="font-bold">Quantity:</span>
                        <input
                            type="number"
                            min="1"
                            max={product.quantity} // Limit the input value to stock available
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="border rounded-lg w-16 text-center py-2"
                        />
                    </div>

                    {/* Description Panel */}
                    <div className="bg-gray-100 p-4 mt-8 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Product Details</h2>
                        <p className="mb-2">
                            <span className="font-semibold">Dimension:</span> {product.description.dimension}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Material:</span> {product.description.material}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Detailed Description:</span> {product.description.detailedDescription}
                        </p>
                    </div>

                    {/* Error Message */}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <div className="flex gap-4 mt-4">
                        <button
                            className="bg-orange-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-orange-600"
                            disabled={quantity > product.quantity} // Disable button if quantity exceeds stock
                        >
                            Add to Cart
                        </button>
                        <button className="bg-white border border-gray-300 rounded-lg px-6 py-3 font-semibold hover:bg-gray-100">
                            Buy It Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
