import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const AddProd = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: {
            dimension: "",
            material: "",
            detailedDescription: "",
        },
        productImg: [],
        quantity: 0,
        avgRating: 0,
        price: 0,
        salePercentage: 0,
        productCategory: "",
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories for dropdown
        const fetchCategories = async () => {
          try {
            const response = await axios.get("http://localhost:5000/admin/getCategories");
            setCategories(response.data);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        fetchCategories();
      }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name.startsWith("description.")) {
            const key = name.split(".")[1];
            setFormData((prevData) => ({
                ...prevData,
                description: {
                    ...prevData.description,
                    [key]: value,
                },
            }));
        } else if (name === "productImg") {
            setFormData((prevData) => ({
                ...prevData,
                productImg: files, // Store files directly in productImg
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        const formDataToSend = new FormData();

        // Append all fields to FormData
        formDataToSend.append('token', token);
        formDataToSend.append('formData', JSON.stringify({
            name: formData.name,
            description: formData.description,
            quantity: formData.quantity,
            avgRating: formData.avgRating,
            price: formData.price,
            salePercentage: formData.salePercentage,
            productCategory: formData.productCategory,
        }));

        // Append each image file to FormData
        for (let i = 0; i < formData.productImg.length; i++) {
            formDataToSend.append('productImg', formData.productImg[i]);
        }

        try {
            const response = await axios.post("http://localhost:5000/admin/addProduct", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure the correct content type is set,
                    'Authorization': ` Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success("Product Added Successfully");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Some Error Occurred, Try again");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full relative top-20 max-w-lg mx-auto p-4 space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Dimension</label>
                <input
                    type="text"
                    name="description.dimension"
                    value={formData.description.dimension}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Material</label>
                <input
                    type="text"
                    name="description.material"
                    value={formData.description.material}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
                <textarea
                    name="description.detailedDescription"
                    value={formData.description.detailedDescription}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Product Images</label>
                <input
                    type="file"
                    name="productImg"
                    onChange={handleChange}
                    multiple
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Sale Percentage</label>
                <input
                    type="number"
                    name="salePercentage"
                    value={formData.salePercentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Product Category</label>
                <select
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default AddProd;
