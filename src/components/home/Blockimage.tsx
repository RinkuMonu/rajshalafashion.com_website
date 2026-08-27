"use client";
import { Link } from "react-router-dom";

export default function BlockImageSection() {
  return (
    <section className="w-full bg-[#eef5f7] mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 min-h-[70vh]">

        {/* TOP LEFT – IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src="/home/block1-img.JPG"
            alt="Story video"
            className="w-full h-[70vh] object-cover object-top"
          />
        </div>

        {/* TOP RIGHT – CONTENT */}
        <div className="flex items-center px-8 lg:px-20">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#d4a84e]" />
              <h4 className="font-semibold">Formal Edition</h4>
            </div>

            <p className="text-[#d4a84e] italic mb-4 text-2xl">New creations</p>

            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              Our formal and classic collection introduces a new chapter of timeless menswear — where heritage craftsmanship meets contemporary refinement. Inspired by iconic silhouettes, these designs are created for men who value elegance, quality, and lasting impression.
            </p>

            <Link to="/category/blazer-and-coats" className="bg-[#d4a84e] text-white px-10 py-3 text-sm tracking-wide hover:bg-black transition">
              DISCOVER
            </Link>
          </div>
        </div>

        {/* BOTTOM LEFT – CONTENT */}
        <div className="flex items-center px-8 lg:px-20">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#f4e360]" />
              <h4 className="font-semibold text-2xl">Why Choose us ?</h4>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 text-base">
             We are dedicated to redefining formal menswear through timeless design, precision tailoring, and uncompromising quality. Every garment is crafted using premium fabrics, classic silhouettes, and modern fits — ensuring you look distinguished on every occasion.
            </p>

            <Link to="/products" className="bg-[#d4a84e] text-white px-10 py-3 text-sm tracking-wide hover:bg-black transition">
              DISCOVER
            </Link>
          </div>
        </div>

        {/* BOTTOM RIGHT – IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src="/home/block2.jpg"
            alt="Watch tailor"
            className="w-full h-[70vh] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
