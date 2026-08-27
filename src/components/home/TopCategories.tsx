"use client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

export default function TopCategories() {
  const [categories, setCategories] = useState([])
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE
  const baseUrliMAGE = import.meta.env.VITE_API_BASE_URL_IMAGE;

  const linkUrl = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`)
        const data = await res.json()

        console.log('Categories API Response:', data);
        console.log('Categories Array:', data.website?.categories);

        if (Array.isArray(data.website?.categories)) {
          const categoriesWithImages = data.website.categories.map(cat => ({
            ...cat,
            // Ensure image path is present, fallback to placeholder
            image: cat.image || '/placeholder.svg'
          }));
          
          console.log('Processed Categories:', categoriesWithImages);
          setCategories(categoriesWithImages);
        } else {
          console.warn("Categories not found in response:", data);
          // Fallback categories (removed for clean API-based approach)
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // On error, show empty state
        setCategories([]);
      }
    };

    fetchCategories();
  }, [baseUrl, referenceWebsite])

  return (
    <section className="pt-20 border-b-2 px-4 bg-[#efeeee]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center justify-center mb-1">
            <span className="text-sm font-semibold py-3 underline inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Exclusive Collections
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <h2 className="text-5xl md:text-4xl font-bold" style={{ color: "#1B2E4F" }}>
            Our <span style={{ color: "#cba146" }}>Categories</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mt-4">
            Discover our acurated collection of traditional wear, each piece crafted with authentic techniques
          </p>
        </div>

        {/* ✅ Slider */}
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading categories...</p>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category._id || index} className="pb-10">
                <Link to={`/category/${linkUrl(category?.name)}`} className="group block h-full">

                  <div
                    className="bg-white rounded-xl border-2 overflow-hidden h-[72vh] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                    style={{ borderColor: "rgba(120, 120, 120, 0.3)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#cba146"
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(157, 48, 137, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(120, 120, 120, 0.3)"
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={category?.image ? `${baseUrliMAGE}${category.image}` : "/placeholder.svg"}
                        alt={category?.name || 'Category'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          console.error('Image load error for category:', category?.name);
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300"
                          style={{ background: "#cba146" }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-md font-bold mb-3" style={{ color: "#1B2E4F" }}>
                        {category?.name || 'Category'}
                      </h3>

                      <div
                        className="w-12 h-0.5 rounded-full mb-1 transition-all duration-300 group-hover:w-20"
                        style={{ background: "#cba146" }}
                      />

                      <p className="text-gray-600 text-[12px] mb-4 line-clamp-2">
                        {category?.description
                          ? category?.description
                          : `Explore our premium collection of ${category?.name?.toLowerCase() || 'products'} with authentic craftsmanship and quality materials.`}
                      </p>

                      <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        <span style={{ color: "#cba146" }}>Explore Collection</span>
                        <ArrowRight className="ml-2 h-4 w-4" style={{ color: "#cba146" }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Bottom Message */}
        {/* <div className="text-center mt-16">
          <p className="text-gray-600 font-medium">✨ Handcrafted with Love • Delivered with Care ✨</p>
        </div> */}

      </div>
    </section>
  )
}
