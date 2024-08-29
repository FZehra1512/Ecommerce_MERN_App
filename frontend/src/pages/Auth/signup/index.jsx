import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        contact: "",
        profileImg: "",
        // userType: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
        gender: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [name]: value,
            },
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/register", formData);
            if (response.status === 201) {
                navigate("/");;
                // Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'strict', path: '/' });
                toast.success("Signup successful");
            }
        } catch (error) {
            setError(error.message);
        }
        console.log(error)
    };

    const steps = [
        {
            label: "Name",
            element: (
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                />
            ),
        },
        {
            label: "Email",
            element: (
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                />
            ),
        },
        {
            label: "Password",
            element: (
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                />
            ),
        },
        {
            label: "Contact",
            element: (
                <input
                    type="text"
                    name="contact"
                    id="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your contact number"
                />
            ),
        },
        {
            label: "Gender",
            element: (
                <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            ),
        },
        // {
        //   label: "Profile Image URL",
        //   element: (
        //     <input
        //       type="text"
        //       name="profileImg"
        //       id="profileImg"
        //       value={formData.profileImg}
        //       onChange={handleChange}
        //       className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        //       placeholder="Enter profile image URL"
        //     />
        //   ),
        // },
        // {
        //   label: "User Type",
        //   element: (
        //     <input
        //       type="text"
        //       name="userType"
        //       id="userType"
        //       value={formData.userType}
        //       onChange={handleChange}
        //       className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        //       placeholder="Enter user type"
        //     />
        //   ),
        // },
        {
            label: "Address",
            element: (
                <>
                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={handleAddressChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.address.zipCode}
                        onChange={handleAddressChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.address.country}
                        onChange={handleAddressChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </>
            ),
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-fit overflow-hidden">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-20 overflow-hidden" >
                    <div className="relative h-full" style={{ height: "12rem" }}>
                        <div
                            className={`absolute inset-0 transition-transform transform ${step > 0 ? "translate-x-full" : ""
                                }`}
                        >
                            {steps[0].element}
                        </div>
                        {steps.slice(1).map((stepData, index) => (
                            <div
                                key={index + 1}
                                className={`absolute inset-0 transition-transform transform ${step === index + 1 ? "translate-x-0" : "translate-x-full"
                                    }`}
                            >
                                {stepData.element}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between ">
                        {step > 0 && (
                            <button
                                onClick={handlePrev}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Back
                            </button>
                        )}
                        {step < steps.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="ml-auto bg-green-600 text-white px-4 py-2 rounded-md"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
