import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const AddToCartButton = ({ productId, className, size = "24px" }) => {
  const [inCart, setInCart] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleAddToCartClick = () => {
    setInCart(!inCart);
    setRipple(true);

    setTimeout(() => {
      setRipple(false);
    }, 300); // Control how long the ripple effect lasts
    console.log(`Product ID: ${productId} added to cart.`);
  };

  return (
    <div
      className={`flex items-center justify-center relative border border-timberWolf bg-white rounded-full cursor-pointer transition-all duration-300 ${className}`}
      style={{
        width: size,
        height: size,
      }}
      onClick={handleAddToCartClick}
    >
      <FaShoppingCart
        className={`transition-all duration-300 ${
          inCart ? "text-green-600" : "text-gray-400"
        }`}
        style={{
          width: `calc(${size} / 1.8)`,
          height: `calc(${size} / 1.8)`,
          filter: inCart ? "drop-shadow(0 0 4px rgba(60, 179, 113, 0.8))" : "none",
        }}
      />
      {ripple && (
        <div
          className="absolute inset-0 rounded-full bg-green-200 pointer-events-none animate-ping"
          style={{
            animationDuration: "1s",
          }}
        ></div>
      )}
    </div>
  );
};

export default AddToCartButton;
