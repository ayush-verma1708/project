import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "Mobiiwrap’s skins are a game changer! My phone looks sleek and stylish with the custom designs, and the quality is top-notch. Highly recommend!",
    author: "Ayush Verma",
    rating: 5
  },
  {
    text: "I’m amazed at the precision of the wrap. It fits perfectly and the material feels luxurious. The design options are fantastic too!",
    author: "Ansh Saxena",
    rating: 5
  },
  {
    text: "Great experience! The wrap was easy to apply, and it made my phone look unique and personalized. Absolutely love the premium feel.",
    author: "Ritvik Rana",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-serif text-center mb-4 text-[#333333] tracking-wide">
          What Our Customers Say
        </h2>
        <p className="text-[#777777] text-center mb-16 max-w-2xl mx-auto text-lg">
          Read about experiences from our valued customers.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Star Ratings */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-orange-400" fill="currentColor" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#333333] text-lg leading-relaxed mb-6">
                “{testimonial.text}”
              </p>

              {/* Author Name */}
              <p className="font-semibold text-[#555555] text-md">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
