import { motion, useAnimation } from "framer-motion";
import { 
  Rocket, 
  Target, 
  Shield, 
  Users, 
  Heart,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';

const timeline = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'MobiiWrap was founded with a vision to revolutionize mobile device customization.',
    icon: Rocket
  },
  {
    year: '2021',
    title: 'Rapid Growth',
    description: 'Expanded our product line to cover more devices and introduced premium materials.',
    icon: Sparkles
  },
  {
    year: '2022',
    title: 'Innovation Award',
    description: 'Received industry recognition for our innovative design patterns and materials.',
    icon: Award
  },
  {
    year: '2023',
    title: 'Global Expansion',
    description: 'Started shipping worldwide and established partnerships with major retailers.',
    icon: Users
  }
];

const values = [
  {
    title: 'Quality First',
    description: 'We use only premium materials for lasting protection and style.',
    icon: Shield
  },
  {
    title: 'Customer Focus',
    description: 'Your satisfaction is our top priority in everything we do.',
    icon: Heart
  },
  {
    title: 'Innovation',
    description: 'Constantly pushing boundaries in design and technology.',
    icon: Target
  },
  {
    title: 'Reliability',
    description: 'Fast shipping and responsive customer support.',
    icon: Clock
  }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    bio: 'Visionary leader with 15+ years in tech accessories.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    bio: 'Award-winning designer passionate about user experience.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80',
    bio: 'Expert in product development and market trends.'
  }
];

export default function About() {
  const controls = useAnimation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[40vh] bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto text-gray-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Transforming devices into works of art since 2020
          </motion.p>
        </div>
      </motion.section>

      {/* Our Journey Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          Our Journey
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timeline.map((item, index) => (
            <motion.div 
              key={item.year} 
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-14 h-14 mx-auto bg-gray-800 text-white rounded-full flex items-center justify-center shadow-md">
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-semibold mt-4 text-gray-900">{item.year}</h3>
              <h4 className="text-lg font-medium text-gray-700">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div key={member.name} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full" />
                <h3 className="text-xl font-semibold mt-4 text-gray-900">{member.name}</h3>
                <p className="text-gray-700">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title} 
                className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 mx-auto bg-gray-800 text-white rounded-full flex items-center justify-center shadow-md">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mt-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// import { motion, useAnimation } from "framer-motion";

// import { 
//   Rocket, 
//   Target, 
//   Shield, 
//   Users, 
//   Heart,
//   Award,
//   Clock,
//   Sparkles
// } from 'lucide-react';

// const timeline = [
//   {
//     year: '2020',
//     title: 'The Beginning',
//     description: 'MobiiWrap was founded with a vision to revolutionize mobile device customization.',
//     icon: Rocket
//   },
//   {
//     year: '2021',
//     title: 'Rapid Growth',
//     description: 'Expanded our product line to cover more devices and introduced premium materials.',
//     icon: Sparkles
//   },
//   {
//     year: '2022',
//     title: 'Innovation Award',
//     description: 'Received industry recognition for our innovative design patterns and materials.',
//     icon: Award
//   },
//   {
//     year: '2023',
//     title: 'Global Expansion',
//     description: 'Started shipping worldwide and established partnerships with major retailers.',
//     icon: Users
//   }
// ];

// const values = [
//   {
//     title: 'Quality First',
//     description: 'We use only premium materials for lasting protection and style.',
//     icon: Shield
//   },
//   {
//     title: 'Customer Focus',
//     description: 'Your satisfaction is our top priority in everything we do.',
//     icon: Heart
//   },
//   {
//     title: 'Innovation',
//     description: 'Constantly pushing boundaries in design and technology.',
//     icon: Target
//   },
//   {
//     title: 'Reliability',
//     description: 'Fast shipping and responsive customer support.',
//     icon: Clock
//   }
// ];

// const team = [
//   {
//     name: 'Sarah Johnson',
//     role: 'Founder & CEO',
//     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
//     bio: 'Visionary leader with 15+ years in tech accessories.'
//   },
//   {
//     name: 'Michael Chen',
//     role: 'Head of Design',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
//     bio: 'Award-winning designer passionate about user experience.'
//   },
//   {
//     name: 'Emily Rodriguez',
//     role: 'Product Manager',
//     image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80',
//     bio: 'Expert in product development and market trends.'
//   }
// ];

// export function About() {
//   const controls = useAnimation();
// // Start infinite animation
// const startInfiniteAnimation = () => {
//   controls.start({
//     x: `-${100 * timeline.length}%`,
//     transition: { duration: 45, ease: "linear", repeat: Infinity },
//   });
// };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <motion.section 
//         className="relative h-[40vh] bg-gradient-to-r from-black-600 to-purple-600 flex items-center justify-center text-white"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="text-center">
//           <motion.h1 
//             className="text-4xl md:text-5xl font-bold mb-4"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             Our Story
//           </motion.h1>
//           <motion.p 
//             className="text-xl max-w-2xl mx-auto"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             Transforming devices into works of art since 2020
//           </motion.p>
//         </div>
//       </motion.section>

//       {/* Our Journey Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//       <motion.h2
//         className="text-3xl font-bold text-center mb-16"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Our Journey
//       </motion.h2>
//       <div
//         className="relative overflow-hidden"
//         onMouseEnter={() => controls.stop()} // Stop animation on hover
//         onMouseLeave={startInfiniteAnimation} // Restart animation on mouse leave
//       >
//         <motion.div
//           className="flex space-x-20"
//           animate={controls}
//           style={{ width: `${timeline.length * 100}%` }} // Dynamically set width
//         >
//           {timeline.map((item, index) => (
//             <div
//               key={item.year}
//               className="flex-shrink-0 min-w-[300px] flex flex-col items-center text-center"
//             >
//               {/* Circle with Icon */}
//               <div className="relative w-14 h-14 rounded-full bg-black-600 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
//                 <item.icon size={28} />
//               </div>
//               {/* Content */}
//               <motion.div
//                 className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full hover:shadow-2xl transition-shadow"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <h3 className="text-2xl font-bold text-black-600">{item.year}</h3>
//                 <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
//                 <p className="text-gray-600">{item.description}</p>
//               </motion.div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>

//       {/* Team Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2 
//             className="text-3xl font-bold text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             Meet Our Team
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {team.map((member, index) => (
//               <motion.div
//                 key={member.name}
//                 className="relative group"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
//                   <img 
//                     src={member.image} 
//                     alt={member.name}
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
//                     <h3 className="text-xl font-semibold">{member.name}</h3>
//                     <p className="text-black-300 mb-2">{member.role}</p>
//                     <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
//                       {member.bio}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
    
//        {/* Values Section */}
//        <section className="py-20 bg-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2 
//             className="text-3xl font-bold text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             Our Values
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <motion.div
//                 key={value.title}
//                 className="bg-white p-6 rounded-lg shadow-lg text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="w-16 h-16 mx-auto mb-4 bg-black-100 rounded-full flex items-center justify-center text-black-600">
//                   <value.icon size={32} />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }