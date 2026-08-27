"use client";

import React from "react";

export default function ShippingDelivery() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-extrabold text-[#393838] mb-4 text-center border-b-slate-200 border-b pb-4 border-gray-300">
        Shipping Policy
      </h1>
     

      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#393838] space-y-4 text-justify text-gray-700 leading-relaxed">
        <p>
       At Rajshala Fashions , we take pride in delivering premium menswear with care and attention to quality. Our shipping policy ensures that your order reaches you safely and on time.
        </p>

        <h2 className="text-xl font-semibold mt-4">Delivery</h2>
        <p>
         We deliver across India and internationally using trusted courier partners.
Please ensure your shipping address is complete and accurate, as Rajshala Fashions  will not be responsible for delays caused by incorrect or incomplete addresses. Any reshipping charges in such cases will be borne by the customer.

        </p>

        <h2 className="text-xl font-semibold mt-4">Shipping Charges</h2>
        <p>
          <strong>India</strong> Free shipping on all orders .<br />
           <strong>International Orders:</strong>  Shipping charges are calculated based on destination and will be communicated before dispatch. These charges must be paid before the order is shipped.
.<br />
Courier receipts or tracking details will be shared with customers once the order is dispatched.

        </p>

        <h2 className="text-xl font-semibold mt-4">Taxes, Duties & Import Fees</h2>
        <p>
          Any GST, VAT, customs duties, local taxes, or import fees for international orders are the responsibility of the customer and must be paid to the courier or customs authorities at the time of delivery. <br />
          These charges are not included in the product price and vary depending on the destination country.
        </p>

        <h2 className="text-xl font-semibold mt-4">Shipment Time</h2>
        <p>
         Ready-to-ship products are dispatched within 5–7 business days of order confirmation.<br />
Made-to-Order (MTO) products are dispatched within 3–4 weeks, depending on customization and availability.<br />
Dispatch timelines are indicative and may vary for special or bulk orders.

        </p>

        <h2 className="text-xl font-semibold mt-4">Transit Risk</h2>
        <p>
         All orders are fully insured during transit at no extra cost to the customer.
        </p>

      

        <h2 className="text-xl font-semibold mt-4">Shipping Address</h2>
        <p>
        We do not deliver to P.O. Boxes or Drop Boxes.<br />
Customers must provide full, valid addresses with postal codes.<br />
Reshipping charges for incorrect or incomplete addresses are the customer’s responsibility.

        </p>

       
      </div>

      
    </div>
  );
}
