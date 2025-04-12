
import { Star, MapPin, ExternalLink, Share2, ThumbsUp, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BusinessCardProps {
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  rating: number;
  featured?: boolean;
  isAd?: boolean;
}

const BusinessCard = ({ 
  name, 
  description, 
  image, 
  category, 
  location, 
  rating, 
  featured = false,
  isAd = false
}: BusinessCardProps) => {
  
  // Generate stars based on rating
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-brand-orange text-brand-orange" : "text-gray-300"} 
      />
    );
  }
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'border-accent/30' : ''} ${isAd ? 'border-brand-purple/30' : ''}`}>
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
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <div className="flex">{stars}</div>
          <span className="ml-1">({rating.toFixed(1)})</span>
          <span className="mx-1">·</span>
          <MapPin size={14} />
          <span>{location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button size="sm" className="business-gradient border-0 text-white">
          Visit
          <ExternalLink size={14} className="ml-1" />
        </Button>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost">
            <ThumbsUp size={18} className="text-muted-foreground hover:text-primary" />
          </Button>
          <Button size="icon" variant="ghost">
            <Share2 size={18} className="text-muted-foreground" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
