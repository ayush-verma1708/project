import { Leaf, Users, Globe, Truck } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Premium Quality Materials",
    description: "Our skins are made from high-quality materials for a perfect fit and luxurious finish."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Variety of Beautiful Designs",
    description: "Choose from a wide selection of stunning designs that complement your phone's style and elevate its look."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Easy to Apply & Remove",
    description: "Our wraps are designed for a seamless application and effortless removal, leaving no residue or damage behind."
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Pan India Shipping",
    description: "We offer fast, reliable shipping Pan India, delivering our premium mobile skins wherever you are."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#E8E6E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-serif text-center mb-4 text-[#333333]">
          Why Choose Us
        </h2>
        <p className="text-[#333333]/80 text-center mb-16 max-w-2xl mx-auto">
          Our commitment to quality and sustainability sets us apart.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#f2f2f2] to-[#d6d6d6] shadow-lg text-[#333333] mb-6 transition-transform transform group-hover:scale-105">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl mb-3 text-[#333333]">
                {feature.title}
              </h3>
              <p className="text-[#333333]/80 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
