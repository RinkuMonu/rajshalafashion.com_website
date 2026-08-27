"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-extrabold text-[#393838] mb-4 text-center">
        Privacy Policy
      </h1>
      <p className="text-md text-gray-600 text-center">
        Please read our Privacy Policy carefully before using Rajshala Fashions Mens Wear services.
      </p>

      {privacySections.map((section, index) => (
        <div
          key={index}
          className="mt-10 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#393838]"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#393838]">
            {section.title}
          </h2>
          {section.content.map((para, idx) => (
            <p key={idx} className="mb-3 text-justify text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

const privacySections = [
  {
    title: "1. Personal Information Collection",
    content: [
      "We do not sell, trade, or share your personal information except as described in this policy or with your explicit consent.",
      "The personal information you provide may be used to:",
      "• Facilitate your use of our website and services.",
      "• Respond to your inquiries, requests, or concerns.",
      "• Communicate updates about our products, services, promotions, and offers.",
      "• Send important notifications regarding changes to our policies or website.",
      "• Personalize your shopping experience.",
      "• Process your purchases and provide related customer support.",
      "• Administer downloads of digital products.",
      "• Conduct internal analysis to improve our website, services, and advertising.",
      "• Protect the integrity and security of our website.",
      "• Comply with applicable laws and legal requirements."
    ]
  },
  {
    title: "2. Security of Personal Information",
    content: [
      "We use physical, administrative, and technical safeguards to protect your data from unauthorized access, alteration, or disclosure.",
      "Sensitive information, such as payment details, is transmitted securely using standard encryption protocols.",
      "In the unlikely event of a data breach, we will notify you promptly via email and take immediate steps to restore data integrity."
    ]
  },
  {
    title: "3. Advertising and Third-Party Services",
    content: [
      "We may use third-party service providers for website advertisements and marketing campaigns.",
      "Personal information is never shared with advertisers without your consent.",
      "Aggregate or anonymized data may be used to improve advertising relevance.",
      "Some ad services may include embedded pixels to track engagement but do not identify individual users."
    ]
  },
  {
    title: "4. User Control",
    content: [
      "You can choose not to provide certain information, but this may limit access to some website features or services.",
      "You can update your personal information at any time, and we will maintain prior versions for record-keeping.",
      "You can opt out of marketing emails by using the unsubscribe link included in our communications."
    ]
  },
  {
    title: "5. Communications and Grievances",
    content: [
      "If you do not wish to receive promotional emails or wish to report any privacy concerns, please contact us at:",
      "Email: info@rajshalafashion.com"
    ]
  },
  {
    title: "6. Important Disclaimer",
    content: [
      "While we take extensive measures to safeguard your data, we advise you not to share sensitive information with third parties claiming to be associated with Rajshala Fashions.",
      "We disclaim any responsibility for losses arising from your negligence or sharing of sensitive information outside our official website or communication channels."
    ]
  }
];
