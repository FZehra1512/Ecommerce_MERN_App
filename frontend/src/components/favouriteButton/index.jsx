import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const FavouriteButton = ({ productId, className, size = "24px" }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite);
    setRipple(true);

    setTimeout(() => {
      setRipple(false);
    }, 300); // Control how long the ripple effect lasts
    console.log(`Product ID: ${productId} ${isFavourite}`);
  };

  return (
    <div
      className={`flex items-center justify-center relative border border-timberWolf bg-white rounded-full cursor-pointer transition-all duration-300 ${className}`}
      style={{
        width: size,
        height: size,
      }}
      onClick={handleFavouriteClick}
    >
      <FaHeart
        className={`transition-all duration-300 ${
          isFavourite ? "text-red-500" : "text-gray-400"
        }`}
        style={{
          width: `calc(${size} / 2)`,
          height: `calc(${size} / 2)`,
          filter: isFavourite
            ? "drop-shadow(0 0 4px rgba(255, 0, 0, 0.8))"
            : "none",
        }}
      />
      {ripple && (
        <div
          className="absolute inset-0 rounded-full bg-red-200 pointer-events-none animate-ping"
          style={{
            animationDuration: "1s",
          }}
        ></div>
      )}
    </div>
  );
};

export default FavouriteButton;
