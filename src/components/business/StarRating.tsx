
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={size} 
        className={i < rating ? "fill-brand-orange text-brand-orange" : "text-gray-300"} 
      />
    );
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;
