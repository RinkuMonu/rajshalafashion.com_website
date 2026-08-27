// src/pages/VendorVerificationForm.js
import React, { useState } from 'react';

const VendorVerificationForm = () => {
  // State for all form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');

  // State for form submission status and messages
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // --- Validation Functions ---
  const validateFullName = (name) => {
    return name.trim().length > 2; // Simple check: at least 3 characters
  };

  const validateEmail = (email) => {
    // Basic email regex for format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    // Basic phone number regex for 10 digits (common in India)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const validateAadhaar = (number) => {
    const aadhaarRegex = /^\d{12}$/; // Exactly 12 digits
    return aadhaarRegex.test(number);
  };

  const validatePan = (number) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // e.g., ABCDE1234F
    return panRegex.test(number.toUpperCase());
  };
  // --- End Validation Functions ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');

    // --- Client-side validation for all fields ---
    if (!validateFullName(fullName)) {
      setMessage('Please enter your full name (at least 3 characters).');
      setMessageType('error');
      return;
    }
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setMessage('Please enter a valid 10-digit phone number.');
      setMessageType('error');
      return;
    }
    if (!validateAadhaar(aadhaarNumber)) {
      setMessage('Please enter a valid 12-digit Aadhaar number.');
      setMessageType('error');
      return;
    }
    if (!validatePan(panNumber)) {
      setMessage('Please enter a valid 10-character PAN number (e.g., ABCDE1234F).');
      setMessageType('error');
      return;
    }
    // --- End Client-side validation ---

    setIsLoading(true);

    // --- Placeholder for actual API call ---
    // In a real application, you would send all collected data to your secure backend.
    // Example:
    // try {
    //   const response = await fetch('/api/verify-vendor', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       fullName,
    //       email,
    //       phoneNumber,
    //       aadhaar: aadhaarNumber,
    //       pan: panNumber
    //     })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setMessage(data.message || 'Verification successful!');
    //     setMessageType('success');
    //     // Clear all fields on success
    //     setFullName('');
    //     setEmail('');
    //     setPhoneNumber('');
    //     setAadhaarNumber('');
    //     setPanNumber('');
    //   } else {
    //     setMessage(data.error || 'Verification failed. Please try again.');
    //     setMessageType('error');
    //   }
    // } catch (error) {
    //   console.error('Verification API error:', error);
    //   setMessage('An error occurred during verification. Please try again later.');
    //   setMessageType('error');
    // } finally {
    //   setIsLoading(false);
    // }
    // --- End Placeholder ---

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success for demonstration
      setMessage('Verification request submitted successfully! We will review your details.');
      setMessageType('success');
      // Clear all fields on success
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setAadhaarNumber('');
      setPanNumber('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Vendor Verification
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please provide your details for verification.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., John Doe"
              className="
                mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                transition-colors duration-200
              "
              required
            />
          </div>

          {/* Email Address Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email" // Use type="email" for built-in browser validation
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., your.email@example.com"
              className="
                mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                transition-colors duration-200
              "
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
           onChange={(e) => {
  const value = e.target.value;

  const numericValue = value.replace(/[^0-9]/g, '');
  setPhoneNumber(numericValue);
}}
              placeholder="e.g., 9876543210"
              maxLength="10"
              className="
                mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                transition-colors duration-200
              "
              required
            />
          </div>

          {/* Aadhaar Number Field */}
          <div>
            <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\s/g, ''))} // Remove spaces for validation
              placeholder="e.g., 123456789012"
              maxLength="12" // Max length for digits only
              className="
                mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                transition-colors duration-200
              "
              required
            />
          </div>

          {/* PAN Number Field */}
          <div>
            <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">
              PAN Number
            </label>
            <input
              type="text"
              id="pan"
              name="pan"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())} // Convert to uppercase for consistency
              placeholder="e.g., ABCDE1234F"
              maxLength="10"
              className="
                mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                transition-colors duration-200
              "
              required
            />
          </div>

          {/* Message Display (Success/Error) */}
          {message && (
            <div
              className={`
                p-3 rounded-md text-sm text-center
                ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
              `}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`
              w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
              text-lg font-medium text-white
              bg-[#c561b1] hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition-colors duration-200
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Submit for Verification'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorVerificationForm