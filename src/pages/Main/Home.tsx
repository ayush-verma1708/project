import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { productService } from "../../api/index.ts";
import TrendingProductCard from "../../components/product/TrendingProductCard.tsx";
import CountdownTimer from "../../components/ui/countdown-timer.tsx";
import TrustBadge from "../../components/ui/trust-badge.tsx";
import ProductCard from "../../components/ProductSelection/ProductCard.tsx";
import EmailSubscriptionBanner from "../../components/promotional/popUpBanner.tsx";
import FAQSection from "../../components/FAQ/FAQSmall.tsx";


export default function Home() {
  const { data: newArrivals = { products: [] }, isLoading: isLoadingNewArrivals } = useQuery({
    queryKey: ['newArrivals'],
    queryFn: () => productService.getNewArrivals(),
    refetchOnWindowFocus: false,
  });

  const { data: trendingProducts = { products: [] }, isLoading: isLoadingTrending } = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: () => productService.getTrendingProducts(),
    refetchOnWindowFocus: false,
  });

  const [featuredCollections] = useState([
    { 
      name: "Summer Collection", 
      image: "https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744193202/Mobiiwrap%20pictures/Transparent%20skin/cmrixhrt1ve4yqu7oelv.jpg", 
      link: "/category/mobile-skins" 
    },
    { 
      name: "Premium Selection", 
      image: "https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744193202/Mobiiwrap%20pictures/Transparent%20skin/cqculgftifbvlqoqihev.jpg", 
      link: "/category/mobile-skins" 
    },
    { 
      name: "Limited Editions", 
      image: "https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744193207/Mobiiwrap%20pictures/Transparent%20skin/wd5mjtvxhxn2tnvwvbnt.jpg", 
      link: "/category/mobile-skins" 
    }
  ]);

  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <div className="sticky top-0 z-50">
        {/* <PromoBanner 
          message="Limited Time Offer: Free Shipping on Orders Over ₹1,500 | Use Code: FREESHIP" 
          className="bg-gradient-to-r from-[#ffe4ec] via-[#ffccdd] to-[#ffb3cc] text-[#6b4065] shadow-md"
        /> */}
      </div>
      
      <EmailSubscriptionBanner/>
      {/* <PopupBanner /> */}
      
      <main className="max-w-[1920px] mx-auto">
        {/* Hero Section */}
        <section className="relative h-screen md:h-[90vh]">
          <div className="absolute inset-0 bg-black">
            <img 
              src="https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744241247/heroImage_jzaflq.jpg" 
              alt="Premium lifestyle products" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl text-white">
              <span className="inline-block bg-white text-black px-6 py-2 text-sm tracking-wider mb-8">NEW COLLECTION</span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">ELEVATE YOUR EVERYDAY</h1>
              <p className="text-xl opacity-90 mb-12 tracking-wide">
                Premium quality products crafted for those who appreciate the finer things in life.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/category/mobile-skins" className="group">
                  <span className="block bg-white text-black px-12 py-4 text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300">
                    SHOP NOW
                  </span>
                </Link>
                <Link to="/category/mobile-skins" className="group">
                  <span className="block border border-white px-12 py-4 text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                    EXPLORE
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Badges */}
        <section className="py-20 md:py-24 border-t border-b border-black/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
              <TrustBadge
                icon="truck"
                title="Free Shipping"
                description="On orders over ₹499"
              />
              <TrustBadge
                icon="camera"
                title="Real Product Shots"
                description="No mockups, just real images"
              />
              <TrustBadge
                icon="shield"
                title="Secure Payments"
                description="Multiple payment methods"
              />
              <TrustBadge
                icon="star"
                title="Top Quality"
                description="Premium materials & craftsmanship"
              />
            </div>
          </div>
        </section>
        
        {/* Featured Collections */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">FEATURED COLLECTIONS</h2>
              <p className="text-gray-600 max-w-2xl mx-auto tracking-wide text-sm md:text-base">
                Explore our curated collections designed to complement your lifestyle
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <Link 
                  key={index} 
                  to={collection.link}
                  className="group"
                >
                  <div className="relative overflow-hidden h-[400px] md:h-[600px]">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-light text-white mb-2 tracking-wide">{collection.name}</h3>
                        <span className="inline-block text-white text-sm tracking-wider group-hover:translate-x-2 transition-transform">
                          SHOP NOW →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Flash Sale Section */}
        <section className="py-16 md:py-20 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-center">
                <span className="inline-block bg-white text-black px-6 py-2 text-sm tracking-wider mb-6">FLASH SALE</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                  UP TO 50% OFF
                </h2>
                <p className="text-xl text-gray-400 mb-8 tracking-wide">
                  Don't miss out on these amazing deals. Limited time offer!
                </p>
                
                <div className="mb-8">
                  <p className="text-gray-400 text-sm mb-4 tracking-wide">Hurry, sale ends in:</p>
                  <CountdownTimer hours={23} minutes={59} seconds={59} />
                </div>
                
                <Link to="/category/mobile-skins" className="group">
                  <span className="inline-block bg-white text-black px-12 py-4 text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300">
                    SHOP THE SALE
                  </span>
                </Link>
              </div>
              <div className="hidden md:block relative h-[500px]">
                <img 
                  src="https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744193209/Mobiiwrap%20pictures/Transparent%20skin/h86gb3xpejcfhstvsxjj.jpg" 
                  alt="Flash sale products" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">NEW ARRIVALS</h2>
                <p className="text-gray-600 tracking-wide text-sm md:text-base">The latest additions to our collection</p>
              </div>
              <Link to="/category/mobile-skins" className="group mt-4 md:mt-0">
                <span className="text-black hover:text-gray-600 text-sm tracking-wider transition-colors">
                  VIEW ALL →
                </span>
              </Link>
            </div>
            
            {isLoadingNewArrivals ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-100 h-[300px] md:h-[400px] animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {newArrivals.products.map((product) => (
                  <ProductCard 
                    key={product._id}
                    product={product}
                    onAddToCart={() => navigate(`/product/${product._id}`)}
                    onViewDetails={() => navigate(`/product/${product._id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Trending Products */}
        <section className="py-16 md:py-24 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">TRENDING NOW</h2>
              <p className="text-gray-400 max-w-2xl mx-auto tracking-wide text-sm md:text-base">
                Our most popular products based on sales
              </p>
            </div>
            
            {isLoadingTrending ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white/5 h-[400px] animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {trendingProducts.products.map((product) => (
                  <TrendingProductCard 
                    key={product._id} 
                    product={product} 
                    onAddToCart={() => navigate(`/product/${product._id}`)}
                    onViewDetails={() => navigate(`/product/${product._id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
     
      
        <FAQSection />
        {/* Testimonials */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it - hear from some of our satisfied customers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard 
                rating={5}
                content="Mobiiwrap's skins are a game changer! My phone looks sleek and stylish with the custom designs, and the quality is top-notch. Highly recommend!"
                name="Rahul Sharma"
                location="Mumbai, India"
                // avatar="https://randomuser.me/api/portraits/men/32.jpg"
              />
              <TestimonialCard 
                rating={4.5}
                content="I'm amazed at the precision of the wrap. It fits perfectly and the material feels luxurious. The design options are fantastic too!"
                name="Priya Patel"
                location="Bangalore, India"
                // avatar="https://randomuser.me/api/portraits/women/44.jpg"
              />
              <TestimonialCard 
                rating={5}
                content="Great experience! The wrap was easy to apply, and it made my phone look unique and personalized. Absolutely love the premium feel."
                name="Vikram Singh"
                location="Delhi, India"
                // avatar="https://randomuser.me/api/portraits/men/67.jpg"
              />
            </div>
          </div>
        </section>
         */}
     
      </main>

      <button
        className={`fixed right-6 bottom-20 md:bottom-6 bg-black text-white p-3 shadow-md transition-opacity duration-300 ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {/* <FiveStarReviews /> */}
    </div>
  );
}

// import { useQuery } from "@tanstack/react-query";
// import { productService } from '../api';
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// // Components
// import EmailSubscriptionBanner from "../components/promotional/popUpBanner.tsx";
// import HeroSection from "../components/HeroSection/HeroSection.tsx";
// import Testimonials from "../components/Testimonials";
// import FAQSection from "../components/FAQ/FAQSmall.tsx";
// import FiveStarReviews from "../components/Reviews/FiveStarReviews.tsx";
// import InstagramFeed from "../components/Social/InstagramFeed.tsx";
// import WhyUs from "../components/WhyUs";
// import JoinCommunitySection from "../components/promotional/JoinCommunitySection.tsx";
// import ImageCarousel from "../components/Gallery/ImageCarousel.tsx";

// export default function Home() {
//   const { data: products = [], isLoading, isError, error } = useQuery({
//     queryKey: ['products'],
//     queryFn: () => productService.getAll(),
//     refetchOnWindowFocus: true,
//   });

//   const navigate = useNavigate();
//   const [newArrivals, setNewArrivals] = useState([]);
//   const [bestSellers, setBestSellers] = useState([]);
//   const [featuredCollections, setFeaturedCollections] = useState([]);
//   const [limitedOffers, setLimitedOffers] = useState([]);

//   useEffect(() => {
//     if (Array.isArray(products)) {
//       // Sort by creation date for new arrivals
//       const sortedByNew = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setNewArrivals(sortedByNew.slice(0, 8));
      
//       // Best sellers (you can replace with actual data)
//       const topSellers = [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
//       setBestSellers(topSellers.slice(0, 4));
      
//       // Featured collections (group by category or type)
//       const collections = [
//         { name: "Summer Collection", image: "/summer-collection.jpg", link: "/category/summer", tagline: "Fresh styles for sunny days" },
//         { name: "Premium Selection", image: "/premium-collection.jpg", link: "/category/premium", tagline: "Luxury craftsmanship" },
//         { name: "Limited Editions", image: "/limited-collection.jpg", link: "/category/limited", tagline: "Exclusive designs" }
//       ];
//       setFeaturedCollections(collections);
      
//       // Limited time offers
//       setLimitedOffers(products.slice(0, 2));
//     }
//   }, [products]);

//   return (
//     <div className="homepage">
//       {/* Sticky Add to Cart Bar - Appears when scrolling beyond hero */}
//       <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transform -translate-y-full transition-transform duration-300 hidden md:block" id="sticky-header">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center">
//             <img src="/logo-small.png" alt="Logo" className="h-8 mr-4" />
//             <span className="font-medium text-gray-900">Premium Quality Products</span>
//           </div>
//           <button 
//             className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all text-sm font-medium"
//             onClick={() => navigate('/products')}
//           >
//             Shop Now
//           </button>
//         </div>
//       </div>

//       {/* Announcement Bar */}
//       <div className="bg-gray-900 text-white py-2 text-center text-sm font-medium">
//         <div className="container mx-auto px-4">
//           Free shipping on orders over Rs. 2000 | Use code WELCOME10 for 10% off your first order
//         </div>
//       </div>

//       {/* Hero Section - Improved with multiple CTA options */}
//       <section className="relative">
//         <HeroSection />
//         <div className="absolute bottom-0 left-0 right-0 pb-10">
//           <div className="container mx-auto px-4 max-w-7xl">
//             <div className="flex justify-center space-x-4">
//               <button 
//                 className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all text-lg font-medium shadow-lg"
//                 onClick={() => navigate('/shop')}
//               >
//                 Shop Now
//               </button>
//               <button 
//                 className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-all text-lg font-medium shadow-lg"
//                 onClick={() => navigate('/collections/new')}
//               >
//                 New Arrivals
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trust Badges */}
//       <section className="py-6 bg-gray-50 border-b border-gray-200">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="flex items-center justify-center p-3">
//               <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M5.5 16V9h2v7H5.5zm4-7v7h2V9h-2zm4 0v7h2V9h-2zm-.5-5l-4-4-4 4h2v2h4V4h2z"></path>
//               </svg>
//               <span className="font-medium text-gray-900">Free Shipping</span>
//             </div>
//             <div className="flex items-center justify-center p-3">
//               <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path>
//                 <path d="M10 5a1 1 0 00-1 1v4a1 1 0 001 1h3a1 1 0 100-2h-2V6a1 1 0 00-1-1z"></path>
//               </svg>
//               <span className="font-medium text-gray-900">24/7 Support</span>
//             </div>
//             <div className="flex items-center justify-center p-3">
//               <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
//               </svg>
//               <span className="font-medium text-gray-900">Quality Guarantee</span>
//             </div>
//             <div className="flex items-center justify-center p-3">
//               <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M4 2a1 1 0 00-1 1v1h14V3a1 1 0 00-1-1H4z"></path>
//                 <path d="M3 16a1 1 0 001 1h12a1 1 0 001-1V6H3v10z"></path>
//               </svg>
//               <span className="font-medium text-gray-900">Secure Checkout</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Collections - Improved design */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
//               Shop Our Collections
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Curated collections for every style and occasion
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {featuredCollections.map((collection, index) => (
//               <div 
//                 key={index}
//                 className="relative group overflow-hidden rounded-xl cursor-pointer h-80"
//                 onClick={() => navigate(collection.link)}
//               >
//                 <img 
//                   src={collection.image} 
//                   alt={collection.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                   <h3 className="text-2xl font-bold tracking-wide mb-2">
//                     {collection.name}
//                   </h3>
//                   <p className="text-gray-200 mb-4">
//                     {collection.tagline}
//                   </p>
//                   <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
//                     Shop Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Best Sellers - High converting section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-10">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
//                 Best Sellers
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Our most loved products by customers
//               </p>
//             </div>
//             <button 
//               className="mt-4 md:mt-0 inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors"
//               onClick={() => navigate('/collections/best-sellers')}
//             >
//               View All
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//               </svg>
//             </button>
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center items-center min-h-[300px]">
//               <span className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full"></span>
//             </div>
//           ) : isError ? (
//             <div className="text-center text-red-500 font-medium">
//               Error loading products: {error?.message}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {bestSellers.map((product) => (
//                 <div
//                   key={product._id}
//                   className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//                   onClick={() => navigate(`/category/${product.productType?.name}/${product.name}`)}
//                 >
//                   <div className="relative bg-gray-100 p-6 flex justify-center items-center h-56">
//                     <img
//                       src={product.images?.[0] || '/placeholder-product.jpg'}
//                       alt={product.name}
//                       className="max-h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
//                     />
//                     <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
//                       BEST SELLER
//                     </span>
//                     <div className="absolute right-3 top-3 flex flex-col space-y-2">
//                       <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
//                         <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
//                         </svg>
//                       </button>
//                       <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
//                         <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                   <div className="p-5">
//                     <div className="flex items-center mb-2">
//                       <div className="flex text-yellow-400">
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                         </svg>
//                       </div>
//                       <span className="text-xs text-gray-500 ml-2">(126)</span>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
//                       {product.name}
//                     </h3>
//                     <div className="flex items-center justify-between mt-2">
//                       <p className="text-orange-500 font-medium">Rs. {product.price}</p>
//                       {product.originalPrice && (
//                         <p className="text-gray-500 line-through text-sm ml-2">Rs. {product.originalPrice}</p>
//                       )}
//                     </div>
//                     <button
//                       className="mt-4 w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition-all text-sm font-medium"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         // Add to cart logic
//                       }}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Limited Time Offers */}
//       <section className="py-16 bg-orange-50">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
//               Limited Time Offers
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Special deals that won't last long
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {limitedOffers.map((product) => (
//               <div
//                 key={product._id}
//                 className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
//               >
//                 <div className="md:w-1/2 p-6 flex justify-center items-center bg-white relative">
//                   <img
//                     src={product.images?.[0] || '/placeholder-product.jpg'}
//                     alt={product.name}
//                     className="max-h-64 w-full object-contain transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br">
//                     SALE
//                   </div>
//                 </div>
//                 <div className="md:w-1/2 p-8 flex flex-col justify-center">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {product.name}
//                   </h3>
//                   <div className="flex items-center mb-4">
//                     <p className="text-red-500 text-2xl font-bold">
//                       Rs. {Math.floor(product.price * 0.8)}
//                     </p>
//                     <p className="text-gray-500 line-through ml-3">
//                       Rs. {product.price}
//                     </p>
//                   </div>
//                   <div className="bg-gray-100 rounded-lg p-3 mb-6">
//                     <div className="text-sm font-medium text-gray-900 mb-1">Offer ends in:</div>
//                     <div className="flex justify-between">
//                       <div className="flex flex-col items-center">
//                         <span className="text-xl font-bold text-gray-900">12</span>
//                         <span className="text-xs text-gray-600">Hours</span>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <span className="text-xl font-bold text-gray-900">34</span>
//                         <span className="text-xs text-gray-600">Minutes</span>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <span className="text-xl font-bold text-gray-900">56</span>
//                         <span className="text-xs text-gray-600">Seconds</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all font-medium"
//                     onClick={() => navigate(`/category/${product.productType?.name}/${product.name}`)}
//                   >
//                     Shop Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* New Arrivals Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-10">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
//                 New Arrivals
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 Discover our latest additions that just arrived in store
//               </p>
//             </div>
//             <button 
//               className="mt-4 md:mt-0 inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors"
//               onClick={() => navigate('/collections/new')}
//             >
//               View All
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//               </svg>
//             </button>
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center items-center min-h-[400px]">
//               <span className="animate-spin w-16 h-16 border-4 border-gray-300 border-t-orange-500 rounded-full"></span>
//             </div>
//           ) : isError ? (
//             <div className="text-center text-red-500 font-medium text-xl">
//               Error loading products: {error?.message}
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//               {newArrivals.slice(0, 8).map((product) => (
//                 <div
//                   key={product._id}
//                   onClick={() => navigate(`/category/${product.productType?.name}/${product.name}`)}
//                   className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="relative bg-gray-100 p-4 flex justify-center items-center h-48">
//                     <img
//                       src={product.images?.[0] || '/placeholder-product.jpg'}
//                       alt={product.name}
//                       className="max-h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
//                     />
//                     <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
//                       NEW
//                     </span>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
//                       {product.name}
//                     </h3>
//                     <p className="text-orange-500 font-medium mt-1 text-sm">Rs. {product.price}</p>
//                     <button
//                       className="mt-3 w-full bg-gray-900 text-white px-3 py-1 rounded hover:bg-orange-500 transition-all text-xs font-medium"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         // Add to cart logic
//                       }}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Value Proposition - Why Choose Us */}
//       <section className="py-16 bg-gray-900 text-white">
//       <WhyUs />
//       </section>

     
      

//         {/* FAQ */}
//         <section>
//           <FAQSection />
//         </section>

//         {/* Join Community */}
//         <section>
//           <JoinCommunitySection />
//         </section>

//         <FiveStarReviews />
//       </div>
  
//   );
// }
