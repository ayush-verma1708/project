// import { useState, useEffect } from 'react';

// const InstagramSection = () => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Only run once on component mount
//   // useEffect(() => {
//   //   // Option 1: Mock data (for development) - simplified non-async approach
//   //   const loadMockData = () => {
//   //     try {
//   //       // Mock data that resembles Instagram posts
//   //       const mockPosts = [
//   //         {
//   //           id: '1',
//   //           media_url: 'https://example.com/insta1.jpg',
//   //           permalink: 'https://www.instagram.com/p/CxYzABC123/',
//   //           caption: 'Check out our latest phone wraps! #mobiiwrap #phonestyle'
//   //         },
//   //         {
//   //           id: '2',
//   //           media_url: 'https://example.com/insta2.jpg',
//   //           permalink: 'https://www.instagram.com/p/CxYzABC456/',
//   //           caption: 'New designs just dropped ✨ #phoneaccessories'
//   //         },
//   //         // Add 4 more mock posts
//   //         ...Array(4).fill().map((_, i) => ({
//   //           id: `${i+3}`,
//   //           media_url: `https://images.unsplash.com/photo-${1590600000 + i * 100000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`,
//   //           permalink: `https://www.instagram.com/p/mock${i+3}/`,
//   //           caption: `Featured product ${i+1} #mobiiwrap`
//   //         }))
//   //       ];
        
//   //       setPosts(mockPosts);
//   //     } catch (error) {
//   //       console.error("Error loading mock data:", error);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   // Choose which data source to use:
//   //   // Option 1: Mock data (currently active)
//   //   loadMockData();
    
//   //   // Option 2: Real Instagram API (uncomment to use)
//   //   // fetchInstagramData();
    
//   // }, []);

// useEffect(() => {
//   const fetchMockData = async () => {
//     try {
//       const mockPosts = [
//         {
//           id: '1',
//           media_url: 'https://example.com/insta1.jpg',
//           permalink: 'https://www.instagram.com/p/CxYzABC123/',
//           caption: 'Check out our latest phone wraps! #mobiiwrap #phonestyle'
//         },
//         {
//           id: '2',
//           media_url: 'https://example.com/insta2.jpg',
//           permalink: 'https://www.instagram.com/p/CxYzABC456/',
//           caption: 'New designs just dropped ✨ #phoneaccessories'
//         },
//         ...Array(4).fill().map((_, i) => ({
//           id: `${i + 3}`,
//           media_url: `https://images.unsplash.com/photo-${1590600000 + i * 100000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`,
//           permalink: `https://www.instagram.com/p/mock${i + 3}/`,
//           caption: `Featured product ${i + 3} #mobiiwrap`
//         }))
//       ];
      
//       setPosts(mockPosts);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error loading mock data:", error);
//       setIsLoading(false);
//     }
//   };
//   fetchMockData();
// }, []);

//   // Option 2: Real Instagram API implementation
//   const fetchInstagramPosts = async () => {
//     try {
//       const response = await axios.get(
//         `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption&access_token=${INSTAGRAM_ACCESS_TOKEN}`
//       );
//       console.log("Instagram API Response:", response.data); // Debugging step
//       if (response.data && response.data.data) {
//         setPosts(response.data.data);
//       } else {
//         console.warn("No posts found in API response. Falling back to mock data.");
//         setPosts(mockPosts);
//       }
//     } catch (error) {
//       console.error("Error fetching Instagram posts:", error);
//       setPosts(mockPosts);
//     }
//   };
  

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold mb-2">Follow Us on Instagram</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             @mobiiwrap • Tag us for a chance to be featured
//           </p>
//         </div>
        
//         {isLoading ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded"></div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
//             {posts.map((post) => (
//               <a 
//                 key={post.id}
//                 href={post.permalink || 'https://www.instagram.com/mobiiwrap/'} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative group aspect-square overflow-hidden rounded-lg"
//               >
//                 <img 
//                   src={post.media_url} 
//                   alt={post.caption || 'Mobiiwrap Instagram post'} 
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-instagram.jpg';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                   </svg>
//                 </div>
//               </a>
//             ))}
//           </div>
//         )}

//         <div className="text-center mt-8">
//           <a
//             href="https://www.instagram.com/mobiiwrap/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
//           >
//             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//               <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//             </svg>
//             Follow @mobiiwrap
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstagramSection;