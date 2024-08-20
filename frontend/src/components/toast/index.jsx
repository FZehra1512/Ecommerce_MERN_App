import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ position = "top-right", autoClose = 2000 }) => {
  return (
    <ToastContainer
      className="text-outerSpace font-notoSans w-4/5 md:w-2/4 lg:w-64 xl:w-80"
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Toast;
