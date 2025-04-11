interface PromoBannerProps {
    message: string;
  }
  
  export default function PromoBanner({ message }: PromoBannerProps) {
    return (
      <div className="bg-orange-500 text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4">
          <p className="font-medium">
            {message}
          </p>
        </div>
      </div>
    );
  }
  