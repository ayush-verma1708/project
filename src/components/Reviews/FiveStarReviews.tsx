import { useState, useEffect } from "react";
import googleReviews from "./google_reviews.json"; // Adjust the path if necessary

interface Review {
  author: string;
  rating: string;
  text: string;
}

function shuffleArray(array: Review[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function FiveStarReviews() {
  const [visibleReview, setVisibleReview] = useState<Review | null>(null); // Change to single review
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const fiveStarReviews = googleReviews.filter(
      (review: Review) => review.rating === "5 stars"
    );
    
    // Take only one review at a time
    const shuffledReview = shuffleArray([...fiveStarReviews]).slice(0, 1)[0];
    setVisibleReview(shuffledReview);
    setAnimationKey((prev) => prev + 1);
    setIsVisible(true);

    const interval = setInterval(() => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        const newShuffled = shuffleArray([...fiveStarReviews]).slice(0, 1)[0];
        setVisibleReview(newShuffled);
        setAnimationKey((prev) => prev + 1);
        setIsVisible(true); // Fade in with new review
      }, 500); // Match transition duration
    }, 10000); // New review every 10 seconds

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed || !visibleReview) return null; // Hide if dismissed or no review

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-4 max-w-xs md:bottom-8 md:right-8">
      {/* Close Button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-0 right-0 -mt-6 -mr-6 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition"
      >
        ✕
      </button>

      {/* Single Review Display */}
      <div
        key={`${animationKey}`} // Single key for one review
        className={`bg-white p-4 rounded-lg shadow-lg border border-orange-100 transition-all duration-500 ${
          isVisible ? "animate-slide-in opacity-100" : "opacity-0 translate-x-10"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-xl">★★★★★</span>
          <span className="font-semibold text-gray-900">{visibleReview.author}</span>
        </div>
        <p className="text-gray-600 mt-1 text-sm">
          {visibleReview.text === "No text available" ? "Great experience!" : visibleReview.text}
        </p>
      </div>
    </div>
  );
}