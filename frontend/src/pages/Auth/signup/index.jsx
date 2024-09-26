import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { countries } from "../../checkout";
import LoadingButton from "../../../components/loadingButton";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const [step, setStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [formData, setFormData] = useState({});

  // Update phone code whenever the country changes
  useEffect(() => {
    setValue("phoneCode", selectedCountry.phoneCode);
  }, [selectedCountry, setValue]);

  const onSubmit = async (data) => {
    if (data.honeypot) {
      reset();
      console.log("Spam alert, discarding signup!");
      return;
    }
    const { email, password, name, phone, address, gender } = data;

    // Post data
    try {
      // Disable form while processing submission
      setDisabled(true);
      const contact = selectedCountry.phoneCode + " " + phone;
      const signUpData = {
        email,
        password,
        name,
        contact,
        address,
        gender,
      };

      const response = await axios.post(
        "http://localhost:5000/api/register",
        signUpData
      );
      if (response.status === 201) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Email Already Exists, Sign Up again");
        console.error("Response data:", error.response.data);
      } else {
        toast.error("Form submission is failed");
        console.error("Response data:", error.response.data);
      }
      setStep(0);
    } finally {
      setDisabled(false);
      reset();
    }
  };

  const handleNext = (data) => {
    setStep(step + 1);
    setFormData((prevData) => ({ ...prevData, ...data }));
    // setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep(step - 1);
    // setStep((prevStep) => prevStep - 1);
  };
  const commonLabelClass = "block text-outerSpace font-semibold mb-2";
  const commonInputClass =
    "w-full px-4 py-2 border border-outerSpace rounded-md focus:outline-none focus:ring-2 focus:ring-ashGray";
  const errorClass = "text-red-500 mt-1 text-sm";
  const buttonClass =
    "w-1/4 py-2 bg-ashGray text-outerSpace font-semibold rounded-md hover:bg-outerSpace hover:text-ashGray transition duration-300";

  const StepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-3">
            <div>
              <label className={commonLabelClass}>Name</label>
              <input
                type="text"
                name="name"
                className={commonInputClass}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter your name",
                  },
                })}
              />
              {errors.name && (
                <p className={errorClass}>{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className={commonLabelClass}>Email</label>
              <input
                type="email"
                name="email"
                className={commonInputClass}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>
            {/* Honeypot for spam detection */}
            <input
              type="text"
              name="honeypot"
              className="hidden border border-outerSpace"
              {...register("honeypot")}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-3">
            <div>
              <label className={commonLabelClass}>Password</label>
              <input
                type="password"
                name="password"
                className={commonInputClass}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  minLength: {
                    value: 7,
                    message: "Password must be at least 7 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[0-9]).*$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
              />
              {errors.password && (
                <p className={errorClass}>{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className={commonLabelClass}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={commonInputClass}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Please confirm your password",
                  },
                  validate: (value) => {
                    const password = getValues("password");
                    return value === password || "Passwords do not match";
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className={errorClass}>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <div>
              <label className={commonLabelClass}>Address</label>
              <div className="relative">
                <input
                  type="text"
                  name="street"
                  placeholder="House # and Street"
                  className={`${commonInputClass} pr-8`}
                  {...register("address.street", {
                    required: true,
                  })}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
                  *
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className={`${commonInputClass} pr-8`} // Add padding-right for the asterisk
                  {...register("address.city", {
                    required: true,
                  })}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
                  *
                </span>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="state"
                placeholder="State"
                className={commonInputClass}
                {...register("address.state")}
              />
            </div>
            <div>
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                className={commonInputClass}
                {...register("address.zipCode")}
              />
            </div>
            <div className="relative">
              <select
                {...register("address.country", { required: true })}
                value={selectedCountry.name}
                onChange={(e) =>
                  setSelectedCountry(
                    countries.find((c) => c.name === e.target.value)
                  )
                }
                className={`${commonInputClass} pr-8`}
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/4 transform -translate-y-1/2 text-red-500">
                *
              </span>
            </div>
            {(errors.address?.street ||
              errors.address?.city ||
              errors.address?.zipCode ||
              errors.address?.state ||
              errors.address?.country) && (
              <p className={errorClass}>Please enter * required fields</p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <div>
              <label className={commonLabelClass}>Phone Number</label>
              <div className="flex items-center">
                <span className="px-3 py-2 border border-r-0 bg-gray-200 rounded-l">
                  {selectedCountry.phoneCode}
                </span>
                <input
                  type="text"
                  name="phone"
                  {...register("phone", {
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
                  className="w-full p-2 border border-outerSpace rounded-r-md focus:outline-none focus:ring-2 focus:ring-ashGray"
                />
              </div>
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className={commonLabelClass}>Gender</label>
              <select
                name="gender"
                defaultValue="Male"
                className={commonInputClass}
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Please select your gender",
                  },
                })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className={errorClass}>{errors.gender.message}</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
      <div className="bg-white border border-outerSpace shadow-lg rounded-lg m-6 p-6 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-outerSpace mb-6">
          Sign Up
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(step < 3 ? handleNext : onSubmit)(e);
          }}
          noValidate
          disabled={disabled}
          className="space-y-10 overflow-hidden px-2"
        >
          <div className="h-full">
            <div>
              <StepContent />
            </div>
          </div>

          <div className="flex justify-between ">
            {step > 0 ? (
              <button onClick={handlePrev} className={buttonClass}>
                Back
              </button>
            ) : (
              <div></div>
            )}
            <LoadingButton text={step < 3 ? "Next" : "Submit"} disabled={disabled}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
