import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";
// import { productService } from "../api/client";
import { productService } from '../api';
import { ShoppingCart, Menu, X, Heart, Leaf, Users, Globe, Truck, Star, ArrowRight } from 'lucide-react';

import { Link } from "react-router-dom";
import EmailSubscriptionBanner from "../components/promotional/popUpBanner.tsx";
import heroImage from "../assets/heroImage.jpg";

export function Home() {
  // Fetch products with react-query
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
    refetchOnWindowFocus: true,
  });

  const testimonials = [
    {
      text: "The quality and craftsmanship of these curtains exceeded my expectations. They've completely transformed my living room.",
      author: "Sarah Mitchell",
      rating: 5
    },
    {
      text: "The custom sizing service was perfect. The curtains fit beautifully, and the fabric quality is exceptional.",
      author: "James Wilson",
      rating: 5
    },
    {
      text: "Elegant, timeless, and exactly what I was looking for. The attention to detail is remarkable.",
      author: "Emma Thompson",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Handcrafted & Sustainable",
      description: "Each piece is carefully crafted using sustainable materials"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Made by Skilled Artisans",
      description: "Created by experienced craftspeople with decades of expertise"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Eco-Friendly Fabrics",
      description: "Using natural, environmentally conscious materials"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Worldwide Shipping",
      description: "Delivering our artisanal curtains across the globe"
    }
  ];


  // Display limited products on homepage
  const featuredProducts = products.slice(0, 3); // Show first 6 products

  return (
    <>
      <EmailSubscriptionBanner />

      <div className="space-y-20">
        {/* Hero Section */}
        <div>
        <div className="relative h-[90vh]">
        <div 
  className="absolute inset-0 bg-cover bg-center" 
  style={{ backgroundImage: `url(${heroImage})` }}
>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl">
                <h2 className="text-6xl font-serif text-white mb-6 leading-tight">Handcrafted Elegance for Every Home</h2>
                <p className="text-xl text-white/90 mb-8 font-light">Transform your space with our bespoke curtains, where artistry meets sophistication</p>
                <button className="bg-white text-orange px-10 py-4 rounded-full hover:bg-orange hover:text-white transition-colors duration-300 uppercase tracking-wider text-sm">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

          <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-4">Premium Designs</h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Explore our exclusive collection of finely crafted designs, blending artistry and sophistication.
        </p>

        {isLoading ? (
          <div className="text-center py-12">
            <i className="pi pi-spinner pi-spin text-2xl text-primary" />
            <p className="mt-4 text-gray-600">Loading premium designs...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-500">
            <i className="pi pi-exclamation-triangle text-2xl" />
            <p className="mt-2">Error loading products: {error?.message}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                <div className="relative overflow-hidden">
                  <div className="aspect-[3/4]">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Link to={`/products/${product._id}`}>
                    <button className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-orange px-8 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm tracking-wider">
                      View Product
                    </button>
                  </Link>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">Rs.{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>

            {/* Why Choose Us */}
            {/* <section className="py-24 bg-beige/30" style={{ backgroundColor: "#D87C46" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center mb-4">Why Choose Us</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">Our commitment to quality and sustainability sets us apart</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/10 text-sage mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
 <section className="py-24 bg-[#D87C46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center mb-4 text-white">
          Why Choose Us
        </h2>
        <p className="text-white/80 text-center mb-16 max-w-2xl mx-auto">
          Our commitment to quality and sustainability sets us apart.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
        {/* Testimonials */}
        <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">Read about experiences from our valued customers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-sage fill-sage" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <p className="font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


           {/* Newsletter */}
      {/* <section className="py-24 bg-red text-white" style={{ backgroundColor: "#D87C46" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-4">Join Our Community</h2>
            <p className="text-white/80 mb-8">Get 10% off your first order and stay updated with our latest collections</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
              />
             
<button className="relative px-8 py-3 rounded-full bg-orange text-white font-medium shadow-lg transition-all duration-300 ease-in-out hover:bg-sage hover:text-orange hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2">
  Subscribe
</button>

            </div>
          </div>
        </div>
      </section> */}
 <section className="py-24 bg-[#D87C46] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-4">Join Our Community</h2>
          <p className="text-white/80 mb-8">
            Get 10% off your first order and stay updated with our latest collections
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
            />
            <button className="relative px-8 py-3 rounded-full bg-[#F2994A] text-white font-medium shadow-lg transition-all duration-300 ease-in-out hover:bg-[#D87C46] hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
     

      </div>
    </>
  );
}