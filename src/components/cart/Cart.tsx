"use client";
import React, { useEffect, useState } from "react";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
import LoginModal from "../loginModal/LoginModal";
import Login1 from "../../pages/Login1";
import {
  removeItemFromCart,
  updateQuantity,
} from "../../reduxslice/CartSlice";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [localCart, setLocalCart] = useState<Product[]>([]);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      const loadCart = () => {
        const cartData = localStorage.getItem("addtocart");
        setLocalCart(cartData ? JSON.parse(cartData) : []);
      };

      loadCart(); // Load once on mount

      // 👂 Listen for localStorage update
      window.addEventListener("guestCartUpdated", loadCart);

      return () => {
        window.removeEventListener("guestCartUpdated", loadCart);
      };
    }
  }, [isLoggedIn]);

  // Helper to update localStorage cart
  const updateLocalCart = (updated: Product[]) => {
    setLocalCart(updated);
    localStorage.setItem("addtocart", JSON.stringify(updated));
  };
  const baseUrliMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;

  // Common handlers
  const handleIncrement = (id: string) => {
    if (isLoggedIn) {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
      }
    } else {
      const updated = localCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateLocalCart(updated);
    }
  };

  const handleDecrement = (id: string) => {
    if (isLoggedIn) {
      const item = cartItems.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
      }
    } else {
      const updated = localCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateLocalCart(updated);
    }
  };

  const handleDelete = (id: string) => {
    if (isLoggedIn) {
      dispatch(removeItemFromCart(id));
    } else {
      const updated = localCart.filter((item) => item.id !== id);
      updateLocalCart(updated);
    }
  };

  const handleCheckout = () => {
    // const token = localStorage.getItem("userData");
    // if (!token) {
    //   setRedirectPath("/address");
    //   setShowLoginModal(true);
    //   return;
    // }
    navigate("/address");
    onClose();
  };

  const cartToDisplay = isLoggedIn ? cartItems : localCart;
  const total = cartToDisplay.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(120, 120, 120, 0.3)" }}
              >
                <ShoppingCart
                  className="w-5 h-5"
                  style={{ color: "#cba146" }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Shopping Cart
                </h2>
                <p className="text-sm text-gray-500">
                  {cartToDisplay.length} items
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartToDisplay.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(120, 120, 120, 0.3)" }}
                >
                  <ShoppingCart
                    className="w-10 h-10"
                    style={{ color: "#cba146" }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some items to get started!
                </p>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                  style={{ background: "#cba146" }}
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartToDisplay.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`${baseUrliMAGE}${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      {item.category && (
                        <p className="text-xs text-gray-500 mb-2">
                          {item.category}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span
                          className="font-bold"
                          style={{ color: "#cba146" }}
                        >
                          ₹{item.price.toLocaleString()}
                          {/* ₹{item.price.toFixed(0)} */}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-2 text-sm font-medium min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm text-gray-600">
                          Total: ₹
                          {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartToDisplay.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartToDisplay.length} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 text-white py-3 px-4 rounded-lg font-semibold transition-colors hover:shadow-lg"
                  style={{ background: "#cba146" }}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1
            redirectPath={redirectPath}
            onLoginSuccess={() => {
              setShowLoginModal(false);
              setRedirectPath(null);
            }}
          />
        </LoginModal>
      )}
    </>
  );
};

export default Cart;
