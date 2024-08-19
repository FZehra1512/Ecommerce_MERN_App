import React, { useState, useEffect } from "react";
import axios from "axios";
import FavouriteButton from "../../components/favouriteButton";
import AddToCartButton from "../../components/cartButton";
import { FaStar } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Product List</h1>
        <div className="w-full grid-cols-1 grid grid-rows-[repeat(auto-fit,1fr)] gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="w-full grid-cols-1 grid grid-rows-[repeat(auto-fit,1fr)] gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, loading=false }) => {
  const {
    _id,
    name,
    productImg,
    description,
    price,
    avgRating,
    salePercentage,
    productCategory,
  } = product;

  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden ${
        loading ? "bg-gray-400 animate-pulse" : "bg-timberWolf"
      }`}
    >
      <div className="relative">
        <img
          src={productImg}
          alt={name}
          className="w-full rounded-r-xl-xl h-40 bg-slate-300 object-cover"
        />
        <div className="absolute top-3 w-full px-3 flex justify-between">
          {salePercentage > 0 ? (
            <p className="bg-red-500 text-white text-[16px] font-bold px-2 rounded-lg">
              -{salePercentage}%
            </p>
          ) : (
            <div></div>
          )}
          <div className="flex space-x-2">
            <FavouriteButton productId={_id} size="32px" />
            <AddToCartButton productId={_id} size="32px" />
          </div>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-semibold mb-2">{productCategory.name}</p>
        <h4 className="text-base font-semibold mb-0">{name}</h4>
        <p className="text-[14px] mb-2">
          Made with {description.material} and has a dimension of{" "}
          {description.dimension}
        </p>

        <div className="flex justify-between mb-2">
          {salePercentage > 0 ? (
            <div className="flex gap-3">
              <span className="text-[14px] text-gray-500 font-semibold line-through">
                ${price}
              </span>
              <span className="text-sm text-red-500 font-semibold">
                ${(price - price * (salePercentage / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-end text-sm font-semibold">${price}</span>
          )}
          {avgRating > 0 ? (
            <div className="flex items-center justify-center gap-2 font-semibold">
              <span className="text-sm">{avgRating}</span>
              <span className="text-yellow-600 text-base">
                <FaStar />
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

const SkeletonCard = () => {
  return (
    <div className="bg-white">
      <div className="w-full h-40 bg-gray-300 rounded-r-xl-xl animate-pulse" />
      <div className="p-3">
        <SkeletonText width="24" height="4" />
        <SkeletonText width="32" height="6" />
        <SkeletonText width="40" height="4" />

        <div className="flex justify-between mb-2">
          <div className="flex gap-3">
            <SkeletonText width="16" height="4" />
            <SkeletonText width="16" height="4" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <SkeletonText width="8" height="4" />
            <SkeletonText width="8" height="4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonText = ({ width, height }) => {
  return (
    <p
      className={`bg-gray-300 w-${width} h-${height} rounded-lg animate-pulse`}
    />
  );
};
