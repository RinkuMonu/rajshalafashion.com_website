import { useEffect, useState } from "react";
import {
  FaBox,
  FaRupeeSign,
  FaCalendarAlt,
  FaTruck,
  FaCreditCard,
  FaSpinner,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const baseUrliMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;
  const [copiedOrderId, setCopiedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/order/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setOrders(data?.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [baseUrl]);

  const handleTrackOrder = async (orderId = null) => {
    const orderIdToTrack = orderId || trackOrderId.trim();
    
    if (!orderIdToTrack) {
      setTrackError("Please enter an order ID");
      return;
    }

    setTrackLoading(true);
    setTrackError("");
    setTrackedOrder(null);
    setShowTrackOrder(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/order/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const foundOrder = data?.orders?.find(
        (order) => order._id === orderIdToTrack,
      );

      if (foundOrder) {
        setTrackedOrder(foundOrder);
      } else {
        setTrackError("Order not found. Please check your Order ID.");
      }
    } catch (err) {
      setTrackError("Failed to track order. Please try again.");
    } finally {
      setTrackLoading(false);
    }
  };

  const handleTrackOrderSubmit = (e) => {
    e.preventDefault();
    handleTrackOrder();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Order Status Tracker Component
  const OrderStatusTracker = ({ order }) => {
    const statusFlow = ["pending", "processing", "shipped", "delivered"];
    const currentStatusIndex = statusFlow.indexOf(order?.status?.toLowerCase());

    const getStatusIcon = (status, index) => {
      if (index < currentStatusIndex) {
        return "✓"; // Completed
      } else if (index === currentStatusIndex) {
        return "●"; // Current
      } else {
        return "○"; // Pending
      }
    };

    const getStatusColorClass = (status, index) => {
      if (index < currentStatusIndex) {
        return "text-green-600 bg-green-50 border-green-200";
      } else if (index === currentStatusIndex) {
        return "text-blue-600 bg-blue-50 border-blue-200";
      } else {
        return "text-gray-400 bg-gray-50 border-gray-200";
      }
    };

    const getLineColor = (index) => {
      return index < currentStatusIndex ? "bg-green-500" : "bg-gray-300";
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FaTruck className="mr-2 text-blue-600" />
          Order Status Tracker
        </h3>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-4 top-4 w-0.5 h-[calc(100%-4rem)] bg-gray-200">
            <div
              className={`h-full bg-green-500 transition-all duration-500`}
              style={{
                width: `${(currentStatusIndex / (statusFlow.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          {/* Status Steps */}
          <div className="relative space-y-8">
            {statusFlow.map((status, index) => (
              <div key={status} className="flex items-start">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm z-10 ${getStatusColorClass(status, index)}`}
                >
                  {getStatusIcon(status, index)}
                </div>
                <div className="ml-4 flex-1">
                  <p
                    className={`font-medium capitalize ${index <= currentStatusIndex
                        ? "text-gray-900"
                        : "text-gray-500"
                      }`}
                  >
                    {status}
                  </p>
                  {index === currentStatusIndex && (
                    <p className="text-sm text-blue-600 mt-1">
                      Your order is currently {status}
                    </p>
                  )}
                  {index < currentStatusIndex && (
                    <p className="text-sm text-green-600 mt-1">
                      Completed on {formatDate(order.updatedAt)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
              <p className="text-sm text-gray-600">Order ID: {order._id}</p>
              <p className="text-sm text-gray-600">
                Placed on: {formatDate(order.createdAt)}
              </p>
              <p className="text-sm text-gray-600">
                Total Amount: ₹{order.totalAmount}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Shipping Address
              </h4>
              <p className="text-sm text-gray-600 flex items-start">
                <FaMapMarkerAlt className="flex-shrink-0 mt-0.5 mr-2 text-gray-400" />
                {order.shippingAddress.address}, {order.shippingAddress.state},
                {order.shippingAddress.country} -{" "}
                {order.shippingAddress.pinCode}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Removed the Track Order Button from here */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        </div>

        {/* Track Order Modal */}
        {showTrackOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FaSearch className="mr-3 text-[#f1b508]" />
                    Track Your Order
                  </h2>
                  <button
                    onClick={() => {
                      setShowTrackOrder(false);
                      setTrackOrderId("");
                      setTrackedOrder(null);
                      setTrackError("");
                    }}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Track Order Form */}
                <form onSubmit={handleTrackOrderSubmit} className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={trackOrderId}
                        onChange={(e) => setTrackOrderId(e.target.value)}
                        placeholder="Enter your Order ID"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#971D89] focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={trackLoading}
                      style={{ background: "linear-gradient(135deg, rgb(184, 134, 11), rgb(255, 193, 7))", }}
                      className="px-6 py-3 text-white rounded-lg hover:bg-[#7e176f] transition disabled:opacity-50 flex items-center space-x-2"
                    >
                      {trackLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSearch />
                      )}
                      <span>Track</span>
                    </button>
                  </div>
                  {trackError && (
                    <p className="text-red-600 text-sm mt-2">{trackError}</p>
                  )}
                </form>

                {/* Tracked Order Details */}
                {trackedOrder && <OrderStatusTracker order={trackedOrder} />}

                {/* Recent Orders List for Reference */}
                {!trackedOrder && orders.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Your Recent Orders
                    </h3>
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((order) => (
                        <div
                          key={order._id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              Order #{order._id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.createdAt)} • ₹
                              {order.totalAmount}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status,
                            )}`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders?.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <FaBox className="mx-auto text-5xl text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700">
                No orders found
              </h2>
              <p className="text-gray-500 mt-2">
                You haven't placed any orders yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders?.map((order) => (
              <div
                key={order?._id}
                className="bg-white shadow overflow-hidden rounded-lg"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div
                      className="flex items-center gap-2 p-1 -m-1 rounded hover:bg-gray-100 cursor-pointer transition-all duration-200 group"
                      onClick={() => {
                        if (order?._id) {
                          navigator.clipboard.writeText(order._id);
                          setCopiedOrderId(order._id);
                          setTimeout(() => setCopiedOrderId(null), 2000); // Show check for 2 seconds
                        }
                      }}
                    >
                      <p className="text-sm text-gray-500">Order ID</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {order?._id}
                        </p>
                        {copiedOrderId === order?._id ? (
                          <Check className="w-4 h-4 text-green-600 animate-pulse" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">Date</p>
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">
                          {formatDate(order?.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order?.status,
                      )}`}
                    >
                      {order?.status.toUpperCase()}
                    </span>
                    {/* Track Order Button for each order */}
                    <button
                      onClick={() => handleTrackOrder(order?._id)}
                      style={{ background: "linear-gradient(135deg, rgb(184, 134, 11), rgb(255, 193, 7))", }}
                      className="px-4 py-2 text-white rounded-lg transition flex items-center space-x-2 text-sm"
                    >
                      <FaSearch className="h-3 w-3" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Products
                  </h3>
                  <div className="space-y-4">
                    {order?.products?.map((product, index) => (
                      <Link
                        to={`/product/${product?.product?._id}`}
                        key={index}
                        className="flex border-b border-gray-100 pb-4 last:border-0"
                      >
                        <div className="flex-shrink-0 h-24 w-24">
                          <img
                            src={`${baseUrliMAGE}${product?.product?.images[0]}`}
                            alt={product?.product?.productName}
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-md font-medium text-gray-900">
                            {product?.product?.productName}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {product?.quantity}
                          </p>
                          <div className="flex items-center mt-2">
                            <FaRupeeSign className="text-gray-400" />
                            <span className="text-gray-900 ml-1">
                              {product?.price}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-md font-medium text-gray-900">
                            Total
                          </p>
                          <div className="flex items-center mt-2">
                            <FaRupeeSign className="text-gray-400" />
                            <span className="text-gray-900 ml-1">
                              {product?.total}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FaTruck className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Shipping Address
                        </p>
                        <p className="text-sm text-gray-900">
                          {order.shippingAddress.address},{" "}
                          {order.shippingAddress.state},{" "}
                          {order.shippingAddress.country} -{" "}
                          {order.shippingAddress.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCreditCard className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p className="text-sm text-gray-900 capitalize">
                          {order.paymentStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <div className="flex items-center justify-end">
                      <FaRupeeSign className="text-gray-900" />
                      <span className="text-xl font-bold text-gray-900 ml-1">
                        {order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};