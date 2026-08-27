"use client";

export default function ElevatedSection() {
  return (
    <section className="relative w-full bg-[#cac7c7] py-24">
      {/* Light background panel */}
      <div className="absolute left-0 top-32 w-full h-[70%] bg-[#eeeeee] -z-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center px-6">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl font-bold leading-snug mb-6">
            Tailored to Perfection.
            <br /> Designed for Distinction.
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-md">
            Rooted in classic tailoring and refined for the modern gentleman, our signature fit delivers a sharp silhouette, structured comfort, and timeless elegance. Each piece is crafted to ensure confidence, whether for business, celebrations, or formal evenings.
          </p>
        </div>

        {/* CENTER IMAGE (UPLIFTED) */}
        <div className="relative flex justify-center">
          <img
            src="/home/coat-img.png"
            alt="Formal Blazer"
            className="w-[280px] lg:w-[340px] drop-shadow-2xl -mt-32"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Structured Shoulder Design</h3>

          <p className="text-gray-600 leading-relaxed max-w-md">
            Our expertly shaped shoulders create a powerful yet natural profile, enhancing posture and delivering a commanding presence. The refined structure ensures a balanced fit that complements every formal ensemble.
          </p>
        </div>
      </div>
    </section>
  );
}
