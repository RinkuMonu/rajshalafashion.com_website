"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Copy,
  ArrowLeft,
  Calendar,
  User,
  CreditCard,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  trackingNumber?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  courierPartner?: string;
  trackingEvents: TrackingEvent[];
}

// Updated dummy data matching order-history page
const dummyOrdersData: OrderDetails[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    trackingNumber: "TRK123456789",
    status: "delivered",
    orderDate: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-18T18:00:00Z",
    actualDelivery: "2024-01-18T16:30:00Z",
    total: 25000,
    items: [
      {
        id: "1",
        name: "Royal Brocade Saree with Golden Border",
        image: "/placeholder.svg?height=80&width=80",
        price: 25000,
        quantity: 1,
        category: "Sarees",
      },
    ],
    shippingAddress: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya.sharma@email.com",
      address: "123 Main Street, Sector 15",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    paymentMethod: "UPI Payment",
    courierPartner: "BlueDart Express",
    trackingEvents: [
      {
        id: "1",
        status: "Order Placed",
        description:
          "Your order has been successfully placed and payment confirmed",
        location: "Online",
        timestamp: "2024-01-15T10:30:00Z",
        isCompleted: true,
      },
      {
        id: "2",
        status: "Order Confirmed",
        description: "Order confirmed and being prepared for dispatch",
        location: "Jaipur Warehouse",
        timestamp: "2024-01-15T14:15:00Z",
        isCompleted: true,
      },
      {
        id: "3",
        status: "Packed",
        description:
          "Your order has been carefully packed and ready for pickup",
        location: "Jaipur Warehouse",
        timestamp: "2024-01-16T09:45:00Z",
        isCompleted: true,
      },
      {
        id: "4",
        status: "Shipped",
        description: "Package picked up by courier partner and in transit",
        location: "Jaipur Hub",
        timestamp: "2024-01-16T16:20:00Z",
        isCompleted: true,
      },
      {
        id: "5",
        status: "Out for Delivery",
        description: "Package is out for delivery",
        location: "New Delhi Delivery Center",
        timestamp: "2024-01-18T07:00:00Z",
        isCompleted: true,
      },
      {
        id: "6",
        status: "Delivered",
        description: "Package delivered successfully to recipient",
        location: "123 Main Street, New Delhi",
        timestamp: "2024-01-18T16:30:00Z",
        isCompleted: true,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    trackingNumber: "TRK987654321",
    status: "shipped",
    orderDate: "2024-01-20T14:15:00Z",
    estimatedDelivery: "2024-01-25T18:00:00Z",
    total: 18500,
    items: [
      {
        id: "2",
        name: "Emerald Green Anarkali Suit",
        image: "/placeholder.svg?height=80&width=80",
        price: 15000,
        quantity: 1,
        category: "Suits",
      },
      {
        id: "3",
        name: "Silk Chanderi Dupatta",
        image: "/placeholder.svg?height=80&width=80",
        price: 3500,
        quantity: 1,
        category: "Accessories",
      },
    ],
    shippingAddress: {
      name: "Anjali Devi",
      phone: "+91 87654 32109",
      email: "anjali.devi@email.com",
      address: "456 Park Avenue, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
    },
    paymentMethod: "Credit Card",
    courierPartner: "FedEx Express",
    trackingEvents: [
      {
        id: "1",
        status: "Order Placed",
        description:
          "Your order has been successfully placed and payment confirmed",
        location: "Online",
        timestamp: "2024-01-20T14:15:00Z",
        isCompleted: true,
      },
      {
        id: "2",
        status: "Order Confirmed",
        description: "Order confirmed and being prepared for dispatch",
        location: "Jaipur Warehouse",
        timestamp: "2024-01-20T18:30:00Z",
        isCompleted: true,
      },
      {
        id: "3",
        status: "Packed",
        description:
          "Your order has been carefully packed and ready for pickup",
        location: "Jaipur Warehouse",
        timestamp: "2024-01-21T11:20:00Z",
        isCompleted: true,
      },
      {
        id: "4",
        status: "Shipped",
        description: "Package picked up by courier partner and in transit",
        location: "Jaipur Hub",
        timestamp: "2024-01-21T17:45:00Z",
        isCompleted: true,
      },
      {
        id: "5",
        status: "In Transit",
        description: "Package is on the way to destination city",
        location: "Mumbai Hub",
        timestamp: "2024-01-23T09:15:00Z",
        isCompleted: true,
      },
      {
        id: "6",
        status: "Out for Delivery",
        description: "Package will be out for delivery soon",
        location: "Mumbai Delivery Center",
        timestamp: "2024-01-25T08:00:00Z",
        isCompleted: false,
      },
      {
        id: "7",
        status: "Delivered",
        description: "Package will be delivered to your address",
        location: "456 Park Avenue, Mumbai",
        timestamp: "2024-01-25T18:00:00Z",
        isCompleted: false,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    trackingNumber: "TRK456789123",
    status: "processing",
    orderDate: "2024-01-22T09:45:00Z",
    estimatedDelivery: "2024-01-28T18:00:00Z",
    total: 45000,
    items: [
      {
        id: "4",
        name: "Crimson Velvet Bridal Lehenga",
        image: "/placeholder.svg?height=80&width=80",
        price: 45000,
        quantity: 1,
        category: "Lehengas",
      },
    ],
    shippingAddress: {
      name: "Kavya Reddy",
      phone: "+91 76543 21098",
      email: "kavya.reddy@email.com",
      address: "789 Garden Road, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034",
    },
    paymentMethod: "UPI Payment",
    courierPartner: "DTDC Express",
    trackingEvents: [
      {
        id: "1",
        status: "Order Placed",
        description:
          "Your order has been successfully placed and payment confirmed",
        location: "Online",
        timestamp: "2024-01-22T09:45:00Z",
        isCompleted: true,
      },
      {
        id: "2",
        status: "Order Confirmed",
        description: "Order confirmed and being prepared for dispatch",
        location: "Jaipur Warehouse",
        timestamp: "2024-01-22T15:20:00Z",
        isCompleted: true,
      },
      {
        id: "3",
        status: "Processing",
        description: "Your custom bridal lehenga is being carefully crafted",
        location: "Jaipur Atelier",
        timestamp: "2024-01-23T10:00:00Z",
        isCompleted: true,
      },
      {
        id: "4",
        status: "Quality Check",
        description: "Order is undergoing quality inspection",
        location: "Jaipur Warehouse",
        timestamp: "2024-01-26T14:30:00Z",
        isCompleted: false,
      },
      {
        id: "5",
        status: "Packed",
        description: "Order will be packed after quality approval",
        location: "Jaipur Warehouse",
        timestamp: "2024-01-27T10:00:00Z",
        isCompleted: false,
      },
      {
        id: "6",
        status: "Shipped",
        description: "Package will be shipped to your location",
        location: "Jaipur Hub",
        timestamp: "2024-01-27T18:00:00Z",
        isCompleted: false,
      },
      {
        id: "7",
        status: "Delivered",
        description: "Package will be delivered to your address",
        location: "789 Garden Road, Bangalore",
        timestamp: "2024-01-28T18:00:00Z",
        isCompleted: false,
      },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    trackingNumber: undefined,
    status: "pending",
    orderDate: "2024-01-23T16:20:00Z",
    total: 12300,
    items: [
      {
        id: "5",
        name: "Indigo Dabu Print Kurta",
        image: "/placeholder.svg?height=80&width=80",
        price: 6800,
        quantity: 1,
        category: "Kurtas",
      },
      {
        id: "6",
        name: "Kashmiri Pashmina Shawl",
        image: "/placeholder.svg?height=80&width=80",
        price: 5500,
        quantity: 1,
        category: "Accessories",
      },
    ],
    shippingAddress: {
      name: "Rahul Singh",
      phone: "+91 65432 10987",
      email: "rahul.singh@email.com",
      address: "321 Lake View, Salt Lake City",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700064",
    },
    paymentMethod: "Net Banking",
    trackingEvents: [
      {
        id: "1",
        status: "Order Placed",
        description: "Your order has been successfully placed",
        location: "Online",
        timestamp: "2024-01-23T16:20:00Z",
        isCompleted: true,
      },
      {
        id: "2",
        status: "Payment Verification",
        description: "Payment is being verified by our team",
        location: "Payment Gateway",
        timestamp: "2024-01-23T16:25:00Z",
        isCompleted: true,
      },
      {
        id: "3",
        status: "Order Confirmation",
        description: "Order will be confirmed after payment verification",
        location: "Jaipur Warehouse",
        timestamp: "",
        isCompleted: false,
      },
      {
        id: "4",
        status: "Processing",
        description: "Order will be processed and prepared for dispatch",
        location: "Jaipur Warehouse",
        timestamp: "",
        isCompleted: false,
      },
      {
        id: "5",
        status: "Shipped",
        description: "Package will be shipped to your location",
        location: "Jaipur Hub",
        timestamp: "",
        isCompleted: false,
      },
      {
        id: "6",
        status: "Delivered",
        description: "Package will be delivered to your address",
        location: "321 Lake View, Kolkata",
        timestamp: "",
        isCompleted: false,
      },
    ],
  },
];

const TrackOrder = () => {
  const { orderNumber } = useParams();
  const [searchParams] = useSearchParams();
  const trackingNumber = searchParams.get("tracking");

  const [orderData, setOrderData] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let foundOrder = null;

      // If we have URL parameters, try to find the order
      if (orderNumber || trackingNumber) {
        foundOrder = dummyOrdersData.find(
          (order) =>
            order.orderNumber === orderNumber ||
            order.trackingNumber === trackingNumber
        );
      } else {
        // For demo purposes, show the first order if no parameters are provided
        foundOrder = dummyOrdersData[0];
      }

      if (foundOrder) {
        setOrderData(foundOrder);
      } else {
        setError(
          "Order not found. Please check your order number or tracking number."
        );
      }
      setLoading(false);
    }, 1500);
  }, [orderNumber, trackingNumber]);

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (!isCompleted) {
      return <Clock className="w-5 h-5 text-gray-400" />;
    }

    switch (status.toLowerCase()) {
      case "order placed":
      case "order confirmed":
      case "order confirmation":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "packed":
      case "processing":
      case "quality check":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped":
      case "in transit":
      case "out for delivery":
        return <Truck className="w-5 h-5 text-[#cba146]" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "payment verification":
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getProgressPercentage = () => {
    if (!orderData) return 0;
    const completedEvents = orderData.trackingEvents.filter(
      (event) => event.isCompleted
    ).length;
    return (completedEvents / orderData.trackingEvents.length) * 100;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Pending";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case "pending":
        return "Order Pending";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-12 pb-8 border-b border-gray-200">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1B2E4F" }}
          >
            Track Your <span style={{ color: "#cba146" }}>Order</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get real-time updates on your order status and delivery progress
          </p>
        </div>

        {/* Demo Order Selection - Remove in production */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-3">
            Demo: Select an order to track
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {dummyOrdersData.map((order) => (
              <button
                key={order.id}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setOrderData(order);
                    setError(null);
                    setLoading(false);
                  }, 500);
                }}
                className="text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium text-blue-900">
                  {order.orderNumber}
                </div>
                <div className="text-xs text-blue-600 capitalize">
                  {order.status}
                </div>
                <div className="text-xs text-blue-500">
                  ₹{order.total.toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/order-history"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Order History
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <RefreshCw className="w-10 h-10 text-gray-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Loading tracking information...
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch your order details
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Order Not Found
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order-history"
                className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                style={{ background: "#cba146" }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Go to Order History</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        )}

        {/* Order Tracking Content */}
        {orderData && !loading && (
          <div className="space-y-8">
            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(120, 120, 120, 0.3)" }}
                  >
                    <Package
                      className="w-8 h-8"
                      style={{ color: "#cba146" }}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {orderData.orderNumber}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      Ordered on {formatDate(orderData.orderDate)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-right">
                    <p
                      className="text-3xl font-bold"
                      style={{ color: "#cba146" }}
                    >
                      ₹{orderData.total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {orderData.items.length} item(s)
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      orderData.status
                    )}`}
                  >
                    {getStatusDisplayName(orderData.status)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Order Progress
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(getProgressPercentage())}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      background: "#cba146",
                      width: `${getProgressPercentage()}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tracking Information Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tracking Number */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Tracking Number
                  </h3>
                  {orderData.trackingNumber && (
                    <button
                      onClick={() =>
                        copyToClipboard(orderData.trackingNumber!, "tracking")
                      }
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy tracking number"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {orderData.trackingNumber ? (
                  <>
                    <p
                      className="font-mono text-lg font-bold"
                      style={{ color: "#cba146" }}
                    >
                      {orderData.trackingNumber}
                    </p>
                    {copiedField === "tracking" && (
                      <p className="text-xs text-green-600 mt-1">
                        Copied to clipboard!
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    Tracking number will be assigned once shipped
                  </p>
                )}
              </div>

              {/* Courier Partner */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Truck
                    className="w-5 h-5"
                    style={{ color: "#cba146" }}
                  />
                  <h3 className="font-semibold text-gray-900">
                    Courier Partner
                  </h3>
                </div>
                {orderData.courierPartner ? (
                  <>
                    <p className="text-lg font-medium text-gray-800">
                      {orderData.courierPartner}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Express Delivery Service
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    Courier partner will be assigned once shipped
                  </p>
                )}
              </div>

              {/* Estimated Delivery */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock
                    className="w-5 h-5"
                    style={{ color: "#cba146" }}
                  />
                  <h3 className="font-semibold text-gray-900">
                    {orderData.status === "delivered"
                      ? "Delivered On"
                      : "Expected Delivery"}
                  </h3>
                </div>
                {orderData.estimatedDelivery ? (
                  <>
                    <p className="text-lg font-medium text-gray-800">
                      {formatDate(
                        orderData.actualDelivery || orderData.estimatedDelivery
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {orderData.status === "delivered"
                        ? "Successfully Delivered"
                        : "Estimated"}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    Delivery date will be updated once order is confirmed
                  </p>
                )}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Tracking Timeline
              </h3>
              <div className="space-y-6">
                {orderData.trackingEvents.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    {/* Timeline Icon */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          event.isCompleted
                            ? "border-green-500 bg-green-50"
                            : index ===
                              orderData.trackingEvents.findIndex(
                                (e) => !e.isCompleted
                              )
                            ? "border-[#cba146] bg-purple-50 animate-pulse"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        {getStatusIcon(event.status, event.isCompleted)}
                      </div>
                      {index < orderData.trackingEvents.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            event.isCompleted ? "bg-green-300" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4
                          className={`font-semibold ${
                            event.isCompleted
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {event.status}
                        </h4>
                        <span
                          className={`text-sm ${
                            event.isCompleted
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {event.isCompleted && event.timestamp
                            ? formatDate(event.timestamp)
                            : "Pending"}
                        </span>
                      </div>
                      <p
                        className={`text-sm mb-2 ${
                          event.isCompleted ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span
                          className={`text-sm ${
                            event.isCompleted
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Items */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.category}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: "#cba146" }}
                          >
                            ₹{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Details */}
              <div className="space-y-6">
                {/* Shipping Address */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin
                      className="w-5 h-5"
                      style={{ color: "#cba146" }}
                    />
                    <h3 className="text-lg font-bold text-gray-900">
                      Shipping Address
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {orderData.shippingAddress.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {orderData.shippingAddress.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {orderData.shippingAddress.email}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mt-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="text-gray-600">
                        <p>{orderData.shippingAddress.address}</p>
                        <p>
                          {orderData.shippingAddress.city},{" "}
                          {orderData.shippingAddress.state}
                        </p>
                        <p>PIN: {orderData.shippingAddress.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard
                      className="w-5 h-5"
                      style={{ color: "#cba146" }}
                    />
                    <h3 className="text-lg font-bold text-gray-900">
                      Payment Details
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium text-gray-900">
                        {orderData.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Order Total</span>
                      <span
                        className="font-bold text-xl"
                        style={{ color: "#cba146" }}
                      >
                        ₹{orderData.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          orderData.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {orderData.status === "pending" ? (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            Payment Verification Pending
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Payment Confirmed
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Phone
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "#cba146" }}
                  />
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Call Support
                  </h4>
                  <p className="text-gray-600">
                    <a href="tel:9116131960" className="hover:underline">
                      9116131960
                    </a>
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Mail
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "#cba146" }}
                  />
                  <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                  <p className="text-gray-600 text-sm">
                    <a
                      href="mailto:info@rajshalafashion.com"
                      className="hover:underline"
                    >
                      info@rajshalafashion.com
                    </a>
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Package
                    className="w-8 h-8 mx-auto mb-2"
                    style={{ color: "#cba146" }}
                  />
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Track Issues
                  </h4>
                  <p className="text-sm text-gray-600">
                    Report delivery problems
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
