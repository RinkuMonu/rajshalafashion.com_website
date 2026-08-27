import React from 'react';
import { Package2, Truck, CheckCircle2, Clock, Search, Filter } from 'lucide-react';

// Types for our order data
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'in-transit' | 'processing';
  items: OrderItem[];
}

// Mock data for orders
const orders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "March 15, 2024",
    total: 129.99,
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Wireless Noise-Cancelling Headphones",
        price: 129.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
      }
    ]
  },
  {
    id: "ORD-2024-002",
    date: "March 18, 2024",
    total: 89.97,
    status: "in-transit",
    items: [
      {
        id: "2",
        name: "Smart Fitness Tracker",
        price: 89.97,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&q=80"
      }
    ]
  },
  {
    id: "ORD-2024-003",
    date: "March 20, 2024",
    total: 159.98,
    status: "processing",
    items: [
      {
        id: "3",
        name: "Premium Coffee Maker",
        price: 159.98,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&q=80"
      }
    ]
  }
];

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const statusConfig = {
    'delivered': {
      icon: CheckCircle2,
      text: 'Delivered',
      color: 'bg-green-100 text-green-800'
    },
    'in-transit': {
      icon: Truck,
      text: 'In Transit',
      color: 'bg-blue-100 text-blue-800'
    },
    'processing': {
      icon: Clock,
      text: 'Processing',
      color: 'bg-yellow-100 text-yellow-800'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.color}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.text}
    </span>
  );
};

const OrderCard = ({ order }: { order: Order }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <p className="text-gray-600">Placed on {order.date}</p>
      </div>
      <StatusBadge status={order.status} />
    </div>
    
    {order.items.map((item) => (
      <div key={item.id} className="flex items-center py-4 border-t border-gray-200">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="ml-4 flex-grow">
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-800 font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>
    ))}
    
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">Order Total:</span>
        <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
      </div>
      <div className="mt-4 flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Track Package
        </button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
          View Invoice
        </button>
      </div>
    </div>
  </div>
);

function Orders() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Package2 className="w-6 h-6 mr-2" />
              Your Orders
            </h1>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Orders;