"use client";
import { Link } from "react-router-dom";

export default function AboutBannerSection() {
  return (
 <section className="w-full shadow-xl bg-[url('/about/about-bg.jpg')] bg-cover bg-center relative">
  
  {/* Left black gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    {/* Your content here */}
  </div>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    
    {/* Left Content */}
    <div>
      <p className="uppercase tracking-widest text-sm font-semibold text-[#cba146] mb-3">
        About
      </p>

      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
        Dress Sharp, <br className="hidden md:block" />
        Live Confident
      </h1>

      <p className="text-gray-200 max-w-xl mb-8">
        Discover premium men’s fashion designed for style, comfort, and confidence. From everyday essentials to statement outfits, our collection blends modern trends with timeless craftsmanship to elevate your wardrobe.
      </p>

      <Link
        to="/shop"
        className="inline-flex items-center justify-center rounded-full bg-[#cba146] px-8 py-3 text-black font-semibold shadow-md hover:bg-white transition"
      >
        Shop Now
      </Link>
    </div>

  </div>
</section>

  );
}
