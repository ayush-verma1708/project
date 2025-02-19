import { useQuery } from "@tanstack/react-query";
// import { productService } from "../api/client";
import { productService } from '../api';

import EmailSubscriptionBanner from "../components/promotional/popUpBanner.tsx";
import HeroSection from "../components/HeroSection/HeroSection.tsx";
import { useNavigate } from "react-router-dom"; // Use for React Router
import JoinCommunitySection from "../components/promotional/JoinCommunitySection.tsx";
import  WhyUs  from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQ/FAQSmall.tsx";

export default function Home() {
  // Fetch products with react-query
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
    refetchOnWindowFocus: true,
  });



  // Display limited products on homepage
  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : products.data.slice(0, 4); // Show first 6 products
  const navigate = useNavigate(); // Remove if using Next.js
  return (
    <>
      <EmailSubscriptionBanner />
      
     
      <div className="">


        {/* Hero Section */}
        <section>
        <HeroSection />
        </section>

        {/* Product Section */}
        <section className="py-12 bg-[#f2f2f2]">
          <div className="container mx-auto px-6">
            {/* Section Heading */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 tracking-wide">
                Premium Designs
              </h2>
              <p className="text-gray-600 mt-2">
                Explore our exclusive collection of finely crafted designs, blending artistry and sophistication.
              </p>
            </div>

            {/* Loading & Error Handling */}
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <span className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-orange-500 rounded-full"></span>
              </div>
            ) : isError ? (
              <div className="text-center text-red-500 font-medium">
                Error loading products: {error?.message}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(
              
                         `/category/${product.productType?.name}/${product.name}
                      
                      `)} // Click to navigate
                    className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    {/* Product Image */}
                    <div className="bg-[#f2f2f2] p-6 flex justify-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-48 object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 mt-1">Rs. {product.price}</p>

                      {/* CTA Button */}
                      <button
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent tile click from firing
                          navigate(`/products/${product._id}`);
                        }}
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      

{/* Why Us */}
<section>
<WhyUs />
</section>

<section>
<FAQSection/>
</section>

{/* Testimonials */}
<section>
<Testimonials />
</section>


        <section>
          <JoinCommunitySection />
        </section>

     

      </div>
    </>
  );
}