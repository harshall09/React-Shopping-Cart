import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../states/hooks";
import { Product } from "../../types";
import {
  selectWishlist,
  selectWishlistStatus,
  selectWishlistError,
  fetchWishlistItems,
  removeProductFromWishlist,
  addProductToWishlist,
} from "../states/reducers/wishlistSlice";

const WishlistPage: React.FC = () => {
  const wishlistItems = useAppSelector(selectWishlist) ?? [];
  const wishlistStatus = useAppSelector(selectWishlistStatus);
  const wishlistError = useAppSelector(selectWishlistError);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("User data:", user);
    if (user && wishlistStatus === "idle") {
      dispatch(fetchWishlistItems());
    }
  }, [dispatch, user, wishlistStatus]);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeProductFromWishlist(productId));
  };

  const handleAddToWishlist = (productId: string) => {
    dispatch(addProductToWishlist(productId));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-8 flex-grow" style={{ width: "90%", margin: "auto" }}>
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
          {!user && <p>Please log in to view your wishlist.</p>}
          {user && wishlistStatus === "loading" && <p>Loading your wishlist...</p>}
          {user && wishlistStatus === "failed" && (
            <p>{`Error fetching wishlist: ${wishlistError}`}</p>
          )}
          {user && wishlistStatus === "succeeded" && wishlistItems.length === 0 && (
            <p>Your wishlist is empty.</p>
          )}
          {user && wishlistStatus === "succeeded" && wishlistItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((item: Product) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={`http://localhost:3000/products/Images/${item.image}`}
                    alt={item.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-md font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <p className="text-lg font-semibold text-blue-600">₹{item.price.toFixed(2)}</p>
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
    </div>
  );
};

export default WishlistPage;
