import { motion } from 'framer-motion';

interface TrustBadgeProps {
  icon: string;
  title: string;
  description: string;
}

export default function TrustBadge({ icon, title, description }: TrustBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-12 h-12 flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon === 'truck' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          )}
          {icon === 'camera' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
          )}
          {icon === 'shield' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          )}
          {icon === 'star' && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          )}
        </svg>
      </div>
      <h3 className="text-sm font-light tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-gray-600 tracking-wide">{description}</p>
    </motion.div>
  );
}

// import { motion } from 'framer-motion';

// interface TrustBadgeProps {
//   icon: string;
//   title: string;
//   description: string;
// }

// export default function TrustBadge({ icon, title, description }: TrustBadgeProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="flex flex-col items-center text-center p-6"
//     >
//       <div className="w-12 h-12 flex items-center justify-center mb-4">
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           {icon === 'truck' && (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//             />
//           )}
//           {icon === 'camera' && (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//             />
//           )}
//           {icon === 'shield' && (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//             />
//           )}
//           {icon === 'star' && (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//             />
//           )}
//         </svg>
//       </div>
//       <h3 className="text-sm font-light tracking-wider mb-2">{title}</h3>
//       <p className="text-xs text-gray-600 tracking-wide">{description}</p>
//     </motion.div>
//   );
// }
