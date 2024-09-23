import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const EditCategoryModal = ({ category, categories, closeModal, fetchCategories }) => {
  const [image, setImage] = useState(null);
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory || "",
    },
  });

  useEffect(() => {
    reset(category);
  }, [category, reset]);

  const watchFields = watch();

  const isModified =
    watchFields.name !== category.name ||
    watchFields.description !== category.description ||
    watchFields.parentCategory !== category.parentCategory;

  // Dynamically build modifiedFields by comparing watchFields with category
  const modifiedFields = Object.entries(watchFields).reduce(
    (acc, [key, value]) => {
      if (value !== category[key]) {
        acc[key] = value === "" ? null : value; // Handle empty string to null conversion for parentCategory
      }
      return acc;
    },
    {}
  );

  const onSubmit = async (data) => {
    if (Object.keys(modifiedFields).length === 0 && !image) {
      toast.error("No changes detected.");
      return;
    }

    try {
      // Prepare form data
      const categoryData = new FormData();

      const token = Cookies.get("token");
      categoryData.append("token", token);

      console.log(modifiedFields)
      if (Object.keys(modifiedFields).length > 0) {
        categoryData.append("categoryData", JSON.stringify(modifiedFields));
      }

      if (image) {
        categoryData.append("categoryImg", image);
      }

      console.log(categoryData)
      const response = await axios.patch(
        `http://localhost:5000/admin/updateCategory/${category._id}`,
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        closeModal();
        reset();
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed pt-[4.5rem] lg:ml-56 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-md w-2/3 mx-auto p-4 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out transform scale-105">
        <h2 className="text-2xl font-bold mb-3">Edit Category</h2>
        <button className="absolute top-4 right-4" onClick={closeModal}>
          <RxCross1 />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-3">
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
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-3">
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
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="parentCategory"
            >
              Parent Category
            </label>
            <select
              id="parentCategory"
              {...register("parentCategory")}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="">Parent Itself</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
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
            className="bg-ashGray text-outerSpace py-2 px-4 rounded hover:bg-outerSpace hover:text-ashGray"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};


export default EditCategoryModal;