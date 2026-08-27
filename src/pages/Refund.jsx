import React, { useState } from 'react';
import { Clipboard, DollarSign, CheckCircle, XCircle } from 'lucide-react';

function Refund() {
  const [orderNumber, setOrderNumber] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [isRefundRequested, setIsRefundRequested] = useState(false);

  const handleRefundRequest = (e) => {
    e.preventDefault();
    if (orderNumber && refundReason) {
      setIsRefundRequested(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-semibold text-center mb-6">
          <Clipboard className="inline-block mr-2" />
          Refund Request
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          We're sorry to hear that you're not satisfied with your purchase. Please provide the necessary information below, and we will process your refund request as quickly as possible.
        </p>
        
        <p className="text-gray-700 text-lg mb-4">
          **Refund Instructions**:
          Please enter your order number and explain the reason for your refund request. Our team will review your request and follow up with you. Please note that refunds are processed within 7-10 business days, depending on the circumstances.
        </p>
        
        <p className="text-gray-700 text-lg mb-6">
          **Refund Policy**:
          - Refunds are accepted within 30 days of purchase.
          - Products must be unused and in their original packaging.
          - If the product is faulty or damaged, you can request a refund or exchange.
          - Refunds will be issued to the original payment method.
        </p>

        {isRefundRequested ? (
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-500" size={50} />
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">Refund Request Submitted</h2>
            <p className="text-gray-500 mt-2">Your request has been successfully submitted. Our support team will review it and get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleRefundRequest}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="orderNumber">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                placeholder="Enter your order number"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="refundReason">
                Refund Reason
              </label>
              <textarea
                id="refundReason"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                placeholder="Why do you want to request a refund?"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="mr-2 text-green-500" size={20} />
                <span className="text-sm text-gray-600">Refund Amount: ₹2000</span>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center text-sm text-gray-600 hover:text-indigo-600"
          >
            <XCircle className="mr-2" size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Refund;
