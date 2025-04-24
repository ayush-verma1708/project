import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Trends', 'Tips', 'Product Care', 'News'];
  
  const blogPosts = [
    {
      id: 1,
      title: 'Why Custom Skins are the Ultimate Protection for Your Devices',
      excerpt: 'In today\'s fast-paced world, our devices are more than just tools; they\'re an extension of ourselves. From mobile phones to earphones, these items accompany us everywhere, and as such, they need to be well protected.',
      category: 'Product Care',
      date: 'April 8, 2025',
      readTime: '4 min read',
    },
    {
      id: 2,
      title: 'The Art of Personalizing Your Devices with Skins',
      excerpt: 'Personalization is key to making something truly yours. Custom skins allow you to express your personality and make a statement. Whether you\'re looking for bold, minimalist designs or something more playful, Mobiiwrap has something for everyone.',
      category: 'Trends',
      date: 'April 2, 2025',
      readTime: '3 min read',
    },
    {
      id: 3,
      title: 'How Custom Skins Can Enhance Your Device\'s Longevity',
      excerpt: 'One of the most overlooked aspects of device care is protecting the outer surface. Scratches, fingerprints, and daily wear and tear can significantly reduce the lifespan and appearance of your phone or earphones.',
      category: 'Tips',
      date: 'March 29, 2025',
      readTime: '5 min read',
    },
  ];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
  }

  const handlePostClick = (postId: BlogPost['id']): void => {
    setSelectedPost(postId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Minimalist Black & White */}
      <section className="relative">
        <div className="h-96 bg-black relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '20px 20px'
               }}
          />
          
          {/* Minimalist diagonal line accent */}
          <div className="absolute bottom-0 right-0 w-full h-24 bg-white transform -skew-y-2 origin-bottom-right" />
        </div>
        
        {/* Content positioned over the hero */}
        <div className="absolute inset-0 flex items-center px-6 max-w-6xl mx-auto">
          <motion.div 
            className="w-full md:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
              THE BLOG
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl">
              Premium insights on device protection, customization, and the latest in skin technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Clean Minimalist Design */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Search bar - Minimalist design */}
        <div className="mb-12">
          <div className="flex border-b border-white/20 pb-2 focus-within:border-white transition-colors">
            <input
              type="text"
              placeholder="SEARCH ARTICLES"
              className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm uppercase tracking-wider"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedPost ? (
            // Single post view - Clean & Minimal
            <motion.div
              key="single-post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-8 lg:col-start-3">
                <button 
                  onClick={handleClosePost}
                  className="inline-flex items-center mb-12 text-white/70 hover:text-white transition-colors uppercase text-sm tracking-wider"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back
                </button>
                
                {blogPosts.filter(post => post.id === selectedPost).map(post => (
                  <div key={post.id}>
                    <div className="flex items-center text-xs text-white/60 tracking-wider uppercase mb-4">
                      <span>{post.category}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">{post.title}</h1>
                    
                    {/* Minimalist horizontal line */}
                    <div className="h-px w-16 bg-white mb-8"></div>
                    
                    {/* High contrast black and white image */}
                    <div className="h-64 md:h-96 mb-12 bg-white/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    </div>
                    
                    <article className="prose prose-invert max-w-none">
                      <p className="text-lg text-white/80 mb-6">{post.excerpt}</p>
                      <p className="text-lg text-white/80 mb-6">
                        Custom wraps provide the perfect solution, offering both style and durability. At Mobiiwrap, we understand the importance of keeping your devices in pristine condition while also allowing you to express your personal style.
                      </p>
                      <p className="text-lg text-white/80 mb-6">
                        Our premium vinyl wraps are designed to fit perfectly on your devices, providing a sleek look while also protecting against scratches, fingerprints, and minor impacts. Unlike bulky cases, these wraps maintain the slim profile of your device.
                      </p>
                      
                      <h2 className="text-2xl font-bold mt-12 mb-6 tracking-tight">The Benefits of Custom Wraps</h2>
                      <ul className="space-y-3 text-white/80 mb-12">
                        <li className="flex items-start">
                          <span className="mr-2 text-white">—</span>
                          Protection against scratches and daily wear
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-white">—</span>
                          Personalized style that reflects your personality
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-white">—</span>
                          Easy application and removal without residue
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-white">—</span>
                          Maintains the slim profile of your device
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-white">—</span>
                          Affordable alternative to cases
                        </li>
                      </ul>
                      
                      <div className="border border-white/10 p-8 my-12 bg-white/5">
                        <p className="italic text-white/80">
                          "The quality of Mobiiwrap skins is outstanding. My phone looks amazing and I've already received compliments on the design!"
                        </p>
                        <p className="text-right font-medium mt-4 text-white">— Satisfied Customer</p>
                      </div>
                      
                      <p className="text-lg text-white/80">
                        Visit our store in Gaffar Market, Karol Bagh or browse our online catalog to find the perfect wrap for your device. Our team is always ready to help you find the right design for your style.
                      </p>
                    </article>
                    
                    <div className="mt-16 pt-8 border-t border-white/10">
                      <h3 className="text-sm uppercase tracking-wider mb-4">Share</h3>
                      <div className="flex space-x-6">
                        {['Facebook', 'Twitter', 'LinkedIn', 'Email'].map(platform => (
                          <button 
                            key={platform}
                            className="text-sm text-white/60 hover:text-white transition-colors"
                          >
                            {platform}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Blog listing view - Minimalist Grid
            <motion.div
              key="blog-listing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Minimalist Category tabs */}
              <div className="mb-16">
                <div className="flex flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`mr-8 mb-4 pb-1 text-sm uppercase tracking-wider transition-all ${
                        activeCategory === category 
                          ? 'text-white border-b-2 border-white' 
                          : 'text-white/50 hover:text-white/80'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Minimalist Blog posts grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      onClick={() => handlePostClick(post.id)}
                    >
                      {/* Minimalist image placeholder */}
                      <div className="aspect-[4/3] bg-white/5 mb-6 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
                      </div>
                      
                      <div className="flex items-center text-xs text-white/60 uppercase tracking-wider mb-2">
                        <span>{post.category}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-white/90 text-white/80 transition-colors">{post.title}</h3>
                      
                      <p className="text-white/60 mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center">
                        <span className="uppercase text-xs tracking-wider border-b border-white/30 pb-px text-white/70 group-hover:text-white group-hover:border-white transition-colors">
                          Read Article
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <h3 className="text-xl font-medium text-white/70 mb-4">No results found</h3>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                    className="uppercase text-sm tracking-wider underline underline-offset-4 text-white/80 hover:text-white transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Newsletter Sign-up - Minimalist */}
              <motion.div 
                className="mt-24 pt-16 border-t border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-2xl font-bold mb-6 tracking-tight">SUBSCRIBE TO OUR NEWSLETTER</h3>
                  <p className="text-white/70 mb-8">
                    Be the first to know about new products, limited releases, and exclusive content.
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="YOUR EMAIL"
                      className="flex-grow bg-transparent text-white placeholder-white/40 border border-white/20 py-3 px-4 focus:outline-none focus:border-white transition-colors text-sm uppercase tracking-wider"
                    />
                    <button className="bg-white text-black py-3 px-8 font-medium text-sm uppercase tracking-wider hover:bg-white/90 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimalist CTA - High Contrast */}
      <section className="bg-white text-black py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">PRECISION-CUT PREMIUM SKINS</h2>
          <p className="text-lg mb-12 text-black/70">
            The ultimate combination of protection and style. Make your device uniquely yours.
          </p>
          <a
            href="/category/mobile-skins"
            className="inline-block px-10 py-4 bg-black text-white uppercase tracking-wider text-sm font-medium hover:bg-black/90 transition-all"
          >
            SHOP NOW
          </a>
        </div>
      </section>
    </div>
  );
}
// import { useState} from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function Blog() {
//   const [selectedPost, setSelectedPost] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
  
//   const categories = ['All', 'Trends', 'Tips', 'Product Care', 'News'];
  
//   const blogPosts = [
//     {
//       id: 1,
//       title: 'Why Custom Skins are the Ultimate Protection for Your Devices',
//       excerpt: 'In today\'s fast-paced world, our devices are more than just tools; they\'re an extension of ourselves. From mobile phones to earphones, these items accompany us everywhere, and as such, they need to be well protected.',
//       category: 'Product Care',
//       date: 'April 8, 2025',
//       readTime: '4 min read',
//       imageColor: 'from-blue-400 to-purple-500',
//     },
//     {
//       id: 2,
//       title: 'The Art of Personalizing Your Devices with Skins',
//       excerpt: 'Personalization is key to making something truly yours. Custom skins allow you to express your personality and make a statement. Whether you\'re looking for bold, minimalist designs or something more playful, Mobiiwrap has something for everyone.',
//       category: 'Trends',
//       date: 'April 2, 2025',
//       readTime: '3 min read',
//       imageColor: 'from-green-400 to-teal-500',
//     },
//     {
//       id: 3,
//       title: 'How Custom Skins Can Enhance Your Device\'s Longevity',
//       excerpt: 'One of the most overlooked aspects of device care is protecting the outer surface. Scratches, fingerprints, and daily wear and tear can significantly reduce the lifespan and appearance of your phone or earphones.',
//       category: 'Tips',
//       date: 'March 29, 2025',
//       readTime: '5 min read',
//       imageColor: 'from-red-400 to-pink-500',
//     },
//   ];
  
//   const filteredPosts = blogPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   interface BlogPost {
//     id: number;
//     title: string;
//     excerpt: string;
//     category: string;
//     date: string;
//     readTime: string;
//     imageColor: string;
//   }

//   const handlePostClick = (postId: BlogPost['id']): void => {
//     setSelectedPost(postId);
//     // Scroll to top when a post is selected
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleClosePost = () => {
//     setSelectedPost(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       {/* Hero Section */}
//       <section className="relative">
//         {/* Background with gradient */}
//         <div className="h-64 md:h-80 bg-gradient-to-r from-orange-500 to-yellow-400 relative overflow-hidden">
//           {/* Abstract pattern overlay */}
//           <div className="absolute inset-0 opacity-20" 
//             style={{
//               backgroundImage: "url('https://res.cloudinary.com/dskopgpgi/image/upload/f_auto,q_auto,w_1920/v1744241247/heroImage4_dxppil.jpg')"
//             }}
//           />
//         </div>
        
//         {/* Content positioned over the gradient */}
//         <div className="absolute inset-0 flex items-center justify-center text-center px-6">
//           <motion.div 
//             className="text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Mobiiwrap Blog
//             </h1>
//             <p className="text-xl text-white/90 max-w-2xl mx-auto">
//               Stay updated with the latest trends, tips, and news in custom device wraps.
//             </p>
//           </motion.div>
//         </div>

//         {/* Search bar in card that overflows the hero section */}
//         <div className="max-w-4xl mx-auto px-4 relative -mt-8">
//           <motion.div 
//             className="bg-white rounded-lg shadow-lg p-4 flex items-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//           >
//             <input
//               type="text"
//               placeholder="Search articles..."
//               className="flex-grow py-2 px-4 bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="bg-orange-500 text-white py-2 px-6 rounded-r-lg hover:bg-orange-600 transition-colors">
//               Search
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <AnimatePresence mode="wait">
//           {selectedPost ? (
//             // Single post view
//             <motion.div
//               key="single-post"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               <button 
//                 onClick={handleClosePost}
//                 className="flex items-center mb-6 text-orange-500 hover:text-orange-600 transition-colors"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//                 </svg>
//                 Back to all posts
//               </button>
              
//               {blogPosts.filter(post => post.id === selectedPost).map(post => (
//                 <div key={post.id}>
//                   <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                  
//                   <div className="flex items-center text-gray-600 mb-6">
//                     <span>{post.date}</span>
//                     <span className="mx-2">•</span>
//                     <span>{post.readTime}</span>
//                     <span className="mx-2">•</span>
//                     <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">{post.category}</span>
//                   </div>
                  
//                   <div className={`h-64 rounded-lg bg-gradient-to-r ${post.imageColor} mb-8`}></div>
                  
//                   <div className="prose max-w-none">
//                     <p className="text-lg text-gray-700 mb-4">{post.excerpt}</p>
//                     <p className="text-lg text-gray-700 mb-4">
//                       Custom wraps provide the perfect solution, offering both style and durability. At Mobiiwrap, we understand the importance of keeping your devices in pristine condition while also allowing you to express your personal style.
//                     </p>
//                     <p className="text-lg text-gray-700 mb-4">
//                       Our premium vinyl wraps are designed to fit perfectly on your devices, providing a sleek look while also protecting against scratches, fingerprints, and minor impacts. Unlike bulky cases, these wraps maintain the slim profile of your device.
//                     </p>
                    
//                     <h2 className="text-2xl font-bold mt-8 mb-4">The Benefits of Custom Wraps</h2>
//                     <ul className="list-disc pl-6 mb-6">
//                       <li className="mb-2">Protection against scratches and daily wear</li>
//                       <li className="mb-2">Personalized style that reflects your personality</li>
//                       <li className="mb-2">Easy application and removal without residue</li>
//                       <li className="mb-2">Maintains the slim profile of your device</li>
//                       <li className="mb-2">Affordable alternative to cases</li>
//                     </ul>
                    
//                     <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-8">
//                       <p className="italic">
//                         "The quality of Mobiiwrap skins is outstanding. My phone looks amazing and I've already received compliments on the design!"
//                       </p>
//                       <p className="text-right font-medium mt-2">— Satisfied Customer</p>
//                     </div>
                    
//                     <p className="text-lg text-gray-700">
//                       Visit our shop in Gaffar Market, Karol Bagh or browse our online catalog to find the perfect wrap for your device. Our team is always ready to help you find the right design for your style.
//                     </p>
//                   </div>
                  
//                   <div className="mt-12 pt-8 border-t border-gray-200">
//                     <h3 className="text-xl font-bold mb-4">Share this article</h3>
//                     <div className="flex space-x-4">
//                       {['Facebook', 'Twitter', 'LinkedIn', 'Email'].map(platform => (
//                         <button 
//                           key={platform}
//                           className="text-gray-600 hover:text-orange-500 transition-colors"
//                         >
//                           {platform}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           ) : (
//             // Blog listing view
//             <motion.div
//               key="blog-listing"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {/* Category tabs */}
//               <div className="mb-8">
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                         activeCategory === category 
//                           ? 'bg-orange-500 text-white' 
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                       onClick={() => setActiveCategory(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Blog posts grid */}
//               {filteredPosts.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {filteredPosts.map((post, index) => (
//                     <motion.div
//                       key={post.id}
//                       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1, duration: 0.5 }}
//                       whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                     >
//                       {/* Placeholder image with gradient */}
//                       <div className={`h-48 bg-gradient-to-r ${post.imageColor}`}></div>
                      
//                       <div className="p-6">
//                         <div className="flex items-center text-xs text-gray-500 mb-2">
//                           <span>{post.date}</span>
//                           <span className="mx-2">•</span>
//                           <span>{post.readTime}</span>
//                         </div>
                        
//                         <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                        
//                         <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        
//                         <div className="flex items-center justify-between">
//                           <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
//                             {post.category}
//                           </span>
                          
//                           <button
//                             onClick={() => handlePostClick(post.id)}
//                             className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
//                           >
//                             Read More
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <h3 className="text-xl font-medium text-gray-600">No posts found matching your search.</h3>
//                   <button 
//                     onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
//                     className="mt-4 text-orange-500 hover:text-orange-600 transition-colors"
//                   >
//                     Reset filters
//                   </button>
//                 </div>
//               )}

//               {/* Newsletter Sign-up */}
//               <motion.div 
//                 className="mt-16 bg-orange-50 rounded-lg p-8 text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h3>
//                 <p className="text-gray-600 mb-6">
//                   Get the latest trends, tips, and news about custom device wraps delivered to your inbox.
//                 </p>
//                 <div className="flex flex-col sm:flex-row justify-center gap-4">
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
//                   />
//                   <button className="py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
//                     Subscribe
//                   </button>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Call to Action Section */}
//       <section className="bg-gray-900 py-16 text-center text-white">
//         <div className="max-w-4xl mx-auto px-6">
//           <h2 className="text-3xl font-bold mb-4">Get Your Custom Wraps Today</h2>
//           <p className="text-lg mb-8 text-gray-300">
//             Whether you want to protect your device or add a unique touch, Mobiiwrap has the perfect solution for you.
//           </p>
//           <a
//             href="/category/mobile-skins"
//             className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all transform hover:scale-105"
//           >
//             Explore Our Skins Collection
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }