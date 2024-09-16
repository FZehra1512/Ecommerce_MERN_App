import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/admin/getCategories");
        setCategories(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

return (
  <div className="p-6">
    <h1 className="text-3xl font-semibold mb-4 text-outerSpace">Manage Categories</h1>
    <div className="overflow-x-auto w-full">
      <table className="min-w-[768px] w-full bg-gray-100">
        <thead className="bg-outerSpace text-white text-sm">
          <tr>
            <th className="py-1 px-4 border border-x-white text-left">
              Serial #
            </th>
            <th className="py-1 px-4 border border-x-white text-left">Image</th>
            <th className="py-1 px-4 border border-x-white text-left">Name</th>
            <th className="py-1 px-4 border border-x-white text-left">
              Description
            </th>
            <th className="py-1 px-4 border border-x-white text-left">
              Parent Category
            </th>
            <th className="py-1 px-4 border border-x-white text-left">
              Last Updated
            </th>
            <th className="py-1 px-4 border border-x-white text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Render 5 skeleton rows during loading
            <>
              <ViewCategorySkeleton />
              <ViewCategorySkeleton />
              <ViewCategorySkeleton />
              <ViewCategorySkeleton />
              <ViewCategorySkeleton />
            </>
          ) : categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <tr
                key={category._id}
                className="bg-gray-100 border-b border-gray-400 hover:bg-gray-200 text-xs"
              >
                <td className="py-1 px-4">{index + 1}</td>
                <td className="py-1 px-4">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-ashGrey flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-1 px-4">{category.name}</td>
                <td className="py-1 px-4">{category.description}</td>
                <td className="py-1 px-4">
                  {category.parentCategory
                    ? categories.find(
                        (cat) => cat._id === category.parentCategory
                      )?.name || "N/A"
                    : "N/A"}
                </td>
                <td className="py-1 px-4">
                  {new Date(category.updatedAt).toLocaleDateString()}
                </td>
                <td className="py-6 px-4 flex justify-around">
                  <button className="text-outerSpace hover:text-blue-600">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
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
                <td colSpan="7" className="text-center py-4">
                  No Categories Available
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default ManageCategory;


const ViewCategorySkeleton = () => {
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
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-2 px-4 flex space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
};
