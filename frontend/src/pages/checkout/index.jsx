import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

// TODO: First give select address option when address array is more than 1
// TODO: When user submits the checkout form, and address is not the same as user previous addresses
// then add the address in the user addresses array and then add the order.

export const countries = [
  { name: "Pakistan", phoneCode: "+92", standardShipping: 5, expressShipping: 15 },
  { name: "United States", phoneCode: "+1", standardShipping: 10, expressShipping: 20 },
  { name: "United Kingdom", phoneCode: "+44", standardShipping: 8, expressShipping: 18 },
  { name: "India", phoneCode: "+91", standardShipping: 7, expressShipping: 17 },
  { name: "Canada", phoneCode: "+1", standardShipping: 12, expressShipping: 22 },
  { name: "Australia", phoneCode: "+61", standardShipping: 15, expressShipping: 25 },
  { name: "Germany", phoneCode: "+49", standardShipping: 9, expressShipping: 19 },
  { name: "France", phoneCode: "+33", standardShipping: 9, expressShipping: 19 },
  { name: "China", phoneCode: "+86", standardShipping: 6, expressShipping: 16 },
  { name: "Japan", phoneCode: "+81", standardShipping: 10, expressShipping: 20 }
];

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [userData, setUserData] = useState({});

  // Fetch user details if token is available
  const fetchUserData = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUserData(response.data.userDetails);
        } 
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  console.log(userData)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  // Auto-reset form values whenever userData changes
  useEffect(() => {
    if (userData) {
      reset({
        emailAddress: userData.email,
        phoneNumber: userData.contact
          ? userData.contact.slice(userData.contact.indexOf(" ") + 1)
          : "",
        firstName: userData.name ? userData.name.split(" ")[0] : "",
        lastName:
          userData.name && userData.name.split(" ").length > 1
            ? userData.name.split(" ")[1]
            : "",
        country:
          userData.address && userData.address[0]?.country
            ? userData.address[0].country
            : "Pakistan",
        houseAddress:
          userData.address && userData.address[0]?.street
            ? userData.address[0].street
            : "",
        city:
          userData.address && userData.address[0]?.city
            ? userData.address[0].city
            : "",
        state:
          userData.address && userData.address[0]?.state
            ? userData.address[0].state
            : "",
        zipCode:
          userData.address && userData.address[0]?.zipCode
            ? userData.address[0].zipCode
            : "",
      });
    }
  }, [userData, reset]);

  // Update phone code whenever the country changes
  useEffect(() => {
    setValue("phoneCode", selectedCountry.phoneCode);
  }, [selectedCountry, setValue]);

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    // Handle the form submission, e.g., API call
  };

  const handleErrorToast = () => {
    for (const [field, error] of Object.entries(errors)) {
      if (Object.entries(errors).length > 1) {
        toast.error(`Please fill out the ${field} field.`);
      }
      break;
    }
  };

  const errorClass = "text-red-500 mt-1 text-sm";
  const radioButtonClass = "mr-2 w-4 h-4";

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit, handleErrorToast)}>
        {/* Contact Information Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <label>
                Email Address <span className={errorClass}>*</span>
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                {...register("emailAddress", {
                  required: {
                    value: true,
                    message: "Please enter email address",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`w-full p-2 border ${
                  errors.emailAddress ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.emailAddress && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>

            <div>
              <label>
                Phone Number <span className={errorClass}>*</span>
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 border border-r-0 bg-gray-200 rounded-l">
                  {selectedCountry.phoneCode}
                </span>
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Please enter your phone number",
                    },
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Please enter a 10-digit phone number",
                    },
                  })}
                  placeholder="1234567890"
                  className={`w-full p-2 border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded-r`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>
                First Name <span className={errorClass}>*</span>
              </label>
              <input
                type="text"
                placeholder="John"
                {...register("firstName", { required: true })}
                className={`w-full p-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.firstName && (
                <p className={errorClass}>Please enter your first name</p>
              )}
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                {...register("lastName")}
                className={`w-full p-2 border border-gray-300 rounded`}
              />
            </div>
            <div className="col-span-2">
              <label>
                Country <span className={errorClass}>*</span>
              </label>
              <select
                {...register("country", { required: true })}
                value={selectedCountry.name}
                onChange={(e) =>
                  setSelectedCountry(
                    countries.find((c) => c.name === e.target.value)
                  )
                }
                className={`w-full p-2 border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded`}
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">
                  Please select your country
                </p>
              )}
            </div>
            <div className="col-span-2">
              <label>
                House Address <span className={errorClass}>*</span>
              </label>
              <input
                type="text"
                placeholder="A-350, Street # 07, Block 14, Near...."
                {...register("houseAddress", { required: true })}
                className={`w-full p-2 border ${
                  errors.houseAddress ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.houseAddress && (
                <p className={errorClass}>Please enter your address</p>
              )}
            </div>
            <div>
              <label>
                City <span className={errorClass}>*</span>
              </label>
              <input
                type="text"
                placeholder="Karachi"
                {...register("city", { required: true })}
                className={`w-full p-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.city && (
                <p className={errorClass}>Please enter your city</p>
              )}
            </div>
            <div>
              <label>
                State <span className={errorClass}>*</span>
              </label>
              <input
                type="text"
                placeholder="Sindh"
                {...register("state", { required: true })}
                className={`w-full p-2 border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.state && (
                <p className={errorClass}>Please enter your state</p>
              )}
            </div>
            <div>
              <label>Zip Code</label>
              <input
                type="text"
                placeholder="76146"
                {...register("zipCode")}
                className={`w-full p-2 border border-gray-300 rounded`}
              />
            </div>
          </div>
        </div>

        {/* Shipping Method Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
          <div className="flex flex-col space-y-2">
            <label>
              <input
                type="radio"
                defaultChecked
                {...register("shippingMethod", { required: true })}
                value="standard"
                className={radioButtonClass}
              />
              Standard Shipping (PKR {selectedCountry.standardShipping})
            </label>
            <label>
              <input
                type="radio"
                {...register("shippingMethod", { required: true })}
                value="express"
                className={radioButtonClass}
              />
              Express Shipping (PKR {selectedCountry.expressShipping})
            </label>
            {errors.shippingMethod && (
              <p className={errorClass}>Please enter your shipping method</p>
            )}
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex flex-col space-y-2">
            <label>
              <input
                type="radio"
                defaultChecked
                {...register("paymentMethod", { required: true })}
                value="cod"
                className={radioButtonClass}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery (COD)
            </label>
            <label>
              <input
                type="radio"
                {...register("paymentMethod", { required: true })}
                value="creditDebit"
                className={radioButtonClass}
                onChange={() => setPaymentMethod("creditDebit")}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                {...register("paymentMethod", { required: true })}
                value="bankTransfer"
                className={radioButtonClass}
                onChange={() => setPaymentMethod("bankTransfer")}
              />
              Bank Transfer
            </label>
            {errors.paymentMethod && (
              <p className={errorClass}>Please enter your payment method</p>
            )}
          </div>

          {/* Conditional Payment Details */}
          {(paymentMethod === "creditDebit" ||
            paymentMethod === "bankTransfer") && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label>Card/Account Holder Name</label>
                <input
                  type="text"
                  {...register("holderName", {
                    required: paymentMethod !== "cod",
                  })}
                  className={`w-full p-2 border ${
                    errors.holderName ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
              </div>
              <div>
                <label>Card/Account Number</label>
                <input
                  type="text"
                  {...register("accountNumber", {
                    required: paymentMethod !== "cod",
                  })}
                  className={`w-full p-2 border ${
                    errors.accountNumber ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
              </div>
              {paymentMethod === "creditDebit" && (
                <>
                  <div>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      {...register("expiryDate", { required: true })}
                      className={`w-full p-2 border ${
                        errors.expiryDate ? "border-red-500" : "border-gray-300"
                      } rounded`}
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input
                      type="text"
                      {...register("cvv", { required: true })}
                      className={`w-full p-2 border ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      } rounded`}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-ashGray text-outerSpace py-3 rounded hover:bg-outerSpace hover:text-ashGray transition duration-200"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
