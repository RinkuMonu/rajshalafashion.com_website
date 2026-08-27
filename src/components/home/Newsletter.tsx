import React, { useState } from "react";
import shape1 from "../../assest/shape-1.png";
import shape2 from "../../assest/shape-2.png";
import shape3 from "../../assest/shape-3.png";
import shape4 from "../../assest/shape-4.png";
import plane from "../../assest/plane.png";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here (e.g., send email to an API)
    console.log("Email submitted:", email);
  };

  return (
    <section className="relative pt-20 pb-16 bg-[#5252a2] text-white z-[1]">
      {/* Background shapes */}
      <div className="hidden sm:block">
        {/* Shape 1 - Position it to cover the top */}
        <img
          src={shape1}
          alt="Subscribe Shape 1"
          className="mix-blend-luminosity opacity-40 absolute z-[-1] left-0 max-w-full top-0 align-middle"
        />
        {/* Shape 2 - Positioned in the middle left */}
        <img
          src={shape2}
          alt="Subscribe Shape 2"
          className="absolute left-[10%] top-[53%] mix-blend-luminosity opacity-40 z-[-1] align-middle"
        />
        {/* Shape 3 - Positioned at the bottom left */}
        <img
          src={shape3}
          alt="Subscribe Shape 3"
          className="absolute left-[12%] bottom-[10%] mix-blend-luminosity opacity-40 z-[-1] align-middle"
        />
        {/* Shape 4 - Positioned at the top right */}
        <img
          src={shape4}
          alt="Subscribe Shape 4"
          className="absolute right-[12%] top-[-5%] z-[-1] align-middle"
        />
        {/* Plane image */}
        <div className="absolute h-[110px] right-[17%] top-[24%] w-[399px] z-[-2]">
          <img
            className="absolute left-[-6%] top-[-34%] align-middle"
            src={plane}
            alt="Plane"
          />

          <svg
            width="399"
            height="110"
            className="hidden sm:block tp-subscribe-plane animate-svg-line stroke-dashed stroke-2 stroke-black"
            viewBox="0 0 399 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.499634 1.00049C8.5 20.0005 54.2733 13.6435 60.5 40.0005C65.6128 61.6426 26.4546 130.331 15 90.0005C-9 5.5 176.5 127.5 218.5 106.5C301.051 65.2247 202 -57.9188 344.5 40.0003C364 53.3997 384 22 399 22"
              stroke="white"
              strokeOpacity="0.5"
              strokeDasharray="3 3"
            ></path>
          </svg>
          <svg
            className="sm:hidden"
            width="193"
            height="110"
            viewBox="0 0 193 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1C4.85463 20.0046 26.9085 13.6461 29.9086 40.0095C32.372 61.6569 13.5053 130.362 7.98637 90.0217C-3.57698 5.50061 85.7981 127.53 106.034 106.525C145.807 65.2398 98.0842 -57.9337 166.742 40.0093C176.137 53.412 185.773 22.0046 193 22.0046"
              stroke="white"
              strokeOpacity="0.5"
              strokeDasharray="3 3"
            ></path>
          </svg>
        </div>
      </div>

      {/* Container for content */}
      <div className="container">
        <div className="flex flex-col md:flex-row items-center px-8">
          {/* Left content */}
          <div className="w-full lg:w-7/12">
            <div className="text-white">
              <span className="text-sm font-medium uppercase">
                Sale 20% off all store
              </span>
              <h3 className="text-4xl font-extrabold leading-tight mb-0">
                Subscribe to Our Newsletter
              </h3>
            </div>
          </div>

          {/* Right content (form) */}
          <div className="w-full lg:w-5/12">
            <div className="tp-subscribe-form">
              <form
                onSubmit={handleSubmit}
                className="subscribe-form dirty-check"
              >
                <input
                  name="_token"
                  type="hidden"
                  value="mqur9eS5Tv3eObOxsRnAQ3gIn1FIAvre0nzyDySG"
                />

                <div className="tp-subscribe-input relative md:mt-0 mt-4">
                  {/* <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="bg-white border-0 rounded-xl shadow-md font-sans h-16 px-16 w-full"
                  /> */}

                  <input
  type="email"
  placeholder="Enter Your Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="bg-white border-0 rounded-xl shadow-md font-sans h-16 px-16 w-full"
/>

                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-8 bg-black text-white rounded-r-xl shadow-md hover:bg-gray-800"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
