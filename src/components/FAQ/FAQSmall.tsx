import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// FAQ data
const faqs = [
  {
    question: "What is Mobiiwrap?",
    answer:
      "Mobiiwrap specializes in high-quality device skins for a variety of gadgets, including phones, earphones, gaming consoles, watches, and more. Our skins are designed to protect your devices while adding a personalized touch."
  },
  {
    question: "How do I apply a Mobiiwrap skin?",
    answer:
      "Applying a Mobiiwrap skin is simple. Clean your device thoroughly, align the skin carefully, and press it down starting from the center outward. Use a hairdryer on low heat to help with adhesion around curves."
  },
  {
    question: "Are Mobiiwrap skins reusable?",
    answer:
      "While our skins are designed for single use, they can be carefully removed and reapplied if needed. However, we recommend using a new skin for optimal adhesion and appearance."
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping times and costs vary by location. You can check shipping options and estimated delivery times during checkout."
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unopened and unused products. For defective items, please contact our customer service within 7 days of receipt."
  }
];

// FAQ Accordion Item
interface FAQ {
  question: string;
  answer: string;
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-black/10 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xl font-light tracking-[0.1em] uppercase text-black/90 group-hover:text-black transition-colors">
          {faq.question}
        </span>
        <ChevronDown 
          className={`w-6 h-6 text-black/40 transition-all duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-base text-black/60 tracking-wide leading-relaxed"
        >
          {faq.answer}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <motion.h1 
            className="text-5xl md:text-6xl font-light tracking-[0.2em] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            FAQ
          </motion.h1>
          <motion.p 
            className="text-lg text-black/60 tracking-wide max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about our products and services.
          </motion.p>
        </div>
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </motion.div>
      </section>
    </main>
  );
}