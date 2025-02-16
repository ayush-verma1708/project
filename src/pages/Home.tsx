import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";
// import { productService } from "../api/client";
import { productService } from '../api';
import { ShoppingCart, Menu, X, Heart, Leaf, Users, Globe, Truck, Star, ArrowRight } from 'lucide-react';

import { Link } from "react-router-dom";
import EmailSubscriptionBanner from "../components/promotional/popUpBanner.tsx";

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
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl">
                <h2 className="text-6xl font-serif text-white mb-6 leading-tight">Handcrafted Elegance for Every Home</h2>
                <p className="text-xl text-white/90 mb-8 font-light">Transform your space with our bespoke curtains, where artistry meets sophistication</p>
                <button className="bg-white text-olive px-10 py-4 rounded-full hover:bg-olive hover:text-white transition-colors duration-300 uppercase tracking-wider text-sm">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Featured Products */}
        {/* <section className="container mx-auto px-4">
         

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <motion.div 
                  key={product._id}
                  className="group relative bg-white shadow-lg rounded-xl overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/products/${product._id}`} className="block">
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 border-t border-gray-100">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          Rs.{product.price}
                        </span>
                        <Button 
                          icon="pi pi-shopping-cart" 
                          className="p-button-rounded p-button-text"
                          tooltip="Add to cart"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section> */}
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
                    <button className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-olive px-8 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm tracking-wider">
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
            <section className="py-24 bg-beige/30">
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


        {/* CTA Section */}
        {/* <section className="bg-primary text-black py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Device?
            </h2>
            <p className="text-xl mb-8">Explore our full collection of premium skins</p>
            <Button 
              label="View All Products"
              className="p-button-lg p-button-outlined p-button-secondary"
              icon="pi pi-arrow-right"
              onClick={() => window.location.href = '/products'}
            />
          </div>
        </section> */}
           {/* Newsletter */}
      <section className="py-24 bg-red text-white" style={{ backgroundColor: "#6a7662" }}>
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
              <button className="bg-white text-olive px-8 py-3 rounded-full hover:bg-sage hover:text-white transition-colors duration-300">
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
// import { motion } from "framer-motion";
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
// import { DataView } from "primereact/dataview";
// import { Panel } from "primereact/panel";
// import { Carousel } from "primereact/carousel";
// import { InputText } from "primereact/inputtext";
// import { products } from "../sample/SampleProd.tsx";
// import { Link } from "react-router-dom";
// import EmailSubscriptionBanner from "../components/promotional/popUpBanner.tsx";

// export function Home() {
//   return (
//     <>
//       {/* Email Subscription Popup */}
//       <EmailSubscriptionBanner />

//       <div className="space-y-20">
//         {/* Hero Section */}
//         <motion.section
//           className="relative h-[80vh] flex items-center justify-center text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="absolute inset-0">
//           <img
//   src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80"
//   alt="Hero background"
//   className="absolute inset-0 w-full h-full object-cover"
// />

//           </div>
//           <div className="relative text-center">
//             <motion.h1 className="text-5xl font-bold mb-4">
//               Transform Your Device
//             </motion.h1>
//             <motion.p className="text-lg mb-6">
//               Premium mobile skins to personalize and protect your phone in
//               style.
//             </motion.p>
//             <Button
//               label="Shop Now"
//               icon="pi pi-arrow-right"
//               className="p-button-rounded p-button-lg"
//             />
//           </div>
//         </motion.section>

//         {/* Benefits Section */}
//         <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
//           {[
//             { title: "Free Shipping", icon: "pi pi-truck", text: "On all orders over $50" },
//             { title: "Easy Returns", icon: "pi pi-refresh", text: "30-day money-back guarantee" },
//             { title: "Premium Quality", icon: "pi pi-shield", text: "Durable materials that last" },
//           ].map((benefit, index) => (
//             <Panel key={index} header={benefit.title}>
//               <div className="flex items-center gap-2">
//                 <i className={`pi ${benefit.icon} text-xl`} />
//                 <span>{benefit.text}</span>
//               </div>
//             </Panel>
//           ))}
//         </section>

//         {/* Featured Products */}
//         <section className="max-w-7xl mx-auto px-4">
//           <motion.h2 className="text-3xl font-bold text-center mb-8">
//             Featured Products
//           </motion.h2>

//           <DataView value={products} layout="grid" itemTemplate={(product) => (
//             <Link to={`/products/${product.id}`} key={product.id} className="block">
//               <Card title={product.name} subTitle={`$${product.price}`} className="shadow-md">
//                 <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-md" />
//                 <p className="text-gray-600 mt-2">{product.description}</p>
//                 <Button label="Add to Cart" icon="pi pi-shopping-cart" className="mt-3" />
//               </Card>
//             </Link>
//           )} />
//         </section>

//         {/* Testimonials */}
//         <section className="bg-gray-50 py-16">
//           <motion.h2 className="text-3xl font-bold text-center mb-6">
//             What Our Customers Are Saying
//           </motion.h2>

//           <Carousel value={[
//             { text: `"These mobile skins are amazing! My phone looks brand new!"`, name: "John Doe" },
//             { text: `"Super fast shipping and the perfect fit!"`, name: "Jane Smith" },
//           ]}
//             itemTemplate={(review) => (
//               <div className="text-center p-6 bg-white shadow-lg rounded-lg">
//                 <p className="text-gray-600 italic">"{review.text}"</p>
//                 <span className="font-semibold block mt-4">{review.name}</span>
//                 <p className="text-gray-400 text-sm">Verified Buyer</p>
//               </div>
//             )}
//             circular
//             autoplayInterval={3000}
//           />
//         </section>

//         {/* Newsletter Section */}
//         <section className="bg-black text-white py-12 text-center">
//           <motion.h3 className="text-2xl font-semibold mb-4">
//             Stay Updated with Our Latest Products & Offers
//           </motion.h3>
//           <motion.div className="flex justify-center gap-2">
//             <InputText placeholder="Enter your email" className="p-inputtext-lg" />
//             <Button label="Subscribe" className="p-button-lg p-button-rounded" />
//           </motion.div>
//         </section>
//       </div>
//     </>
//   );
// }

// // import { motion } from 'framer-motion';
// // import { ArrowRight, Truck, RefreshCw, Shield } from 'lucide-react';
// // import { products } from '../sample/SampleProd.tsx'; // Make sure the path is correct
// // import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// // import { ShoppingCart } from 'lucide-react'; // If you want to add a cart button in the grid as well
// // import EmailSubscriptionBanner from '../components/promotional/popUpBanner.tsx'; // Import the banner component

// // const fadeInUp = {
// //   initial: { opacity: 0, y: 20 },
// //   animate: { opacity: 1, y: 0 },
// //   transition: { duration: 0.5 }
// // };

// // export function Home() {
// //   return ( 
// //     <>
// //     {/* Email Subscription Popup */}
// //   <EmailSubscriptionBanner />
// //     <div className="space-y-20">


// //       {/* Hero Section */}
// //       <motion.section 
// //         className="relative h-[80vh] bg-gradient-to-r from-black-500 to-purple-600 flex items-center"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.8 }}
// //       >
// //         <div className="absolute inset-0">
// //           <img 
// //             src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80"
// //             alt="Hero background" 
// //             className="w-full h-full object-cover mix-blend-overlay"
// //           />
// //         </div>
// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
// //           <motion.h1 
// //             className="text-5xl md:text-7xl font-bold mb-6"
// //             {...fadeInUp}
// //           >
// //             Transform Your Device
// //           </motion.h1>
// //           <motion.p 
// //             className="text-xl mb-8 max-w-2xl"
// //             {...fadeInUp}
// //             transition={{ delay: 0.2 }}
// //           >
// //             Premium mobile skins that protect and personalize your device with style.
// //           </motion.p>
// //           <motion.button
// //             className="bg-white text-black-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-colors"
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             Shop Now <ArrowRight size={20} />
// //           </motion.button>
// //         </div>
// //       </motion.section>
       
// //       {/* Benefits Section */}
// //       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
// //         <motion.div 
// //           className="grid md:grid-cols-3 gap-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ staggerChildren: 0.2 }}
// //         >
// //           <motion.div 
// //             className="text-center p-6"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <Truck className="w-12 h-12 mx-auto mb-4 text-black-600" />
// //             <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
// //             <p className="text-gray-600">On all orders over $50</p>
// //           </motion.div>
// //           <motion.div 
// //             className="text-center p-6"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <RefreshCw className="w-12 h-12 mx-auto mb-4 text-black-600" />
// //             <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
// //             <p className="text-gray-600">30-day money back guarantee</p>
// //           </motion.div>
// //           <motion.div 
// //             className="text-center p-6"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <Shield className="w-12 h-12 mx-auto mb-4 text-black-600" />
// //             <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
// //             <p className="text-gray-600">Durable materials that last</p>
// //           </motion.div>
// //         </motion.div>
// //       </section>

// //       {/* Featured Products */}
// //       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
// //   <motion.h2
// //     className="text-3xl font-bold text-center mb-12"
// //     initial={{ opacity: 0, y: 20 }}
// //     whileInView={{ opacity: 1, y: 0 }}
// //     viewport={{ once: true }}
// //   >
// //     Featured Products
// //   </motion.h2>

// //   <motion.div
// //     className="grid md:grid-cols-3 gap-8"
// //     initial={{ opacity: 0 }}
// //     whileInView={{ opacity: 1 }}
// //     viewport={{ once: true }}
// //     transition={{ staggerChildren: 0.2 }}
// //   >
// //     {/* Mapping over products */}
// //     {products.map((product) => (
// //       <Link to={`/products/${product.id}`} key={product.id} className="block">
// //         <motion.div
// //           className="bg-white rounded-lg shadow-lg overflow-hidden"
// //           whileHover={{ y: -8 }}
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //         >
// //           <div className="relative pb-[100%]">
// //             <img
// //               src={product.images[0]} // Displaying the first image for each product
// //               alt={product.name}
// //               className="absolute inset-0 w-full h-full object-cover"
// //             />
// //             <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
// //           </div>
// //           <div className="p-6">
// //             <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
// //             <p className="text-gray-600 text-sm mb-4">{product.description}</p>
// //             <div className="flex justify-between items-center">
// //               <span className="text-xl font-bold text-black-600">${product.price}</span>
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="px-4 py-2 bg-black-600 text-white rounded-md hover:bg-black-700 transition-colors flex items-center gap-2"
// //                 // Add functionality for adding to the cart if needed here
// //               >
// //                 <ShoppingCart size={16} />
// //                 Add to Cart
// //               </motion.button>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </Link>
// //     ))}
// //   </motion.div>
// // </section>
// //  {/* Testimonials Section */}
// //  <section className="bg-gray-50 py-20">
// //         <motion.h2
// //           className="text-3xl font-bold text-center mb-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //         >
// //           What Our Customers Are Saying
// //         </motion.h2>

// //         <div className="max-w-3xl mx-auto">
// //           <motion.div
// //             className="flex space-x-8 justify-center"
// //             whileInView={{ opacity: 1 }}
// //             initial={{ opacity: 0 }}
// //             transition={{ delay: 0.3 }}
// //           >
// //             {/* Testimonial Card */}
// //             <div className="bg-white p-8 rounded-xl shadow-xl">
// //               <p className="text-gray-600 mb-4">"These mobile skins are game-changers! My device looks amazing, and the quality is top-notch!"</p>
// //               <span className="font-semibold">John Doe</span>
// //               <p className="text-gray-400">Verified Buyer</p>
// //             </div>
// //             <div className="bg-white p-8 rounded-xl shadow-xl">
// //               <p className="text-gray-600 mb-4">"The shipping was fast, and the skin fit my phone perfectly. Highly recommend!"</p>
// //               <span className="font-semibold">Jane Smith</span>
// //               <p className="text-gray-400">Verified Buyer</p>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>
// //   {/* Newsletter Section */}
// //   <section className="bg-black-600 py-12 text-white text-center">
// //         <motion.h3
// //           className="text-2xl font-semibold mb-4"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //         >
// //           Stay Updated with Our Latest Products & Offers
// //         </motion.h3>
// //         <motion.div
// //           className="flex justify-center"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //         >
// //           <input
// //             type="email"
// //             placeholder="Enter your email"
// //             className="px-6 py-3 rounded-l-full text-black"
// //           />
// //           <button className="bg-black-700 px-6 py-3 rounded-r-full">Subscribe</button>
// //         </motion.div>
// //       </section>
      
// //     </div>
// //     </>
// //   );
// // }