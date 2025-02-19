import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

// FAQ Data
const faqs = [
  { question: "What is Mobiiwrap?", answer: "Mobiiwrap specializes in high-quality device skins for various gadgets, ensuring protection with style." },
  { question: "Are Mobiiwrap skins removable?", answer: "Yes, they can be removed without leaving residue, allowing easy skin swaps." },
  { question: "Do Mobiiwrap skins affect wireless charging?", answer: "No, our ultra-thin skins ensure seamless wireless charging compatibility." },
  { question: "How long does shipping take?", answer: "Orders are processed in 1-2 business days, with standard shipping taking 5-7 days." }
];

const FAQItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-300 py-3">
      <button className="w-full flex justify-between items-center text-left focus:outline-none" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-[#333333]">{faq.question}</span>
        <span className="text-[#FF8C00]">{open ? '-' : '+'}</span>
      </button>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-gray-600">
          {faq.answer}
        </motion.div>
      )}
    </div>
  );
};

export default function FAQSection() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/faq" className="text-[#FF8C00] font-semibold hover:underline">View More FAQs →</Link>
      </div>
    </section>
  );
}
