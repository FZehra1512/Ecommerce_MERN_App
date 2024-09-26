import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import LoadingButton from "../../../components/loadingButton";

const AddProd = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [showCategories, setShowCategories] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [image, setImage] = useState(null);
    const initialFormData = {
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
    };

    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
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

    const handleSubmitt = async (data, e) => {
        e.preventDefault();
        setDisabled(true);
        const token = Cookies.get('token');
        const formDataToSend = new FormData();


        if (showCategories == false) {
            const categoryData = new FormData();
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
            var categoryResponse = await axios.post(
                "http://localhost:5000/admin/addCategory",
                categoryData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            // console.log("Form data:", formData.productCategory);
            // console.log("categoryResponse data:", categoryResponse.data.newCategory._id);
            if (categoryResponse.status === 201) {
                toast.success(categoryResponse.data.message);

            }
        }

        formDataToSend.append('token', token);
        formDataToSend.append('formData', JSON.stringify({
            name: formData.name,
            description: formData.description,
            quantity: formData.quantity,
            avgRating: formData.avgRating,
            price: formData.price,
            salePercentage: formData.salePercentage,
            productCategory: showCategories
                ? formData.productCategory
                : categoryResponse.data.newCategory._id,
        }));

        for (let i = 0; i < formData.productImg.length; i++) {
            formDataToSend.append('productImg', formData.productImg[i]);
        }

        try {
          const response = await axios.post(
            "http://localhost:5000/admin/addProduct",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Ensure the correct content type is set,
                Authorization: ` Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            toast.success("Product Added Successfully");
          }
        } catch (error) {
          console.log(error.message);
          toast.error("Some Error Occurred, Try again");
        } finally {
          setDisabled(false);
          reset();
          setFormData(initialFormData);
        }
    };

    return (
      <form
        onSubmit={handleSubmit(handleSubmitt)}
        encType="multipart/form-data"
        className="w-full relative top-2 max-w-lg mx-auto p-4 space-y-6"
        disabled={disabled}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <div>
          <label className=" block text-sm font-bold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm "
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            Dimension
          </label>
          <input
            type="text"
            name="description.dimension"
            value={formData.description.dimension}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            Material
          </label>
          <input
            type="text"
            name="description.material"
            value={formData.description.material}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 ">
            Detailed Description
          </label>
          <textarea
            name="description.detailedDescription"
            value={formData.description.detailedDescription}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            required
            name="productImg"
            onChange={handleChange}
            multiple
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            Sale Percentage
          </label>
          <input
            type="number"
            name="salePercentage"
            value={formData.salePercentage}
            onChange={handleChange}
            min="0"
            max="100"
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
          />
        </div>

        {showCategories && (
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Product Category
            </label>
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div
          className={`cursor-pointer inline-block px-4 py-2 rounded-md transition duration-300 
        ${
          showCategories
            ? " bg-ashGray text-outerSpace py-2 px-4 rounded-md shadow-sm hover:bg-outerSpace hover:text-ashGray"
            : "bg-outerSpace text-ashGray hover:bg-ashGray hover:text-outerSpace"
        }`}
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? "Add New Category" : "Select a Category"}
        </div>

        {!showCategories && (
          <div>
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
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
                // required
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            {/* <div className="cursor-pointer">
                        Show Categories
                    </div> */}

            {/* <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Add Category
                    </button> */}
          </div>
        )}

        <LoadingButton
          text="Submit"
          disabled={disabled}
          buttonClass={
            "w-full py-2 bg-ashGray text-outerSpace font-semibold rounded-md hover:bg-outerSpace hover:text-ashGray transition duration-300"
          }
        />
        {/* <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Submit
        </button> */}
      </form>
    );
};

export default AddProd;
