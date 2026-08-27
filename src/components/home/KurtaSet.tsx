// 'use client';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import {  Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Link } from 'react-router-dom';
// export default function Kurtaset() {
//     const products = [
//         { name: 'Chinos Set', price: '$95', colors: '2 Colors available', img: 'home/1.jpg' },
//         { name: 'The Utility Jacket', price: '$85', colors: '5 Colors available', img: 'home/2.jpg' },
//         { name: 'The Bomber Jacket', price: '$90', colors: '3 Colors available', img: 'home/3.jpg' },
//         { name: 'Suede Jacket', price: '$85', colors: '7 Colors available', img: 'home/1.jpg' },
//         { name: 'Chinos Set', price: '$95', colors: '2 Colors available', img: 'home/2.jpg' },
//         { name: 'The Utility Jacket', price: '$85', colors: '5 Colors available', img: 'home/3.jpg' },
//         { name: 'The Bomber Jacket', price: '$90', colors: '3 Colors available', img: 'home/1.jpg' },
//         { name: 'Suede Jacket', price: '$85', colors: '7 Colors available', img: 'home/2.jpg' }, 
//     ];

//     return (
//         <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 border border-top">
//             {/* Hero Section - Fixed */}
//             <div className="text-left mb-4 max-w-7xl mx-auto">
//                 <h1 className="text-3xl sm:text-4xl lg:text-xl font-bold text-gray-900 mb-6 leading-tight">
//                     Top Kurta Sets
//                     <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#cba146] mt-2">Top Kurta</span>
//                 </h1>
//             </div>

//             {/* Fixed Swiper Container */}
//             <div className="max-w-7xl mx-auto">
//                 <Swiper
//                     modules={[ Pagination, Autoplay]}
//                     spaceBetween={20}
//                     slidesPerView={4.5}
//                     breakpoints={{
//                         640: { slidesPerView: 2, spaceBetween: 24 },
//                         1024: { slidesPerView: 3, spaceBetween: 30 },
//                         1280: { slidesPerView: 4, spaceBetween: 32 },
//                     }}
               
//                     autoplay={{ delay: 4000,  }}
//                     loop={true}
//                     className="swiper-custom h-96 lg:h-[28rem]"
//                 >
//                     {products.map((product, index) => (
//                         <SwiperSlide key={index}>
//                             <Link to={"/"} className="group relative h-full block overflow-hidden rounded-md shadow-2xl hover:shadow-3xl transition-all duration-700 w-full bg-gradient-to-br from-gray-50 to-gray-100">
//                                 {/* Fixed Image - Full coverage */}
//                                 <div className="absolute inset-0 w-full h-full">
//                                     <img
//                                         src={product.img}
//                                         alt={`Model in ${product.name}`}
//                                         className="w-full h-full object-containe transition-transform duration-700"
//                                     />
//                                 </div>
                                
//                                 {/* Overlay Gradient */}
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                
//                                 {/* Content */}
//                                 <div className="absolute bottom-6 left-6 right-6">
//                                     <h3 className="text-2xl font-bold text-white drop-shadow-2xl mb-2 leading-tight">
//                                         {product.name}
//                                     </h3>
//                                     <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block mb-2">
//                                         <p className="text-white text-xl font-bold drop-shadow-lg">{product.price}</p>
//                                     </div>
//                                     <p className="text-white/90 text-sm font-medium drop-shadow-lg">{product.colors}</p>
//                                 </div>
//                             </Link>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* Custom Navigation Buttons */}
//                 {/* <div className="flex justify-between mt-8">
//                     <button className="swiper-button-prev-custom w-12 h-12 lg:w-16 lg:h-16 bg-white/80 hover:bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-800 text-xl font-bold transition-all duration-300 hover:scale-110 -ml-4 lg:-ml-6">
//                         ‹
//                     </button>
//                     <div className="flex space-x-2">
//                         <div className="w-3 h-3 rounded-full bg-[#cba146] opacity-70" />
//                         <div className="w-3 h-3 rounded-full bg-white/50" />
//                         <div className="w-3 h-3 rounded-full bg-white/50" />
//                         <div className="w-3 h-3 rounded-full bg-white/50" />
//                     </div>
//                     <button className="swiper-button-next-custom w-12 h-12 lg:w-16 lg:h-16 bg-white/80 hover:bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-800 text-xl font-bold transition-all duration-300 hover:scale-110 -mr-4 lg:-mr-6">
//                         ›
//                     </button>
//                 </div> */}
//             </div>
//         </section>
//     );
// }



'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

export default function Kurtaset() {
  const [products, setProducts] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const imageBaseUrl = import.meta.env.VITE_API_BASE_URL_IMAGE;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}&category=kurta+sets`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.log("Error fetching kurta set products:", error);
      }
    };

    fetchProducts();
  }, [baseUrl, referenceWebsite]);

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 border border-top">
      <div className="text-left mb-4 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-xl font-bold text-gray-900 mb-6 leading-tight">
          Top Kurta Sets
          <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#cba146] mt-2">
            Top Kurta
          </span>
        </h1>
      </div>

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
          autoplay={{ delay: 4000 }}
          loop={true}
          className="swiper-custom h-96 lg:h-[28rem]"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/product/${product._id}`}
                className="group relative h-full block overflow-hidden rounded-md shadow-2xl hover:shadow-3xl transition-all duration-700 w-full bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={`${imageBaseUrl}${product.images[0]}`}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white drop-shadow-2xl mb-2 leading-tight">
                    {product.productName}
                  </h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block mb-2">
                    <p className="text-white text-xl font-bold drop-shadow-lg">
                     ₹{Math.round(product.actualPrice)}
                    </p>
                  </div>
                  <p className="text-white/90 text-sm font-medium drop-shadow-lg">
                    {product.size?.length || 0} Sizes available
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
