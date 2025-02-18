import { useQuery } from "@tanstack/react-query";
// import { productService } from "../api/client";
import { productService } from '../api';
import {  Leaf, Users, Globe, Truck, Star } from 'lucide-react';

import EmailSubscriptionBanner from "../components/promotional/popUpBanner.tsx";
import HeroSection from "../components/HeroSection/HeroSection.tsx";
import { useNavigate } from "react-router-dom"; // Use for React Router
import JoinCommunitySection from "../components/promotional/JoinCommunitySection.tsx";

export default function Home() {

  // Fetch products with react-query
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(),
    refetchOnWindowFocus: true,
  });

  const testimonials = [
    {
      text: "Mobiiwrap’s skins are a game changer! My phone looks sleek and stylish with the custom designs, and the quality is top-notch. Highly recommend!",
      author: "Ayush Verma",
      rating: 5
    },
    {
      text: "I’m amazed at the precision of the wrap. It fits perfectly and the material feels luxurious. The design options are fantastic too!",
      author: "Ansh Saxena",
      rating: 5
    },
    {
      text: "Great experience! The wrap was easy to apply, and it made my phone look unique and personalized. Absolutely love the premium feel.",
      author: "Ritvik Rana",
      rating: 5
    }
  ];
  

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Premium Quality Materials",
      description: "Our skins are made from high-quality materials for a perfect fit and luxurious finish."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Variety of Beautiful Designs",
      description: "Choose from a wide selection of stunning designs that complement your phone's style and elevate its look."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Easy to Apply & Remove",
      description: "Our wraps are designed for a seamless application and effortless removal, leaving no residue or damage behind."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Pan India Shipping",
      description: "We offer fast, reliable shipping Pan India, delivering our premium mobile skins wherever you are."
    }
  ];
  
  

  // Display limited products on homepage
  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : products.data.slice(0, 4); // Show first 6 products
  const navigate = useNavigate(); // Remove if using Next.js
  return (
    <>
      <EmailSubscriptionBanner />

      <div className="">

        {/* Hero Section */}
 <HeroSection />

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
             onClick={() => navigate(`/products/${product._id}`)} // Click to navigate
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

     {/* Why US */}
      <section className="py-24 bg-[#E8E6E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-4 text-[#333333]">
          Why Choose Us
        </h2>
        <p className="text-[#333333]/80 text-center mb-16 max-w-2xl mx-auto">
          Our commitment to quality and sustainability sets us apart.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#f2f2f2] to-[#d6d6d6] shadow-lg text-[#333333] mb-6 transition-transform transform group-hover:scale-105">
            {feature.icon}
          </div>
              <h3 className="font-serif text-xl mb-3 text-[#333333]">
                {feature.title}
              </h3>
              <p className="text-[#333333]/80 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      </section>
       
        {/* Testimonials */}
    
<section className="py-24 bg-[#F8F8F8]">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    {/* Section Title */}
    <h2 className="text-4xl font-serif text-center mb-4 text-[#333333] tracking-wide">
      What Our Clients Say
    </h2>
    <p className="text-[#777777] text-center mb-16 max-w-2xl mx-auto text-lg">
      Read about experiences from our valued customers.
    </p>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Star Ratings */}
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-orange-400 fill-orange-400" />
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-[#333333] text-lg leading-relaxed mb-6">
            “{testimonial.text}”
          </p>

          {/* Author Name */}
          <p className="font-semibold text-[#555555] text-md">{testimonial.author}</p>
        </div>
      ))}
    </div>
  </div>
</section>


{/* <section className="py-24 bg-[#E8E6E3] text-[#333333]">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-serif font-semibold mb-4 text-[#333333] tracking-wide">
        Join Our Community
      </h2>
      <p className="text-[#333333]/80 mb-8 text-lg leading-relaxed">
        Get 10% off your first order and stay updated with our latest collections.
      </p>

      <div className="flex gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-[#D1D1D1] text-[#333333] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#F2994A] transition-all duration-300 ease-in-out"
        />
        <button className="relative px-8 py-4 rounded-full bg-[#F2994A] text-white font-medium shadow-lg transition-all duration-300 ease-in-out hover:bg-[#D87C46] hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F2994A] focus:ring-offset-2">
          Subscribe
        </button>
      </div>
    </div>
  </div>
</section> */}

<section>
  <JoinCommunitySection/>
</section>

     

      </div>
    </>
  );
}