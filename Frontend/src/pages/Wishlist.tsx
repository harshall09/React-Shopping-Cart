import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../states/hooks";
import { Product } from "../../types";
import {
  selectWishlist,
  selectWishlistStatus,
  selectWishlistError,
  removeProductFromWishlist,
  fetchWishlistItems,
} from "../states/reducers/wishlistSlice";

const WishlistPage: React.FC = () => {
  const wishlistItems = useAppSelector(selectWishlist);
  const wishlistStatus = useAppSelector(selectWishlistStatus);
  const wishlistError = useAppSelector(selectWishlistError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (wishlistStatus === "idle") {
      dispatch(fetchWishlistItems());
    }
  }, [dispatch, wishlistStatus]);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeProductFromWishlist(productId));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div
        className="container mx-auto py-8 flex-grow"
        style={{ width: "90%", margin: "auto" }}
      >
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
          {wishlistStatus === "loading" ? (
            <p>Loading your wishlist...</p>
          ) : wishlistStatus === "failed" ? (
            <p>Error fetching wishlist: {wishlistError}</p>
          ) : wishlistItems.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((item: Product) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-md font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ₹{item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="bg-gray-200 px-2 py-1 rounded-sm hover:bg-gray-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default WishlistPage;
