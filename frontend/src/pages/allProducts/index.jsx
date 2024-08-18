import React, { useState, useEffect } from "react";
import axios from "axios";
import FavouriteButton from "../../components/favouriteButton";
import AddToCartButton from "../../components/cartButton";
import { FaStar } from "react-icons/fa";

const ProductList = () => {

    const products = [
      {
        _id: "1",
        name: "Apple Watch Series 7",
        productImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zei5FVv8t9JEHBUFzkH29Iysu4Zp0QKN9g&s",
        description: {
          dimension: "40mm x 34mm x 10.7mm",
          material: "Stainless Steel",
          detailedDescription:
            "Stay connected, stay active, and stay healthy with the Apple Watch Series 7.",
        },
        quantity: 10,
        avgRating: 4.5,
        price: 399.99,
        salePercentage: 10,
        productCategory: "Electronics",
      },
      {
        _id: "2",
        name: "Nike Air Max 270",
        productImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU3gIIflNifsedZHYNm9aqzI2BXzf1h1ZJ5g&s",
        description: {
          dimension: "US 8-13",
          material: "Synthetic",
          detailedDescription:
            "Experience the comfort and style of the Nike Air Max 270, featuring a full-length air unit for maximum impact protection.",
        },
        quantity: 20,
        avgRating: 0,
        price: 129.99,
        salePercentage: 0,
        productCategory: "Shoes",
      },
      {
        _id: "3",
        name: "Sony Wireless Headphones",
        productImg:
          "https://www.jori.com/sites/default/files/styles/j2_h400/public/centerflow/jori-eden-36_reference_0.jpg?itok=QEj77hj2",
        description: {
          dimension: "7.3 x 2.9 x 10.4 inches",
          material: "Plastic",
          detailedDescription:
            "Enjoy industry-leading noise cancellation and exceptional sound quality with the Sony WH-1000XM4 Wireless Headphones.",
        },
        quantity: 15,
        avgRating: 4.9,
        price: 349.99,
        salePercentage: 15,
        productCategory: "Electronics",
      },
      {
        _id: "4",
        name: "Sony Wireless Headphones",
        productImg:
          "https://www.jori.com/sites/default/files/styles/j2_h400/public/centerflow/jori-eden-36_reference_0.jpg?itok=QEj77hj2",
        description: {
          dimension: "7.3 x 2.9 x 10.4 inches",
          material: "Plastic",
          detailedDescription:
            "Enjoy industry-leading noise cancellation and exceptional sound quality with the Sony WH-1000XM4 Wireless Headphones.",
        },
        quantity: 15,
        avgRating: 4.9,
        price: 349.99,
        salePercentage: 50,
        productCategory: "Electronics",
      },
    ];
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/products");
//         setProducts(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="w-full grid-cols-1 grid grid-rows-[repeat(auto-fit,1fr)] gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    productImg,
    description,
    price,
    avgRating,
    salePercentage,
    productCategory,
  } = product;

  return (
    <div className="bg-timberWolf rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={productImg}
          alt={name}
          className="w-full rounded-r-xl-xl h-40 bg-slate-300 object-cover"
        />
        <div className="absolute top-3 w-full px-3 flex justify-between">
          {salePercentage && (
            <p className="bg-red-500 text-white text-[16px] font-bold px-2 rounded-lg">
              -{salePercentage}%
            </p>
          )}
          <div className="flex space-x-2">
            <FavouriteButton productId={_id} size="32px" />
            <AddToCartButton productId={_id} size="32px" />
          </div>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-semibold mb-2">{productCategory}</p>
        <h4 className="text-base font-semibold mb-0">{name}</h4>
        <p className="text-[14px] mb-2">
          Made with {description.material} and has a dimension of{" "}
          {description.dimension}
        </p>

        <div className="flex justify-between mb-2">
          {salePercentage > 0 ? (
            <div className="flex gap-3">
              <span className="text-[14px] text-gray-500 font-semibold line-through">
                ${price}
              </span>
              <span className="text-sm text-red-500 font-semibold">
                ${(price - price * (salePercentage / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-end text-sm font-semibold">${price}</span>
          )}
          {avgRating > 0 ? (
            <div className="flex items-center justify-center gap-2 font-semibold">
            <span className="text-sm">{avgRating}</span>
            <span className="text-yellow-600 text-base">
              <FaStar />
            </span>
          </div>
          ) : (
            <></>
          )}  
        </div>
      </div>
    </div>
  );
};

export default ProductList;
