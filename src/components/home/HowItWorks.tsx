"use client"
import { Search, Palette, ShoppingBag } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="text-4xl" style={{ color: "#cba146" }} />,
      title: "Discover Heritage",
      description:
        "Explore our authentic collections of traditional wear, handcrafted with centuries-old techniques and timeless designs.",
    },
    {
      icon: <Palette className="text-4xl" style={{ color: "#cba146" }} />,
      title: "Choose Your Style",
      description:
        "Select from our curated range of ethnic wear with detailed craftsmanship guides and cultural significance for each piece.",
    },
    {
      icon: <ShoppingBag className="text-4xl" style={{ color: "#cba146" }} />,
      title: "Embrace Tradition",
      description:
        "Complete your purchase with confidence, knowing each piece carries the essence of our rich cultural heritage.",
    },
  ]

  return (
    <section className="relative py-20 px-4 bg-[#f9bd5b]/10">
    

      <div className="max-w-7xl mx-auto">
        {/* Traditional Header Section */}
        <div className="text-center mb-16">
          {/* Decorative top ornament */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #cba146, transparent)" }}
              />
              <div
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "#cba146", background: "rgba(120, 120, 120, 0.3)" }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: "#cba146" }} />
              </div>
              <div
                className="w-12 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #cba146, transparent)" }}
              />
            </div>
          </div>

          <h2 className="text-5xl font-bold mb-4 relative" style={{ color: "#1B2E4F" }}>
            <span className="relative z-10">Your Heritage <span className="text-[#cba146]">Journey</span></span>
            {/* Traditional text decoration */}
            <div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full opacity-30"
              style={{ background: "linear-gradient(90deg, #cba146, #A13C78, #cba146)" }}
            />
          </h2>

          <p className="text-xl font-semibold tracking-wide mb-2 text-[#f9bd5b]">
            ✦ Discover • Select • Celebrate ✦
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the timeless beauty of traditional craftsmanship through our carefully curated collection
          </p>
        </div>

        {/* Steps Container with Light Design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl border-2 hover:-translate-y-2"
              style={{
                borderColor: "rgba(157, 48, 137, 0.2)",
                boxShadow: "0 4px 20px rgba(120, 120, 120, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#cba146"
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(157, 48, 137, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(157, 48, 137, 0.2)"
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(120, 120, 120, 0.3)"
              }}
            >
              {/* Step number with traditional styling */}
              <div className="absolute -top-4 left-8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                  style={{
                    background: "#f9bd5b",
                  }}
                >
                  {index + 1}
                </div>
              </div>

              {/* Traditional icon container */}
              <div className="flex justify-center mb-6">
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center border-3 group-hover:scale-110 transition-all duration-300 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, rgba(120, 120, 120, 0.3), rgba(161, 60, 120, 0.05))",
                    borderColor: "rgba(157, 48, 137, 0.3)",
                  }}
                >
                  {step.icon}

                  {/* Traditional corner decorations */}
                  <div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full opacity-70"
                    style={{ background: "#000" }}
                  />
                  <div
                    className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full opacity-70"
                    style={{ background: "#787878" }}
                  />
                </div>
              </div>

              {/* Step content */}
              <h3 className="font-bold text-2xl mb-4 transition-colors" style={{ color: "#f9bd5b" }}>
                {step.title}
              </h3>

              <p className="text-gray-600 text-base leading-relaxed mb-6">{step.description}</p>

              {/* Traditional bottom accent */}
              {/* <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{
                        background: i === 2 ? "#cba146" : "rgba(157, 48, 137, 0.3)",
                      }}
                    />
                  ))}
                </div>
              </div> */}

              {/* Connecting arrow for desktop */}
              {/* {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: "white",
                      border: "2px solid #cba146",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#cba146" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )} */}
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div
            className="text-center px-8 py-4 rounded-full border-2 bg-white shadow-lg"
            style={{
              borderColor: "rgba(157, 48, 137, 0.3)",
              color: "#cba146",
            }}
          >
            <p className="text-sm font-semibold">✨ Crafted with Love • Delivered with Care • Worn with Pride ✨</p>
          </div>
        </div>
      </div>

      {/* Ornamental bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div
          className="h-full w-full bg-[#f9bd5b]"
         
        />
      </div>
    </section>
  )
}

export default HowItWorks
