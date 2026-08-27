// Full code for Terms & Conditions page styled like Terms of Service with full content
"use client";

import React from "react";

export default function TermsConditions() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-extrabold text-[#393838] mb-6 border-b pb-4 border-gray-300">Terms & Conditions</h1>

      {termsSections.map((section, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#393838] mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          {section.content.map((para, idx) => (
            <p key={idx} className="mb-3 text-justify leading-relaxed text-gray-700">{para}</p>
          ))}
        </div>
      ))}

      {/* <div className="mt-12 text-sm text-gray-600 space-y-2 border-t border-gray-300 pt-6">
        <p>
          <strong>Shop by Craft:</strong>{" "}
          <span className="text-gray-700">
            Rajshala Fashion | Dabu Print | Sanganeri Print | Discharge Print | Tine And Dye Print | Black And White Print
          </span>
        </p>
        <p>
          <strong>Shop by Collection:</strong>{" "}
          <span className="text-gray-700">
            Cotton Suit Sets | Cotton Suit With Chiffon Dupatta | Cotton Suit With Cotton Dupatta | Cotton Suit With Kota Doria Dupatta | Maheshwari Silk Suit | Chanderi Silk Suit Sets
          </span>
        </p>
      </div> */}
    </div>
  );
}

const termsSections = [
    {
      title: "Terms & Acceptance",
      content: [
        "Please read the following terms and conditions very carefully as your use of service is subject to your acceptance of and compliance with the following terms and conditions (\"Terms\").",
        "By subscribing to or using any of our services you agree that you have read, understood and are bound by the Terms, regardless of how you subscribe to or use the services. If you do not want to be bound by the Terms, you must not subscribe to or use our services."
      ]
    },
    {
      title: "Introduction to Rajshala Fashion",
      content: [
        "Welcome to “Rajshala Fashion”. The domain name www.rajfashion.com (hereinafter referred to as the \"Website\") is registered in proprietorship firm incorporated under the laws of India.",
        "If you use any of the services of the Website, its features and tools, you will be subject to the guidelines, terms and agreements applicable to the Website. By the mere use of the Website, you shall be contracting with “Rajshala Fashion”. These terms and conditions constitute binding obligations between you and us.",
        "All products /services and information displayed on the Website constitute an \"invitation to offer\". Your order for purchase constitutes your \"offer\", which shall be subject to the terms and conditions as listed below. We reserve the right to accept or reject your offer. Our acceptance of your order will take place upon dispatch of the product(s) ordered. No act or omission of “Rajshala Fashion” prior to the actual dispatch of the product(s) ordered will constitute acceptance of your offer."
      ]
    },
    {
      title: "Services Offered",
      content: [
        "www.rajfashion.com is an online website to provide Running Materials or Clothing Materials which can be further customize as per the requirement of the end user. Users can make a purchase from the website. Upon placing an order, we shall ship the product to you and be entitled to its payment for the services."
      ]
    },
    {
      title: "Account and Registration",
      content: [
        "We will protect Your Information in accordance with our Privacy Policy. If you use the Website, (i) you are responsible for maintaining the confidentiality of your account and password, (ii) for restricting access to your computer, and (iii) you agree to accept responsibility for all activities that occur under your account or password.",
        "We shall not be liable to any person for any loss or damage which may arise as a result of any failure by you to protect your password or account. If you know or suspect that someone else knows your password, you should notify us by contacting us immediately through the address provided below. If we have a reason to believe that there is likely to be a breach of security or misuse of the Website, we may require you to change your password or we may suspend your account without any liability to Rajshala Fashion."
      ]
    },
    {
      title: "Pricing",
      content: [
        "Prices for products are described on our Website and are incorporated into these Terms by reference. All prices are in Indian rupees which can be change in different currencies. Prices, products and Services may change at www.rajfashion.com discretion.",
        "Please note that the payment may be processed prior to the dispatch of the product that you have ordered. If we have to cancel the order after we have processed the payment, the said amount will be reversed back to the account from which you had made payments in respect of the order."
      ]
    },
    {
      title: "Cancellation by Us",
      content: [
        "We reserve the right, at our sole discretion, to refuse or cancel any order for any reason. Some situations that may result in your order being cancelled include limitations on quantities available for purchase, inaccuracies or errors in product or pricing information, or problems identified by our credit and fraud avoidance department. We may also require additional verifications or information before accepting any order. We will contact you if all or any portion of your order is cancelled or if additional information is required to accept your order. If your order is cancelled after you have made payment for the same, the said amount will be reversed back to the account from which payment was made."
      ]
    },
    {
      title: "Cancellation by You",
      content: [
        "In case we receive a cancellation notice from you and the order has not been shipped by us, we shall cancel the order and refund the entire amount as a store credit, in case payment has already been made. The orders that have already been shipped by us will not be cancelled and you will have to check our return policy for those orders."
      ]
    },
    {
      title: "Final and Binding Decision",
      content: [
        "Any decision taken by us in respect of cancellation of an order shall be final and binding on you. You hereby agree to not dispute the decision made by us and accept the decision regarding such cancellation."
      ]
    },
    {
      title: "Credit/Debit Card Details",
      content: [
        "We at Rajshala Fashion believe that the Debit/Credit card details provided by you to get the services from website will be correct and accurate and you will not provide any card details which are legally not owned by you.",
        "We will not utilize the information provided by you and will not be shared by the website with any of the third parties unless required for fraud verification or by law, regulation or court order. We will not be liable for any Debit/Credit card fraud."
      ]
    },
    {
      title: "COD Payments",
      content: [
        "Kindly note, COD is not applicable on orders above INR 10,000."
      ]
    },
    {
      title: "Fraudulent/Declined Transactions",
      content: [
        "To provide a safe and secure shopping experience, we regularly monitor transactions for fraudulent activity. In the event of detecting any suspicious activity, We reserves the right to cancel all past, pending and future orders without any liability. If your order being canceled and your card is charged we will reverse the charged amount to your account except processing fee of payment gateway or as per the conditions of Transaction merchant.",
        "The customer may be considered fraudulent if any of the following scenarios are met:",
        "Customer doesn't reply to the payment verification mail sent by us",
        "Customer fails to produce adequate documents during the payment details verification",
        "Misuse of another customer's phone/email",
        "Customer uses invalid email and phone no.",
        "Overuse of a voucher code",
        "Use of a special voucher not tagged to the email ID used.",
        "Customer returns the wrong product",
        "Customer refuses to pay for an order",
        "Customer is involved in the snatch and run for any order",
        "The customer may be considered a loss to business if any of the following scenarios are met:",
        "Customer with a very high return rate",
        "Invalid/Incomplete address cases",
        "Repeated request for monetary compensation for petty issues",
        "Account for the customers falling in fraudulent or loss to business category may be blocked."
      ]
    },
    {
      title: "Colors",
      content: [
        "We have made every effort to display the colours of our products that appear on the Website as accurately in reality. However, as the actual colours you see will depend on your monitor color settings, we cannot guarantee that your monitor's display of any colour will be accurate."
      ]
    },
    {
      title: "Modification of Terms & Conditions of Service",
      content: [
        "We can at any time modify the Terms of Use without any prior notification being provided to you. You can access the latest version of the Terms of Use at any given time on the Website. You should regularly review the Terms of Use on the Website. In the event the modified Terms of Use are not acceptable to you, you can discontinue using the service. However, if you are continuing to use the service you will be deemed to have agreed to accept and abide by the modified Terms of Use of this Website."
      ]
    },
    {
      title: "Contact",
      content: [
        "If you still have any query about our terms and conditions kindly drop us an email at  info@rajshalafashion.com, we will reply you within 1-2 working days."
      ]
    }
  ];
