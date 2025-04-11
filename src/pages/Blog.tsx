import { useState, useEffect } from 'react';
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
      imageColor: 'from-blue-400 to-purple-500',
    },
    {
      id: 2,
      title: 'The Art of Personalizing Your Devices with Skins',
      excerpt: 'Personalization is key to making something truly yours. Custom skins allow you to express your personality and make a statement. Whether you\'re looking for bold, minimalist designs or something more playful, Mobiiwrap has something for everyone.',
      category: 'Trends',
      date: 'April 2, 2025',
      readTime: '3 min read',
      imageColor: 'from-green-400 to-teal-500',
    },
    {
      id: 3,
      title: 'How Custom Skins Can Enhance Your Device\'s Longevity',
      excerpt: 'One of the most overlooked aspects of device care is protecting the outer surface. Scratches, fingerprints, and daily wear and tear can significantly reduce the lifespan and appearance of your phone or earphones.',
      category: 'Tips',
      date: 'March 29, 2025',
      readTime: '5 min read',
      imageColor: 'from-red-400 to-pink-500',
    },
  ];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (postId) => {
    setSelectedPost(postId);
    // Scroll to top when a post is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative">
        {/* Background with gradient */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-orange-500 to-yellow-400 relative overflow-hidden">
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dskopgpgi/image/upload/v1744241247/heroImage4_dxppil.jpg')"
            }}
          />
        </div>
        
        {/* Content positioned over the gradient */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mobiiwrap Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and news in custom device wraps.
            </p>
          </motion.div>
        </div>

        {/* Search bar in card that overflows the hero section */}
        <div className="max-w-4xl mx-auto px-4 relative -mt-8">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-4 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-grow py-2 px-4 bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-orange-500 text-white py-2 px-6 rounded-r-lg hover:bg-orange-600 transition-colors">
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            // Single post view
            <motion.div
              key="single-post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button 
                onClick={handleClosePost}
                className="flex items-center mb-6 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to all posts
              </button>
              
              {blogPosts.filter(post => post.id === selectedPost).map(post => (
                <div key={post.id}>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                  
                  <div className="flex items-center text-gray-600 mb-6">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">{post.category}</span>
                  </div>
                  
                  <div className={`h-64 rounded-lg bg-gradient-to-r ${post.imageColor} mb-8`}></div>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-4">{post.excerpt}</p>
                    <p className="text-lg text-gray-700 mb-4">
                      Custom wraps provide the perfect solution, offering both style and durability. At Mobiiwrap, we understand the importance of keeping your devices in pristine condition while also allowing you to express your personal style.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                      Our premium vinyl wraps are designed to fit perfectly on your devices, providing a sleek look while also protecting against scratches, fingerprints, and minor impacts. Unlike bulky cases, these wraps maintain the slim profile of your device.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-8 mb-4">The Benefits of Custom Wraps</h2>
                    <ul className="list-disc pl-6 mb-6">
                      <li className="mb-2">Protection against scratches and daily wear</li>
                      <li className="mb-2">Personalized style that reflects your personality</li>
                      <li className="mb-2">Easy application and removal without residue</li>
                      <li className="mb-2">Maintains the slim profile of your device</li>
                      <li className="mb-2">Affordable alternative to cases</li>
                    </ul>
                    
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-8">
                      <p className="italic">
                        "The quality of Mobiiwrap skins is outstanding. My phone looks amazing and I've already received compliments on the design!"
                      </p>
                      <p className="text-right font-medium mt-2">— Satisfied Customer</p>
                    </div>
                    
                    <p className="text-lg text-gray-700">
                      Visit our shop in Gaffar Market, Karol Bagh or browse our online catalog to find the perfect wrap for your device. Our team is always ready to help you find the right design for your style.
                    </p>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold mb-4">Share this article</h3>
                    <div className="flex space-x-4">
                      {['Facebook', 'Twitter', 'LinkedIn', 'Email'].map(platform => (
                        <button 
                          key={platform}
                          className="text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            // Blog listing view
            <motion.div
              key="blog-listing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category tabs */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Blog posts grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      {/* Placeholder image with gradient */}
                      <div className={`h-48 bg-gradient-to-r ${post.imageColor}`}></div>
                      
                      <div className="p-6">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                            {post.category}
                          </span>
                          
                          <button
                            onClick={() => handlePostClick(post.id)}
                            className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600">No posts found matching your search.</h3>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                    className="mt-4 text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              )}

              {/* Newsletter Sign-up */}
              <motion.div 
                className="mt-16 bg-orange-50 rounded-lg p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h3>
                <p className="text-gray-600 mb-6">
                  Get the latest trends, tips, and news about custom device wraps delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="py-3 px-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <button className="py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Call to Action Section */}
      <section className="bg-gray-900 py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Get Your Custom Wraps Today</h2>
          <p className="text-lg mb-8 text-gray-300">
            Whether you want to protect your device or add a unique touch, Mobiiwrap has the perfect solution for you.
          </p>
          <a
            href="/category/mobile-skins"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all transform hover:scale-105"
          >
            Explore Our Skins Collection
          </a>
        </div>
      </section>
    </div>
  );
}