"use client"
import { useEffect, useState } from "react"
import { Sliders, X, ChevronDown, ChevronUp } from "lucide-react"
import ProductCard from "../components/products/ProductCard"
import { useSearchParams, Link } from "react-router-dom"


// interface Product {
//     _id: string
//     actualPrice: number
//     createdAt: string
//     size?: string
//     name?: string
// }

interface Product {
    _id: string
    actualPrice: number
    createdAt: string
    name?: string
    size?: {
        sizes: string
        price: number
    }[]
}


interface Category {
    _id: string
    name: string
    subcategory?: string
}

type GroupedCategory = {
    [key: string]: Category[]
}


export default function SearchPage() {
    const initialMinPrice = 100
    const initialMaxPrice = 5000
    const [queryParams] = useSearchParams()
    const searchTerm = queryParams.get("query") || ""

    const catagory1 = searchTerm?.replace(/-/g, " ");
    // const [products, setProducts] = useState<any[]>([])
    const [products, setProducts] = useState<Product[]>([])

    // const [filteredProducts, setFilteredProducts] = useState<any[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [sortBy, setSortBy] = useState("newest")
    const [showFilters, setShowFilters] = useState(false)
    // const [openSections, setOpenSections] = useState({
    //     price: true,
    //     sizes: true,
    // })

    const [openSections, setOpenSections] = useState<{
        price: boolean
        sizes: boolean
        categories: boolean
    }>({
        price: true,
        sizes: true,
        categories: false,
    })


    const [sizeOptions, setSizeOptions] = useState<string[]>([])


    // const [categories, setCategories] = useState<any[]>([]);
    const [categories, setCategories] = useState<Category[]>([])

    // const [groupedCategories, setGroupedCategories] = useState<any>({});
    const [groupedCategories, setGroupedCategories] = useState<GroupedCategory>({})

    const [moreMenuOpen, setMoreMenuOpen] = useState(false);
    // const moreMenuRef = useRef<HTMLDivElement>(null);
    const [specialFilters, setSpecialFilters] = useState({
        isPopular: false,
        isTrending: false,
        isFeatured: false,
        isNewArrival: false,
    })
    const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    // const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    // Initialize products
    // Dependency array mein specialFilters add karein
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams({
                    referenceWebsite,
                    ...(catagory1 && { category: catagory1 }),
                    minPrice: priceRange[0].toString(),
                    maxPrice: priceRange[1].toString(),
                    sortBy: sortBy === "price-low" || sortBy === "price-high" ? "actualPrice" : "createdAt",
                    sortOrder: sortBy === "oldest" || sortBy === "price-low" ? "asc" : "desc",
                    page: "1",
                    limit: "100",
                    // In values ko dynamic bhejna zaroori hai
                    ...(specialFilters.isPopular && { isPopular: "true" }),
                    ...(specialFilters.isTrending && { isTrending: "true" }),
                    ...(specialFilters.isFeatured && { isFeatured: "true" }),
                    ...(specialFilters.isNewArrival && { isNewArrival: "true" }),
                });

                // Yahan dhyan dein: query string mein params.toString() use karein
                const res = await fetch(`${baseUrl}/product/search?query=${searchTerm}&${params.toString()}`);
                const data = await res.json();

                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                    const allSizes = new Set<string>()
                    data.products.forEach((p: Product) => {
                        p.size?.forEach(s => allSizes.add(s.sizes.toUpperCase()))
                    })
                    setSizeOptions(Array.from(allSizes))

                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
        // Dependency array update kiya gaya hai
    }, [baseUrl, referenceWebsite, catagory1, priceRange, sortBy, specialFilters, searchTerm]);


    useEffect(() => {
        const filtered = products.filter((product) => {
            const priceMatch = product.actualPrice >= priceRange[0] && product.actualPrice <= priceRange[1]
            if (selectedSizes.length === 0) return priceMatch

            // if (!product.size) return false
            // return priceMatch && selectedSizes.includes(product.size.toUpperCase())

            if (!product.size || product.size.length === 0) return false

            const productSizes = product.size.map(s => s.sizes.toUpperCase())
            const sizeMatch = selectedSizes.some(size => productSizes.includes(size))

            return priceMatch && sizeMatch


        })

        const sorted = filtered.sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.actualPrice - b.actualPrice
                case "price-high":
                    return b.actualPrice - a.actualPrice
                case "oldest":
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
        })

        setFilteredProducts(sorted)
    }, [products, priceRange, sortBy, selectedSizes])

    // const handleSizeChange = (size: string) => {
    //     setSelectedSizes(prev =>
    //         prev.includes(size)
    //             ? prev.filter(s => s !== size)
    //             : [...prev, size]
    //     )
    // }

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
    }

    const resetFilters = () => {
        setPriceRange([initialMinPrice, initialMaxPrice])
        setSelectedSizes([])
        setSortBy("newest")
        setSpecialFilters({
            isPopular: false,
            isTrending: false,
            isFeatured: false,
            isNewArrival: false,
        })
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
                const data = await res.json();
                const cats = data?.website?.categories || [];
                setCategories(cats);

                // Data ko group karein subcategory ke hisaab se
                // const grouped = cats.reduce((acc: any, item: any) => {
                // const sub = item?.subcategory || "Others";
                // if (!acc[sub]) acc[sub] = [];
                // acc[sub].push(item);
                // return acc;
                // }, {});
                // setGroupedCategories(grouped);

                const grouped = cats.reduce((acc: GroupedCategory, item: Category) => {
                    const sub = item?.subcategory || "Others"
                    if (!acc[sub]) acc[sub] = []
                    acc[sub].push(item)
                    return acc
                }, {})
                setGroupedCategories(grouped)

            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, [baseUrl, referenceWebsite]);

    // console.log("filter", filteredProducts)

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold capitalize mb-4" style={{ color: "#1B2E4F" }}>
                        {searchTerm || "All Products"}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Found{" "}
                        <span className="font-semibold" style={{ color: "#cba146" }}>
                            {filteredProducts.length}
                        </span>{" "}
                        results for your search
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cba146] focus:border-[#cba146] bg-white"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* <button
              onClick={resetFilters}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-medium px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-white"
            >
              <X className="h-4 w-4" />
              <span>Reset</span>
            </button> */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                            style={{ background: "#cba146" }}
                        >
                            <Sliders className="h-4 w-4" />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div
                        className={`lg:w-80 space-y-6 sticky h-fit top-24 ${showFilters
                            ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto"
                            : "hidden lg:block bg-white rounded-xl  shadow-sm p-6 border border-gray-100"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold" style={{ color: "#1B2E4F" }}>
                                Filters
                            </h2>
                            <button onClick={() => setShowFilters(false)} className="lg:hidden text-gray-500 hover:text-gray-700 p-1">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="border-b border-gray-200 pb-6">
                            <div
                                className="flex justify-between items-center cursor-pointer mb-4"
                                // onClick={() => toggleSection("categories" as any)}
                                onClick={() => toggleSection("categories")}

                            >
                                <h3 className="font-semibold text-gray-800">Browse Categories</h3>
                                {openSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </div>

                            {openSections.categories && (
                                <div className="space-y-4">
                                    {Object.entries(groupedCategories).map(([subcategory, items]) => (
                                        <div key={subcategory} className="space-y-2">
                                            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                {subcategory}
                                            </h4>
                                            <div className="flex flex-col space-y-1 ml-2">
                                                {(items as Category[]).map((item) => (
                                                    <Link
                                                        key={item._id}
                                                        to={`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className={`text-sm py-1 transition-colors ${catagory1 === item.name.toLowerCase()
                                                            ? "text-[#cba146] font-bold"
                                                            : "text-gray-600 hover:text-[#cba146]"
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}


                                    {/* More Categories Button (Agar 6 se zyada hain) */}
                                    {categories.length > 6 && (
                                        <button
                                            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                                            className="text-xs font-bold text-[#cba146] underline mt-2"
                                        >
                                            {moreMenuOpen ? "Show Less" : "View More Collections"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* Price Range */}
                        <div className="border-b border-gray-200 pb-6">
                            <div
                                className="flex justify-between items-center cursor-pointer mb-4"
                                onClick={() => toggleSection("price")}
                            >
                                <h3 className="font-semibold text-gray-800">Price Range</h3>
                                {openSections.price ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                            </div>
                            {openSections.price && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-700">₹{priceRange[0].toLocaleString()}</span>
                                        <span className="text-xs text-gray-500">to</span>
                                        <span className="text-sm font-medium text-gray-700">₹{priceRange[1].toLocaleString()}</span>
                                    </div>

                                    <div className="relative pt-2">
                                        <div className="relative h-1 bg-gray-200 rounded-full">
                                            <div
                                                className="absolute h-1 rounded-full"
                                                style={{
                                                    background: "#cba146",
                                                    left: `${(priceRange[0] / initialMaxPrice) * 100}%`,
                                                    width: `${((priceRange[1] - priceRange[0]) / initialMaxPrice) * 100}%`,
                                                }}
                                            />
                                        </div>
                                        <input
                                            type="range"
                                            min={initialMinPrice}
                                            max={initialMaxPrice}
                                            value={priceRange[0]}
                                            readOnly
                                            onChange={(e) => {
                                                const value = Math.min(Number(e.target.value), priceRange[1] - 1)
                                                setPriceRange([value, priceRange[1]])
                                            }}
                                            className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider"
                                        />
                                        <input
                                            type="range"
                                            min={initialMinPrice}
                                            max={initialMaxPrice}
                                            value={priceRange[1]}
                                            readOnly
                                            onChange={(e) => {
                                                const value = Math.max(Number(e.target.value), priceRange[0] + 1)
                                                setPriceRange([priceRange[0], value])
                                            }}
                                            className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div>
                                            <label className="text-xs text-gray-600 block mb-1">Min Price</label>
                                            <input
                                                type="number"
                                                min={initialMinPrice}
                                                max={initialMaxPrice}
                                                value={priceRange[0]}
                                                readOnly
                                                onChange={(e) => {
                                                    const value = Number(e.target.value) || 0
                                                    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]])
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cba146] focus:border-[#cba146] text-sm"
                                                placeholder="Min"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-600 block mb-1">Max Price</label>
                                            <input
                                                type="number"
                                                min={initialMinPrice}
                                                max={initialMaxPrice}
                                                value={priceRange[1]}
                                                readOnly
                                                onChange={(e) => {
                                                    const value = Number(e.target.value) || initialMaxPrice
                                                    if (value >= priceRange[0]) setPriceRange([priceRange[0], value])
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cba146] focus:border-[#cba146] text-sm"
                                                placeholder="Max"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Collection Filters */}
                        <div className="border-b border-gray-200 py-6">
                            <h3 className="font-semibold text-gray-800 mb-4">Collections</h3>
                            <div className="space-y-3">
                                {[
                                    { id: 'isPopular', label: 'Popular' },
                                    { id: 'isTrending', label: 'Trending' },
                                    { id: 'isFeatured', label: 'Featured' },
                                    { id: 'isNewArrival', label: 'New Arrivals' }
                                ].map((filter) => (
                                    <label key={filter.id} className="flex items-center space-x-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={specialFilters[filter.id as keyof typeof specialFilters]}
                                            onChange={() => setSpecialFilters(prev => ({
                                                ...prev,
                                                [filter.id]: !prev[filter.id as keyof typeof specialFilters]
                                            }))}
                                            className="w-4 h-4 rounded border-gray-300 text-[#cba146] focus:ring-[#cba146] cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                                            {filter.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        {/* Size Filter */}
                        <div className="border-b border-gray-200 py-6">
                            <h3 className="font-semibold text-gray-800 mb-4">Size</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {sizeOptions.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() =>
                                            setSelectedSizes(prev =>
                                                prev.includes(size)
                                                    ? prev.filter(s => s !== size)
                                                    : [...prev, size]
                                            )
                                        }
                                        className={`border rounded-md py-2 text-sm font-medium transition ${selectedSizes.includes(size)
                                               ? "bg-[#cba146] text-white border-[#cba146]"
                        : "bg-gray-100 text-gray-700 border-gray-100 hover:border-[#000000] hover:bg-[#000000] hover:text-gray-100"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>



                        {/* <div className="space-y-3">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedSizes.includes(size)
                        ? "border-[#cba146] bg-[#cba146]"
                        : "border-gray-300 group-hover:border-purple-400"
                    }`}
                  >
                    {selectedSizes.includes(size) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{size}</span>
              </label>
            ))}
          </div> */}


                        <button
                            onClick={resetFilters}
                            className="w-full py-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Reset All Filters
                        </button>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-gray-50 rounded-xl p-12 text-center">
                                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                                    <Sliders className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    Try adjusting your filters or explore other categories to find your perfect piece.
                                </p>
                                {/* <button
                  onClick={resetFilters}
                  className="px-6 py-3 text-white rounded-lg font-medium transition-colors hover:shadow-lg"
                  style={{ background: "#cba146" }}
                >
                  Reset All Filters
                </button> */}
                            </div>
                        ) : (
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom CSS for range sliders */}
            <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #cba146;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 2;
        }

        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #cba146;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .range-slider::-webkit-slider-track {
          background: transparent;
        }

        .range-slider::-moz-range-track {
          background: transparent;
        }
      `}</style>
        </div>
    )
}