// import React from "react";
// import { Navigate, Route } from "react-router-dom";
// import { customLocalStorage } from "../../features/customLocalStorage";

// const ProtectedRoute = ({
//   component: Component,
//   allowedUserTypes,
//   ...rest
// }) => {
//   const userType = customLocalStorage.getItem("userType")

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         // If there's no userType, redirect to login
//         if (!userType) {
//           return <Navigate to="/login" />;
//         }

//         // If userType doesn't match allowedUserTypes, redirect to shop
//         if (!allowedUserTypes.includes(userType)) {
//           return <Navigate to="/shop" />;
//         }

//         // If userType matches, render the component
//         return <Component {...props} />;
//       }}
//     />
//   );
// };

// export default ProtectedRoute;



// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { customLocalStorage } from "../../features/customLocalStorage";

// const ProtectedRoute = ({ allowedUserTypes }) => {
//   const userType = customLocalStorage.getItem("userType")

//   if (!userType) {
//     // Redirect to login if there's no userType
//     return <Navigate to="/login" />;
//   }

//   if (!allowedUserTypes.includes(userType)) {
//     // Redirect to shop if userType is not allowed
//     return <Navigate to="/shop" />;
//   }

//   // If userType is allowed, render the child components (nested routes)
//   return <Outlet />;
// };

// export default ProtectedRoute;


import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(""); // null initially to indicate loading
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/checkAdmin", {
          withCredentials: true
        });

        if (response.status === 200) {
          const userType = response.data.userType;
          if (userType === "admin" || userType === "superAdmin") {
            setIsAuthenticated("200");
            setUserType(userType);
            console.log(response.data.message)

          }
        }
      } catch (error) {
        if (error.response && error.response.data.status === 401) {
          setIsAuthenticated("401");
          console.log(error.response.data.message)
        } else if (error.response && error.response.status === 404) {
          setIsAuthenticated("404");
          console.log(error.response.data.message)

        } else {
          console.error("Error during admin check:", error);
          setIsAuthenticated("500");
          console.log(error.response.data.message)

        }
      }
    };

    checkAdmin();
  }, []);

  if (isAuthenticated === "") {
    // You can return a loading spinner here if needed
    return <div>Loading...</div>;
  }

  if (isAuthenticated === "200") {
    return <Outlet />;
  } else if (isAuthenticated === "404") {
    return <Navigate to="/login" replace />;
  } else if (isAuthenticated === "401") {
    return <Navigate to="/shop" replace />;
  } else {
    return <Navigate to="/shop" replace />;
  }
};

export default ProtectedRoute;

