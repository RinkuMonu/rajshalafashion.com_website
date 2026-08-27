"use client";
import React from "react";

// Section titles
const sectionTitles = [
  "ONLINE STORE TERMS",
  "GENERAL CONDITIONS",
  "ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION",
  "MODIFICATIONS TO THE SERVICE AND PRICES",
  "PRODUCTS OR SERVICES (if applicable)",
  "ACCURACY OF BILLING AND ACCOUNT INFORMATION",
  "OPTIONAL TOOLS",
  "THIRD-PARTY LINKS",
  "USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS",
  "PERSONAL INFORMATION",
  "ERRORS, INACCURACIES AND OMISSIONS",
  "PROHIBITED USES",
  "DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY",
  "INDEMNIFICATION",
  "SEVERABILITY",
  "TERMINATION",
  "ENTIRE AGREEMENT",
  "GOVERNING LAW",
  "CHANGES TO TERMS OF SERVICE",
  "CONTACT INFORMATION",
];

// Section contents (each element is an array of paragraphs)
const sectionContents = [
  [
    "By using the Rajshala Fashions website, you confirm that you are of legal age in your place of residence, or that you have obtained permission from a parent or guardian to allow any minor dependents to access and use this site.You agree that you will not use our products or services for any illegal, unauthorized, or harmful purposes. This includes, but is not limited to, violating intellectual property laws or transmitting viruses, malware, or any destructive code.Any breach of these terms may result in immediate suspension or termination of your access to Rajshala Fashions  services and accounts.",
  ],
  [
    "Rajshala Fashions reserves the right to refuse service to any user at any time and for any reason.You acknowledge that any content you submit to our website (excluding payment or credit card information) may be transmitted over networks unencrypted. Such transmissions may include:Sending content through multiple networks, andAdjustments or formatting changes required to meet technical standards of different networks or devices.Rest assured, all credit card and payment information is securely encrypted during transmission to protect your data.You also agree not to reproduce, copy, sell, resell, or exploit any part of the website or its services without Rajshala Fashions ’s express written consent. This includes content, products, services, or any contact information obtained through the website.",
  ],
  [
    "Rajshala Fashions  strives to provide accurate, up-to-date, and complete information on our website. However, we cannot guarantee that all content, product descriptions, images, pricing, or other information is error-free, current, or complete at all times.The materials on our website are intended for general information purposes only and should not be relied upon as the sole source for making decisions regarding purchases or services. We encourage customers to verify details or consult with us directly if needed.Some information on the website may be historical or reference-based and may not reflect current conditions. Rajshala Fashions  reserves the right to update, correct, or modify website content at any time without prior notice. It is your responsibility to review any updates or changes that may affect your purchases or use of our services.",
  ],
  [
    "All prices for products and services offered on Rajshala Fashions are subject to change without prior notice.We reserve the right to modify, update, or discontinue any product, service, or content on our website at any time. This includes changes to product availability, features, or service offerings.Rajshala Fashions will not be liable for any consequences, losses, or damages that may result from price changes, modifications, suspension, or discontinuation of any product or service, whether to you or to any third party.",
  ],
  [
    "Certain products and services on Rajshala Fashions may be available exclusively online and could have limited stock. All purchases are subject to our Return & Exchange Policy if applicable.",
    "We make every effort to display product colors, designs, and images as accurately as possible. However, actual colors may vary slightly due to differences in monitors, screens, or lighting conditions.",
    "Rajshala Fashions reserves the right to:Limit sales of products or services to any individual, region, or jurisdiction.Restrict quantities per order or per customer to ensure fair availability.Discontinue any product or service at any time, without prior notice.All product descriptions, images, and pricing are provided for informational purposes only and may change at our discretion. Any offers or promotions displayed on the website are void where prohibited.",
  ],
  [
    "When placing an order with Rajshala Fashions, you agree to provide complete, accurate, and up-to-date information for all purchases and account details, including your name, billing address, shipping address, email, and payment information.We reserve the right to refuse, limit, or cancel any order at our discretion. This includes orders that appear to be placed by resellers, distributors, or using duplicate accounts, credit cards, or addresses.If an order is modified or canceled due to inaccuracies or suspected misuse, we will attempt to notify you via the contact information provided at the time of purchase.You are responsible for keeping your account information current, including updating email addresses, phone numbers, and payment methods, to ensure seamless processing of your transactions and communication.",
  ],
  [
    "Rajshala Fashions may provide access to certain third-party tools or resources to enhance your shopping experience. These tools are provided “as is” and “as available” without any warranties, representations, or endorsements from Rajshala Fashions.",
    "We do not monitor or control these third-party tools, and we are not responsible for any issues, damages, or losses arising from their use.",
    "Any use of these optional tools is entirely at your own risk. We encourage you to review the terms and conditions of the third-party provider before using their services",
    "In the future, Rajshala Fashions may introduce new features, tools, or services. All new offerings will be governed by these Terms of Service unless otherwise specified.",
  ],
  [
    "Some content, products, or services on Rajshala Fashions may include links to third-party websites that are not affiliated with or controlled by us.",
    "We are not responsible for the accuracy, legality, or content of any third-party website, and we do not endorse any products, services, or information offered by these external sites.",
    "Any transactions, purchases, or interactions conducted on third-party websites are solely between you and the third party. We recommend reviewing their policies, terms, and practices before engaging in any transaction.Rajshala Fashions will not be liable for any loss, damage, or issues resulting from your use of third-party websites, including claims related to products, services, or content obtained through them.",
  ],
  [
    "If you submit comments, suggestions, ideas, or other materials to Rajshala Fashions whether requested (e.g., contest entries) or unsolicited you agree that we may use, edit, publish, distribute, translate, or otherwise utilize such submissions in any form or medium without restriction.By submitting content, you acknowledge that Rajshala Fashions:Is not obligated to maintain any submission in confidence.Is not required to provide compensation for any submissions.May use submissions freely for business or promotional purposes.You also agree that any submissions you provide will not infringe on the rights of others, including copyright, trademark, privacy, or other proprietary rights. Submissions must not contain illegal, abusive, obscene, or harmful content, including viruses or malware that could compromise the website or other users.",
  ],
  [
    "At Rajshala Fashions, your privacy is important. Any personal information you share is used only to process orders, communicate with you, and improve your shopping experience. We take strong measures to protect your data and never sell or share it with unauthorized third parties. For more details, please refer to our Privacy Policy.",
  ],
  [
    "We strive for accuracy, but errors in product details, pricing, or availability may occur.Rajshala Fashions reserves the right to correct mistakes, update information, or cancel orders if necessary, without prior notice.",
  ],
  [
    "You may not use the Rajshala Fashions website or its content for any unlawful, harmful, or abusive activities. This includes violating intellectual property rights, spreading malware, spamming, harassing others, or attempting to damage or access our systems without authorization",
  ],
  [
    "Rajshala Fashions provides all products and services on an “as is” and “as available” basis, without any guarantees or warranties of any kind.We do not guarantee uninterrupted, secure, or error-free service. To the fullest extent permitted by law, Rajshala Fashions shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or products.",
  ],
  [
    "You agree to indemnify and hold harmless Rajshala Fashions, its owners, employees, and affiliates from any claims, losses, or expenses arising out of your violation of these Terms, misuse of the website, or breach of any applicable law or third-party rights.",
  ],
  [
    "If any part of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to remain fully effective and enforceable.",
  ],
  [
    "These Terms remain in effect unless terminated by you or Rajshala Fashions. We reserve the right to suspend or terminate access to our website or services at any time if these Terms are violated, without prior notice.",
  ],
  [
    "These Terms of Service constitute the entire agreement between you and Rajshala Fashions and supersede any prior communications or agreements regarding the use of our website and services.",
  ],
  [
    "These Terms of Service shall be governed by and interpreted in accordance with the laws of India",
  ],
  [
    "Rajshala Fashions reserves the right to update, modify, or replace any part of these Terms at any time. Changes will be posted on this page, and continued use of the website implies acceptance of the updated Terms.",
  ],
  [
    "If you have any questions regarding these Terms of Service, please contact us at ",
    "Email: info@rajshalafashion.com",
    "Address: Plot No. 221-A, S.N. 3, Ground Floor, Kalwar Road, Sanjay Nagar-A, Jhotwara, Jaipur, Rajasthan – 302012, India",
    "Phone: 0141-4511098",
  ],
];

// Component
export default function TermsOfService() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14 text-gray-800 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-[#393838] mb-4">Terms of Service</h1>
        <p className="text-md text-gray-600">
          Please read our terms carefully before using Rajshala Fashion services.
        </p>
      </div>

      <div className="space-y-12">
        {sectionTitles.map((title, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 border-l-4 border-[#393838]"
          >
            <h2 className="text-2xl font-semibold text-[#393838] mb-4 uppercase tracking-wide">
              Section {index + 1}: {title}
            </h2>
            <div className="space-y-3">
              {sectionContents[index].map((paragraph, pIdx) => (
                <p key={pIdx} className="text-gray-700 leading-relaxed text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}
