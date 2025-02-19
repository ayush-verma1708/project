import { useState } from 'react';
import { motion } from 'framer-motion';

// FAQ data
const faqs = [
  {
    question: "What is Mobiiwrap?",
    answer:
      "Mobiiwrap specializes in high-quality device skins for a variety of gadgets, including phones, earphones, gaming consoles, watches, and more. Our skins are designed to protect your devices while adding a personalized touch."
  },
  {
    question: "What materials are used in Mobiiwrap skins?",
    answer:
      "Our skins are made from premium vinyl that is durable, long-lasting, and easy to apply. They provide a sleek, stylish look while protecting your device from scratches and minor impacts."
  },
  {
    question: "How do I apply a Mobiiwrap skin?",
    answer:
      "Applying a Mobiiwrap skin is easy. Each order includes detailed instructions and application videos on our website. Simply ensure your device is clean and dry for the best results."
  },
  {
    question: "Are Mobiiwrap skins removable?",
    answer:
      "Yes, our skins are designed to be removable without leaving any residue on your device. You can easily peel off an old skin to apply a new one."
  },
  {
    question: "Will the skin affect the functionality of my device?",
    answer:
      "No, Mobiiwrap skins are precisely cut to fit your device without covering essential ports, buttons, or sensors. Your device’s functionality remains intact."
  },
  {
    question: "Do you offer custom designs?",
    answer:
      "Yes, we offer custom design options. You can upload your own artwork or choose from a variety of design templates to create a unique look. Please contact us for more details on custom orders."
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Orders are typically processed within 1-2 business days. Standard shipping usually takes 5-7 business days, with expedited options available at checkout."
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. If you're not satisfied with your purchase, return the product in its original condition for a full refund or exchange. Please refer to our Return Policy page for details."
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email. Use this number on our website or the carrier's site to check your shipment status."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer international shipping to most countries. Shipping rates and times vary by destination—please see our Shipping Policy page for more information."
  },
  {
    question: "Can I change or cancel my order after it's been placed?",
    answer:
      "If you need to change or cancel your order, please contact us as soon as possible. We will do our best to accommodate your request; however, once an order is processed and shipped, changes cannot be made."
  },
  {
    question: "How can I contact Mobiiwrap for further assistance?",
    answer:
      "For any questions or further assistance, please contact our customer service team at support@mobiiwrap.com or visit our Contact Us page."
  },
  {
    question: "Are Mobiiwrap skins compatible with wireless charging?",
    answer:
      "Yes, our skins are thin enough to be compatible with most wireless chargers. If you experience any issues, check that the skin is applied correctly and that your charger is functioning properly."
  },
  {
    question: "How durable are Mobiiwrap skins?",
    answer:
      "Our skins are designed to be highly durable, offering long-lasting protection against scratches and minor dings. They’re made from high-quality vinyl built for everyday use."
  },
  {
    question: "Will the skin leave any residue on my device?",
    answer:
      "No, our skins are engineered to be residue-free. When removed, they won't leave any sticky residue or damage your device’s surface."
  },
  {
    question: "Can I reapply a Mobiiwrap skin after removing it?",
    answer:
      "While our skins are removable, they are not designed to be reapplied. Removing a skin may weaken its adhesive properties, making it difficult to reapply effectively."
  },
  {
    question: "Are the skins waterproof?",
    answer:
      "Mobiiwrap skins are water-resistant and protect against splashes and spills; however, they are not waterproof and should not be submerged in water."
  },
  {
    question: "Do you offer skins for older or less common devices?",
    answer:
      "Yes, we offer a wide range of skins, including options for older and less common devices. If your device isn’t listed, please contact us and we’ll do our best to accommodate your request."
  },
  {
    question: "Can I clean my device with the skin applied?",
    answer:
      "Yes, you can gently clean your device with the skin on using a soft, damp cloth. Avoid harsh chemicals or abrasive materials that could damage the skin."
  },
  {
    question: "How thick are Mobiiwrap skins?",
    answer:
      "Our skins are ultra-thin—approximately 0.2mm thick—ensuring a sleek look without adding bulk to your device."
  },
  {
    question: "What if my skin has a defect or damage upon arrival?",
    answer:
      "If you receive a defective or damaged skin, please contact our customer service within 7 days. We’ll arrange for a replacement or refund according to our policy."
  },
  {
    question: "Can I use a case with a Mobiiwrap skin?",
    answer:
      "Yes, our skins are thin enough to be used under most cases, offering extra protection and style without interfering with your case’s fit."
  },
  {
    question: "How do I remove air bubbles during application?",
    answer:
      "If air bubbles form during application, use a soft cloth or squeegee to smooth them out towards the edges. For stubborn bubbles, gently puncture them with a pin to release the trapped air."
  },
  {
    question: "Are Mobiiwrap skins eco-friendly?",
    answer:
      "We strive to reduce our environmental impact by using recyclable materials for packaging. While our skins are not biodegradable, their long lifespan helps reduce waste."
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
    <div className="border-b border-gray-300 py-4">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[#333333]">{faq.question}</span>
        <span className="text-[#FF8C00]">{open ? '-' : '+'}</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-gray-600"
        >
          {faq.answer}
        </motion.div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </section>
  );
}