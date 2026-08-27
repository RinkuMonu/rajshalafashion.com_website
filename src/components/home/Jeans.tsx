'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';

export default function Jeans() {
  const [products, setProducts] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const imageBaseUrl = import.meta.env.VITE_API_BASE_URL_IMAGE;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}&limit=100`
        );
        const data = await res.json();
        
        if (data.products && Array.isArray(data.products)) {
          // Filter products by Jeans category
          const filteredProducts = data.products.filter((product) => {
            const categoryName = product.category?.name?.toLowerCase() || '';
            return (
              categoryName.includes('jeans') ||
              categoryName.includes('denim') ||
              categoryName.includes('jean')
            );
          });
          
          // Remove duplicates based on product _id
          const uniqueProducts = Array.from(
            new Map(filteredProducts.map(item => [item._id, item])).values()
          );
          
          console.log('Jeans Products Found:', uniqueProducts.length);
          console.log('Sample Jeans Product:', uniqueProducts[0]);
          
          setProducts(uniqueProducts.slice(0, 12)); // Show max 12 products
        }
      } catch (error) {
        console.error("Error fetching jeans products:", error);
      }
    };

    fetchProducts();
  }, [baseUrl, referenceWebsite]);

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 border-t">
      <div className="text-left mb-4 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-xl font-bold text-gray-900 mb-6 leading-tight">
          Premium Jeans Collection
          <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#cba146] mt-2">
            Top Jeans
          </span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading Jeans products...</p>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={14}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            autoplay={{ delay: 4000 }}
            loop={products.length > 4}
            className="swiper-custom h-96 lg:h-[28rem]"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id || index}>
                <Link
                  to={`/product/${product._id}`}
                  className="group relative h-full block overflow-hidden rounded-md shadow-2xl hover:shadow-3xl transition-all duration-700 w-full bg-gradient-to-br from-gray-50 to-gray-100"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={`${imageBaseUrl}${
                        Array.isArray(product.images) 
                          ? product.images[0] 
                          : product.images
                      }`}
                      alt={product.productName || 'Jeans'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-2xl mb-2 leading-tight line-clamp-2">
                      {product.productName || 'Jeans'}
                    </h3>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block mb-2">
                      <p className="text-white text-xl font-bold drop-shadow-lg">
                        ₹{Math.round(product.actualPrice || product.price || 0)}
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
        )}
      </div>
    </section>
  );
}
