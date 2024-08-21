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



import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { customLocalStorage } from "../../features/customLocalStorage";

const ProtectedRoute = ({ allowedUserTypes }) => {
  const userType = customLocalStorage.getItem("userType")

  if (!userType) {
    // Redirect to login if there's no userType
    return <Navigate to="/login" />;
  }

  if (!allowedUserTypes.includes(userType)) {
    // Redirect to shop if userType is not allowed
    return <Navigate to="/shop" />;
  }

  // If userType is allowed, render the child components (nested routes)
  return <Outlet />;
};

export default ProtectedRoute;
