"use client"
import { useEffect, useState } from "react"
import { Package, Clock, CheckCircle, XCircle, Truck, Eye, RefreshCw, Calendar, Filter } from "lucide-react"
import { Link } from "react-router-dom"

interface OrderItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  category: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: string
}

// Dummy order data
const dummyOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-15T10:30:00Z",
    status: "delivered",
    total: 25000,
    items: [
      {
        id: "1",
        name: "Royal Brocade Saree with Golden Border",
        image: "/saree9.webp",
        price: 25000,
        quantity: 1,
        category: "Sarees",
      },
    ],
    shippingAddress: "123 Main Street, New Delhi, 110001",
    paymentMethod: "UPI",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024-01-20T14:15:00Z",
    status: "shipped",
    total: 18500,
    items: [
      {
        id: "2",
        name: "Emerald Green Anarkali Suit",
        image: "/saree9.webp",
        price: 15000,
        quantity: 1,
        category: "Suits",
      },
      {
        id: "3",
        name: "Silk Chanderi Dupatta",
        image: "/saree9.webp",
        price: 3500,
        quantity: 1,
        category: "Accessories",
      },
    ],
    shippingAddress: "456 Park Avenue, Mumbai, 400001",
    paymentMethod: "Credit Card",
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-01-25",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "2024-01-22T09:45:00Z",
    status: "processing",
    total: 45000,
    items: [
      {
        id: "4",
        name: "Crimson Velvet Bridal Lehenga",
        image: "/saree9.webp",
        price: 45000,
        quantity: 1,
        category: "Lehengas",
      },
    ],
    shippingAddress: "789 Garden Road, Bangalore, 560001",
    paymentMethod: "UPI",
    estimatedDelivery: "2024-01-28",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    date: "2024-01-23T16:20:00Z",
    status: "pending",
    total: 12300,
    items: [
      {
        id: "5",
        name: "Indigo Dabu Print Kurta",
        image: "/saree9.webp",
        price: 6800,
        quantity: 1,
        category: "Kurtas",
      },
      {
        id: "6",
        name: "Kashmiri Pashmina Shawl",
        image: "/saree9.webp",
        price: 5500,
        quantity: 1,
        category: "Accessories",
      },
    ],
    shippingAddress: "321 Lake View, Kolkata, 700001",
    paymentMethod: "Net Banking",
  },
]

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(dummyOrders)
      setFilteredOrders(dummyOrders)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = orders

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus)
    }

    // Filter by time range
    if (selectedTimeRange !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (selectedTimeRange) {
        case "week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          break
        case "3months":
          filterDate.setMonth(now.getMonth() - 3)
          break
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }

      filtered = filtered.filter((order) => new Date(order.date) >= filterDate)
    }

    setFilteredOrders(filtered)
  }, [orders, selectedStatus, selectedTimeRange])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "processing":
        return <RefreshCw className="w-4 h-4 text-blue-500" />
      case "shipped":
        return <Truck className="w-4 h-4 text-[#cba146]" />
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-12 pb-8 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1B2E4F" }}>
            Order <span style={{ color: "#cba146" }}>History</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Track and manage all your orders in one place</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5" style={{ color: "#cba146" }} />
              <h2 className="text-lg font-semibold text-gray-900">Filter Orders</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Status Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Order Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cba146] focus:border-[#cba146] bg-white min-w-[150px]"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Time Range Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cba146] focus:border-[#cba146] bg-white min-w-[150px]"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <RefreshCw className="w-10 h-10 text-gray-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading your orders...</h3>
            <p className="text-gray-600">Please wait while we fetch your order history</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {selectedStatus !== "all" || selectedTimeRange !== "all"
                ? "No orders match your current filters. Try adjusting your search criteria."
                : "You haven't placed any orders yet. Start shopping to see your order history here."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              style={{ background: "#cba146" }}
            >
              <Package className="h-4 w-4" />
              <span>Start Shopping</span>
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && filteredOrders.length > 0 && (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(120, 120, 120, 0.3)" }}
                      >
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: "#cba146" }}>
                          ₹{order.total.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3 min-w-[100px]">
                        <span className="text-sm font-medium text-gray-600">+{order.items.length - 3} more</span>
                      </div>
                    )}
                  </div>
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{expandedOrder === order.id ? "Hide Details" : "View Details"}</span>
                      </button>
                      {order.trackingNumber && (
                        <Link to={"/trackorder"} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          <Truck className="w-4 h-4" />
                          <span>Track Order</span>
                        </Link>
                      )}
                      {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Invoice</span>
                      </button> */}
                    </div>
                    {order.status === "delivered" && (
                      <button
                        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        style={{ background: "#cba146" }}
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Reorder</span>
                      </button>
                    )}
                  </div>
                </div>
                {/* Expanded Order Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white rounded-lg p-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 mb-1">{item.name}</h5>
                                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                  <span className="font-medium" style={{ color: "#cba146" }}>
                                    ₹{item.price.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Order Information */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Order Information</h4>
                        <div className="bg-white rounded-lg p-4 space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Shipping Address</p>
                            <p className="text-sm text-gray-600 mt-1">{order.shippingAddress}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Payment Method</p>
                            <p className="text-sm text-gray-600 mt-1">{order.paymentMethod}</p>
                          </div>
                          {order.trackingNumber && (
                            <div>
                              <p className="text-sm font-medium text-gray-700">Tracking Number</p>
                              <p className="text-sm font-mono text-gray-600 mt-1">{order.trackingNumber}</p>
                            </div>
                          )}
                          {order.estimatedDelivery && (
                            <div>
                              <p className="text-sm font-medium text-gray-700">Estimated Delivery</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Summary Stats */}
        {!loading && filteredOrders.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-blue-100">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {filteredOrders.filter((o) => o.status === "delivered").length}
              </p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-purple-100">
                <Truck className="w-6 h-6 text-[#cba146]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {filteredOrders.filter((o) => o.status === "shipped").length}
              </p>
              <p className="text-sm text-gray-600">In Transit</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div
                className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full"
                style={{ background: "rgba(120, 120, 120, 0.3)" }}
              >
                <span className="text-lg font-bold" style={{ color: "#cba146" }}>
                  ₹
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{filteredOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
