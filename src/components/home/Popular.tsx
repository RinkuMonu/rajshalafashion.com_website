'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

export default function Popular() {
    const products = [
        { name: 'Chinos Set', price: '$95', colors: '2 Colors available', img: 'home/1.jpg' },
        { name: 'Utility Jacket', price: '$85', colors: '5 Colors available', img: 'home/2.jpg' },
        { name: 'Bomber Jacket', price: '$90', colors: '3 Colors available', img: 'home/3.jpg' },
        { name: 'Suede Jacket', price: '$85', colors: '7 Colors available', img: 'home/1.jpg' },
        { name: 'Chinos Set', price: '$95', colors: '2 Colors available', img: 'home/2.jpg' },
        { name: 'Suede Jacket', price: '$85', colors: '7 Colors available', img: 'home/2.jpg' },
    ];
    return (
        <section className="min-h-screen bg-white pt-12 px-4 sm:px-6 lg:px-8">
            {/* Hero Section - Fixed */}
            <div className="text-left mb-4 max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl lg:text-xl font-bold text-gray-900 mb-6 leading-tight">Featured Products,<span className="block text-2xl sm:text-3xl lg:text-4xl text-[#cba146] mt-2">NEW JOURNEYS</span></h1></div>
            {/* Fixed Swiper Container */}
            <div className="max-w-7xl mx-auto">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={14}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                        1280: { slidesPerView: 4, spaceBetween: 32 },
                    }}
                    autoplay={{ delay: 4000, }}
                    loop={true}
                    className="swiper-custom h-96 lg:h-[28rem]"
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={index}>
                          <Link
  to={"/products"}
  className="group relative h-full block overflow-hidden rounded-md shadow-2xl hover:shadow-3xl transition-all duration-700 w-full bg-gradient-to-br from-gray-50 to-gray-100"
>
  {/* Image */}
  <div className="absolute inset-0 w-full h-full z-[1]">
    <img
      src={product.img}
      alt={`Model in ${product.name}`}
      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
    />
  </div>
  {/* Black base overlay */}
  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  {/* 🔥 Sliding gold layer (BOTTOM → TOP) */}
  <div className="absolute top-0 right-0 w-full h-full z-[3] bg-[#cba146]/40 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
  {/* Soft dark fade (still behind text) */}
  <div className="absolute inset-0 z-[4] bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  {/* ✅ CONTENT — ALWAYS TOP */}
  <div className="absolute bottom-6 right-6  z-[10]
                  opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 
                  transition-all duration-700 delay-100">
    <h3 className="text-2xl font-bold text-white drop-shadow-2xl mb-2 leading-tight">
      {product.name}
    </h3>
    <p className="text-white text-sm font-medium drop-shadow-xl">{product.colors}</p>
  </div>
</Link>
   </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                {/* <div className="flex justify-between mt-8">
                    <button className="swiper-button-prev-custom w-12 h-12 lg:w-16 lg:h-16 bg-white/80 hover:bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-800 text-xl font-bold transition-all duration-300 hover:scale-110 -ml-4 lg:-ml-6">
                        ‹
                    </button>
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#cba146] opacity-70" />
                        <div className="w-3 h-3 rounded-full bg-white/50" />
                        <div className="w-3 h-3 rounded-full bg-white/50" />
                        <div className="w-3 h-3 rounded-full bg-white/50" />
                    </div>
                    <button className="swiper-button-next-custom w-12 h-12 lg:w-16 lg:h-16 bg-white/80 hover:bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-800 text-xl font-bold transition-all duration-300 hover:scale-110 -mr-4 lg:-mr-6">
                        ›
                    </button>
                </div> */}
            </div>
        </section>
    );
}
