"use client";
import { Link } from "react-router-dom";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { PiCoatHangerDuotone } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";

export default function Footer() {

  const links = [
    { name: "About", href: "/about-us" },
    { name: "Products", href: "/products" },
  ];

  const categories = [
    {
      title: "Top Wear",
      items: [
        { name: "T-Shirts", link: "/category/t-shirts" },
        { name: "Casual Shirts", link: "/category/casual-shirts" },
        { name: "Blazers & Coats", link: "/category/blazer-and-coats" },
        { name: "Suits", link: "/category/suits" },
      ],
    },
    {
      title: "Bottom Wear",
      items: [
        { name: "Jeans", link: "/category/jeans" },
        { name: "Trousers", link: "/category/casual-trousers" },
        { name: "Shorts", link: "/category/shorts" },
        { name: "Track Pants", link: "/category/track-pants-and-joggers" },
      ],
    },
    {
      title: "Ethnic Wear",
      items: [
        { name: "Kurtas", link: "/category/kurta-sets" },
        { name: "Nehru Jackets", link: "/category/nehru-jackets" },
        { name: "Sherwanis", link: "/category/sherwanis" },
        { name: "Dhotis", link: "/category/dhotis" },
      ],
    },
    {
      title: "Casual Fits",
      items: [
        { name: "Shorts & Neckers", link: "/category/shorts" },
        { name: "T shirts", link: "/category/t-shirts" },
        { name: "Trousers", link: "/category/casual-trousers" },
      ],
    },
  ];

  return (
    <footer
      className="relative overflow-hidden bg-[#0f172a] text-gray-300"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,0,0,0.85), rgba(0,0,0,0.75), rgba(0,0,0,0.9)), url('/home/footer-bg.JPG')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >

      {/* 🎨 Decorative Hangers */}
      <div className="pointer-events-none absolute inset-0 z-0">

        <PiCoatHangerDuotone className="absolute right-6 top-44 text-[#dc9f19] opacity-20 text-5xl" />

        <PiCoatHangerDuotone className="absolute right-24 top-32 text-[#dc9f19] opacity-15 text-7xl" />

        <PiCoatHangerDuotone className="absolute right-10 bottom-45 text-[#dc9f19] opacity-20 text-6xl" />

        <PiCoatHangerDuotone className="absolute right-32 bottom-20 text-[#dc9f19] opacity-10 text-8xl" />

      </div>



      {/* Top Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <img src="/home/rajshala-logo.png" alt="footer-Logo" className="h-24 bg-gray-100 p-3 rounded-md mb-4" />
          <p className="text-sm leading-relaxed text-gray-300 mt-5">
            Premium men’s wear crafted for style, comfort, and confidence. Every outfit is designed to elevate your everyday look.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-[2px] after:bg-[#cba146]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {links.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="hover:text-[#cba146] transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-[2px] after:bg-[#cba146]">Visit Us On</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-[#cba146] transition flex items-start gap-2">
              📍
              <div className="leading-snug">
              Plot No. 221-A, S.N. 3, Ground Floor, Kalwar Road, Sanjay Nagar-A, Jhotwara, Jaipur, Rajasthan – 302012, India
              </div>
            </li>

           
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-[2px] after:bg-[#cba146]">Contact</h3>
          <div className="flex items-center gap-4">

<ul>
   <li>
              <Link to="mailto:info@rajshalafashion.com" className="hover:text-[#cba146] transition flex items-center gap-2 pt-4">
                ✉️ info@rajshalafashion.com
              </Link>
            </li>
             <li>
             <Link
  to="tel:+917733993784"
  className="hover:text-[#cba146] transition flex items-center gap-2 pt-4"
>
  <FiPhone /> +91 7733993784
</Link>
            </li>
</ul>



            {/* <Link
              to="https://www.instagram.com/verilyuniquefashion/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#cba146] hover:text-black transition"
            >
              <FaInstagram />
            </Link>

            <Link
              to="https://x.com/verilyunique"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#cba146] hover:text-black transition"
            >
              <FaXTwitter />
            </Link>

            <Link
              to="https://in.pinterest.com/verilyunique/_pins/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#cba146] hover:text-black transition"
            >
              <FaPinterestP />
            </Link>

            <Link
              to="https://www.facebook.com/profile.php?id=61587412330924"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#cba146] hover:text-black transition"
            >
           <FaFacebookF />
            </Link> */}
          </div>
        </div>
      </div>

      {/* 🔥 New Categories Section */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h4 className="text-white font-semibold text-lg mb-4 relative after:absolute after:left-0 after:-bottom-1 after:w-10 after:h-[2px] after:bg-[#cba146]">
                {cat.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Link to={item.link} className="hover:text-[#cba146] transition">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Links */}
      <div className="relative z-10">
        <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-x-3 gap-y-2 pb-3 px-3 text-sm sm:text-base">
          <li><Link to="/privacy-policy" className="text-gray-300 hover:text-gray-100 transition">Privacy Policy</Link></li>
          <span className="hidden sm:inline">|</span>
          <li><Link to="/returns-and-exchanges" className="text-gray-300 hover:text-gray-100 transition">Refund Policy</Link></li>
          <span className="hidden sm:inline">|</span>
          <li><Link to="/terms-of-service" className="text-gray-300 hover:text-gray-100 transition">Terms Policy</Link></li>
          <span className="hidden sm:inline">|</span>
          <li><Link to="/cancellation_policy" className="text-gray-300 hover:text-gray-100 transition">Cancellation Policy</Link></li>
          <span className="hidden sm:inline">|</span>
          <li><Link to="/shipping-policy" className="text-gray-300 hover:text-gray-100 transition">Shipping Policy</Link></li>
        </ul>
      </div>

      {/* Copyright */}
      <div className="relative z-10 border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Rajshala Fashion Private Limited. All rights reserved.
      </div>
    </footer>
  );
}
