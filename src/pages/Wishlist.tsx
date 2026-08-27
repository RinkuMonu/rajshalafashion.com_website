"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeItemFromWishlist, clearWishlist, fetchWishlist } from "../reduxslice/WishlistSlice"
import { Trash2, Heart, ArrowLeft, ShoppingBag, Star, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

interface WishlistProduct {
  _id: string
  productName: string
  description: string
  images: string[]
  actualPrice: number
  price?: number
  discount?: number
  rating?: number
  category?: {
    name: string
  }
}

interface WishlistItem {
  product: WishlistProduct
}

interface RootState {
  wishlist: {
    items: WishlistItem[]
    loading: boolean
  }
}


const Wishlist = () => {
  // const { items: wishlistItems, loading } = useSelector((state: any) => state.wishlist)
  // const dispatch = useDispatch<any>()

  const { items: wishlistItems, loading } = useSelector((state: RootState) => state.wishlist)
  const dispatch = useDispatch()


  const baseUrliMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  const handleRemove = (id: string) => {
    dispatch(removeItemFromWishlist(id)).then(() => {
      dispatch(fetchWishlist())
    })
  }

  const handleClear = () => {
    if (wishlistItems.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to clear your entire wishlist?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, clear it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearWishlist());
          Swal.fire('Cleared!', 'Your wishlist has been cleared.', 'success');
        }
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-gray-200">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight flex items-center gap-3 text-gray-900">
              <Heart className="fill-current" style={{ color: "#cba146" }} size={32} />
              Your Wishlist
            </h1>
            <p className="text-gray-600">
              <span className="font-semibold" style={{ color: "#cba146" }}>
                {wishlistItems?.length || 0}
              </span>{" "}
              {wishlistItems?.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
          {wishlistItems?.length > 0 && (
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleClear}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors font-medium px-4 py-2 rounded-lg border border-gray-300 hover:border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading your wishlist...</h3>
            <p className="text-gray-600">Please wait while we gather your saved items</p>
          </div>
        )}


        {!loading && (!wishlistItems || wishlistItems.length === 0) && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start adding items you love! Click the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
              style={{ background: "#cba146" }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}

        {/* Wishlist Items */}
        {!loading && wishlistItems && wishlistItems.length > 0 && (
          <div className="space-y-6">
            {/* {wishlistItems
              .filter((item: any) => item?.product) 
              .map((item: any) => ( */}
            {wishlistItems
              .filter((item: WishlistItem) => item?.product)
              .map((item: WishlistItem) => (

                <div
                  key={item?.product?._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-full lg:w-48 h-48 rounded-lg overflow-hidden bg-gray-50 p-3">
                        <img
                          src={
                            item?.product?.images?.[0]
                              ? `${baseUrliMAGE}${item.product.images[0]}`
                              : "/placeholder.svg"
                          }
                          alt={item?.product?.productName || "No image"}
                          className="w-full h-full object-contain rounded-md"
                        />
                        {item?.product?.discount && (
                          <div
                            className="absolute top-3 left-3 text-white text-xs font-medium px-2 py-1 rounded-md"
                            style={{ background: "#cba146" }}
                          >
                            {item.product.discount}% OFF
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-2 text-gray-900">
                            {item?.product?.productName || "Unnamed Product"}
                          </h3>

                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {item?.product?.description ||
                              "Premium quality traditional wear crafted with authentic techniques and finest materials."}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center mb-3">
                            <div className="flex mr-2">
                              {renderStars(item?.product?.rating || 4)}
                            </div>
                            <span className="text-sm text-gray-500">(Reviews)</span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold mr-2" style={{ color: "#cba146" }}>
                              ₹{item?.product?.actualPrice || "N/A"}
                            </span>
                            {item?.product?.price && item?.product?.price !== item?.product?.actualPrice && (
                              <span className="text-base text-gray-400 line-through">
                                ₹{item.product.price}
                              </span>
                            )}
                          </div>

                          {/* Category */}
                          <div className="mb-4">
                            <span className="text-sm text-gray-600">Category: </span>
                            <span className="font-medium" style={{ color: "#cba146" }}>
                              {item?.product?.category?.name || "Traditional Wear"}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                              to={`/product/${item?.product?._id}`}
                              className="flex-1 flex items-center justify-center gap-2 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                              style={{ background: "#cba146" }}
                            >
                              <Eye size={16} />
                              <span>View Product</span>
                            </Link>
                            <button
                              onClick={() => handleRemove(item?.product?._id)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-300 rounded-lg font-medium transition-colors text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Bottom Navigation */}
        {!loading && wishlistItems && wishlistItems.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-6 rounded-lg">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-medium px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>

            <div className="text-center">
              <p className="text-gray-600 mb-2 text-sm">Found something you love?</p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                style={{ background: "#cba146" }}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Explore More</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
