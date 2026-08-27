// components/FAQComponent.tsx
import React, { useState, useEffect } from 'react';
import { FAQ, FAQResponse } from '../types/faq';

const FAQComponent: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/faqs/all`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch FAQs: ${response.status}`);
        }
        
        const data: FAQResponse = await response.json();
        
        if (data.success) {
          // Filter only active FAQs
          const activeFaqs = data.data.filter(faq => faq.isActive);
          setFaqs(activeFaqs);
        } else {
          throw new Error('Failed to load FAQs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [baseUrl]);

  const toggleFAQ = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cba146] mx-auto"></div>
          <p className="mt-4 text-[#cba146]">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div  className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#cba146] text-white rounded hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e1e0e0] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products and services.
          </p>
        </div>

        {/* FAQ Content */}
        {Object.keys(faqsByCategory).length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No FAQs available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
              <div key={category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Category Header */}
                <div className="bg-[#f9bd5b] px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">
                    {category}
                  </h2>
                </div>
                
                {/* FAQ Items */}
                <div className="divide-y divide-gray-200">
                  {categoryFaqs.map((faq) => (
                    <div key={faq._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <button
                        onClick={() => toggleFAQ(faq._id)}
                        className="flex justify-between items-center w-full text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                            expandedId === faq._id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      
                      <div
                        className={`mt-2 transition-all duration-300 ease-in-out ${
                          expandedId === faq._id
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQComponent;