
// // InstagramPost Component to display an Instagram post
// const InstagramPost: React.FC<{ instagramLink: string }> = ({ instagramLink }) => {
//   if (!instagramLink) {
//     return <p>No Instagram link provided</p>; // You can customize this message or return nothing if you prefer.
//   }

//   const postId = instagramLink.split('/p/')[1]?.split('/')[0]; // Extract the post ID from the URL

//   if (!postId) {
//     return <p>Invalid Instagram link</p>; // Handle invalid URL format
//   }

//   return (
//     <div className="instagram-post">
//       <iframe
//         src={`https://www.instagram.com/p/${postId}/embed`}
//         width="400"
//         height="480"
//         frameBorder="0"
//         scrolling="no"
//         allow="autoplay; encrypted-media"
//         title={`Instagram post ${postId}`}
//         className="w-full h-full object-cover rounded-lg"
//       />
//     </div>
//   );
// };

// export default InstagramPost;
