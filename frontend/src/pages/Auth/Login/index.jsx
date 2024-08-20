import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Toast from "../../../components/toast";

const Login = () => {

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const [disabled, setDisabled] = useState(false);

    const onSubmit = async (data) => {
      // Detect spams by checking honeypot field
      if (data.honeypot) {
        reset();
        console.log("Spam alert, discarding login!");
        return;
      }

      // Destrcture data object
      const { email, password, isRememberMe } = data;
      
      // Post data
      try {
        // Disable form while processing submission
        setDisabled(true);

        const loginData = {
          email,
          password,
          isRememberMe,
        };
        console.log("Login Data: ", loginData);

        const response = await axios.post(
          "http://localhost:5000/api/login",
          loginData
        );
        console.error("Response data:", response.data);
        const authUser = response.data.user;

        if (response.status === 200) {
          toast.success("Login successful");
          setTimeout(() => {
            if (
              authUser.userType === "admin" ||
              authUser.userType === "superAdmin"
            ) {
              router.push("/adminDashboard");
            } else if (
              authUser.userType === "user" ||
              authUser.userType === "adminInProcess"
            ) {
              router.push("/shop");
            } else {
              // Handle other cases or provide a default route
              router.push("/login");
            }
          }, 2000);
        }
      } catch (error) {
        if (error.response.status === 404) {
          toast.error("Invalid Credentials, User not registered");
          console.error("Response data:", error.response.data);
        } else {
          toast.error("Form submission is failed");
          console.error("Response data:", error.response.data);
        }
      } finally {
        // Re-enable form submission
        setDisabled(false);
        // Reset contact form fields after submission
        reset();
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toast />
      <div className="bg-white border border-outerSpace shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-outerSpace mb-6">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          disabled={disabled}
          className="space-y-4"
        >
          <div>
            <label className="block text-outerSpace font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-outerSpace rounded-md focus:outline-none focus:ring-2 focus:ring-ashGray"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter email address",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-outerSpace font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: {
                    value: true,
                    message: "Please enter your password",
                },
                // minLength: {
                //     value: 8,
                //     message: "Password must be at least 8 characters",
                // },
              })}
              className="w-full px-4 py-2 border border-outerSpace rounded-md focus:outline-none focus:ring-2 focus:ring-ashGray"
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isRememberMe"
              {...register("isRememberMe")}
              className="h-4 w-4 accent-ashGray focus:ring-outerSpace border-outerSpace rounded"
            />
            <label className="ml-2 text-outerSpace font-semibold">
              Remember Me
            </label>
          </div>
          <div>
            {/* Honeypot for spam detection */}
            <label htmlFor="honeypot" style={{ display: "none" }}>
              Enter First Name:
            </label>
            <input
              type="text"
              name="honeypot"
              className="hidden"
              {...register("honeypot")}
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="w-full py-2 bg-ashGray text-outerSpace font-semibold rounded-md hover:bg-outerSpace hover:text-ashGray transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login



// {...register("password", {
//         required: {
//           value: true,
//           message: "Please enter your password",
//         },
//         minLength: {
//           value: 8,
//           message: "Password must be at least 8 characters",
//         },
//         pattern: {
//           value: /^(?=.*[a-zA-Z])(?=.*[0-9]).*$/,
//           message: "Password must contain at least one letter and one number",
//         },
//       })}
