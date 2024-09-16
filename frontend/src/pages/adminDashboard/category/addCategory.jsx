import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

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

  const onSubmit = async (data) => {
    try {
      // Prepare form data
      const categoryData = new FormData();

      const token = Cookies.get("token");
      categoryData.append("token", token);

      categoryData.append(
        "categoryData",
        JSON.stringify({
          name: data.name,
          description: data.description,
          parentCategory:
            data.parentCategory === "Parent Itself"
              ? null
              : data.parentCategory,
        })
      );
      if (image) {
        categoryData.append("categoryImg", image);
      }

      // Submit data to API
      const response = await axios.post(
        "http://localhost:5000/admin/addCategory",
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data.message);
        reset();
      }
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded p-2 w-full`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded p-2 w-full`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="parentCategory"
          >
            Parent Category
          </label>
          <select
            id="parentCategory"
            {...register("parentCategory", {
              required: "Parent category is required",
            })}
            className={`border ${
              errors.parentCategory ? "border-red-500" : "border-gray-300"
            } rounded p-2 w-full`}
          >
            <option value="Parent Itself">Parent Itself</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.parentCategory && (
            <p className="text-red-500 text-xs mt-1">
              {errors.parentCategory.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
