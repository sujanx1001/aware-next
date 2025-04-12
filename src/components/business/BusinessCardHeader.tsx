
import { Megaphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BusinessCardHeaderProps {
  image: string;
  name: string;
  category: string;
  featured?: boolean;
  isAd?: boolean;
}

const BusinessCardHeader = ({ 
  image, 
  name, 
  category, 
  featured = false, 
  isAd = false 
}: BusinessCardHeaderProps) => {
  return (
    <div className="relative aspect-video w-full">
      <img 
        src={image} 
        alt={name} 
        className="object-cover w-full h-full" 
      />
      <Badge className="absolute top-3 left-3 business-gradient border-0 text-white">
        {category}
      </Badge>
      {featured && (
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            Featured
          </Badge>
        </div>
      )}
      {isAd && (
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-brand-purple/10 text-brand-purple border-brand-purple/30 backdrop-blur-sm flex items-center gap-1">
            <Megaphone size={12} />
            Sponsored
          </Badge>
        </div>
      )}
    </div>
  );
};

export default BusinessCardHeader;
