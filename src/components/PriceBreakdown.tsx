// import { motion } from 'framer-motion';

// interface PriceBreakdownProps {
//   subtotal: number;
//   tax: number;
//   total: number;
//   discount: number;
// }

// export function PriceBreakdown({
//   subtotal,
//   tax,
//   total,
//   discount,
// }: PriceBreakdownProps) {
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between">
//         <span>Subtotal:</span>
//         <span>Rs.{subtotal.toFixed(2)}</span>
//       </div>
//       {discount > 0 && (
//         <motion.div
//           className="flex justify-between text-green-600"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <span>Discount:</span>
//           <span>-Rs.{(subtotal * discount).toFixed(2)}</span>
//         </motion.div>
//       )}
//       <div className="flex justify-between">
//         <span>Tax:</span>
//         <span>Rs.{tax.toFixed(2)}</span>
//       </div>
//       <div className="flex justify-between font-bold text-lg pt-4">
//         <span>Total:</span>
//         <span>Rs.{total.toFixed(2)}</span>
//       </div>
//     </div>
//   );
// }