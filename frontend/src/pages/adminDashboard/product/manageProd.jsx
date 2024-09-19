import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = Cookies.get("token");
            const response = await axios.delete(`http://localhost:5000/admin/deleteProduct/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.message);
            fetchProducts();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching product:', error);
        }
    }

    return (
        <div className="p-0">
            <h1 className="text-3xl font-semibold mb-4 text-outerSpace">Manage Products</h1>
            <div className="overflow-x-auto w-full">
                <table className="min-w-[768px] w-full bg-gray-100">
                    <thead className="bg-outerSpace text-white text-sm">
                        <tr>
                            <th className="py-1 px-4 border border-x-white text-left">Serial #</th>
                            <th className="py-1 px-4 border border-x-white text-left">Image</th>
                            <th className="py-1 px-4 border border-x-white text-left">Name</th>
                            <th className="py-1 px-4 border border-x-white text-left">Description</th>
                            <th className="py-1 px-4 border border-x-white text-left">Category</th>
                            <th className="py-1 px-4 border border-x-white text-left">Price</th>
                            <th className="py-1 px-4 border border-x-white text-left">Quantity</th>
                            <th className="py-1 px-4 border border-x-white text-left">Avg. Rating</th>
                            <th className="py-1 px-4 border border-x-white text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            // Render 5 skeleton rows during loading
                            <>
                                <ViewProductSkeleton />
                                <ViewProductSkeleton />
                                <ViewProductSkeleton />
                                <ViewProductSkeleton />
                                <ViewProductSkeleton />
                            </>
                        ) : products && products.length > 0 ? (
                            products.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className="bg-gray-100 border-b border-gray-400 hover:bg-gray-200 text-xs"
                                >
                                    <td className="py-1 px-4">{index + 1}</td>
                                    <td className="py-1 px-4">
                                        {product.productImg.length > 0 ? (
                                            <img
                                                src={product.productImg[0]} // Assuming the first image is used for display
                                                alt={product.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-ashGrey flex items-center justify-center">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-1 px-4">{product.name}</td>
                                    <td className="py-1 px-4">
                                        {product?.description?.detailedDescription || "No Description"}
                                    </td>
                                    <td className="py-1 px-4">
                                        {product.productCategory ? product.productCategory.name : "N/A"}
                                    </td>
                                    <td className="py-1 px-4">Rs.{product.price}</td>
                                    <td className="py-1 px-4">{product.quantity}</td>
                                    <td className="py-1 px-4">{product.avgRating.toFixed(1)}</td>
                                    <td className="py-6 px-4 flex justify-around">
                                        <button className="text-outerSpace hover:text-blue-600">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            error ? (
                                <div className="w-full flex justify-center items-center text-base">{error}</div>
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">
                                        No Products Available
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;

// Loading Skeleton Component
const ViewProductSkeleton = () => {
    return (
        <tr className="animate-pulse">
            <td className="py-2 px-4">
                <div className="w-8 h-4 bg-gray-300 rounded"></div>
            </td>
            <td className="py-2 px-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </td>
            <td className="py-2 px-4">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </td>
            <td className="py-2 px-4">
                <div className="w-40 h-4 bg-gray-300 rounded"></div>
            </td>
            <td className="py-2 px-4">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </td>
            <td className="py-2 px-4">
                <div className="w-12 h-4 bg-gray-300 rounded"></div>
            </td>
            <td className="py-2 px-4">
                <div className="w-12 h-4 bg-gray-300 rounded"></div>
            </td>
            <td className="py-2 px-4">
                <div className="w-8 h-4 bg-gray-300 rounded"></div>
            </td>
            <td className="py-2 px-4 flex space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </td>
        </tr>
    );
};
