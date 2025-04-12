
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import BusinessCardHeader from './business/BusinessCardHeader';
import BusinessInfo from './business/BusinessInfo';
import StarRating from './business/StarRating';
import CardActions from './business/CardActions';

interface BusinessCardProps {
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  rating: number;
  featured?: boolean;
  isAd?: boolean;
  phone?: string;
  hours?: string;
  website?: string;
}

const BusinessCard = ({ 
  name, 
  description, 
  image, 
  category, 
  location, 
  rating, 
  featured = false,
  isAd = false,
  phone = "(03) 1234 5678",
  hours = "Mon-Fri: 9am-5pm",
  website = "https://example.com"
}: BusinessCardProps) => {
  const { toast } = useToast();
  
  const handleShare = () => {
    toast({
      title: "Share this business",
      description: `Share ${name} with friends and family`,
    });
  };

  const handleVisit = () => {
    toast({
      title: "Visiting business website",
      description: `You're being redirected to ${name}'s website`,
    });
    window.open(website, "_blank", "noopener,noreferrer");
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'border-accent/30' : ''} ${isAd ? 'border-brand-purple/30' : ''}`}>
      <BusinessCardHeader 
        image={image}
        name={name}
        category={category}
        featured={featured}
        isAd={isAd}
      />
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 flex items-center justify-between">
          {name}
          <BusinessInfo phone={phone} hours={hours} />
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <StarRating rating={rating} />
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
        <Button 
          size="sm" 
          className="business-gradient border-0 text-white hover:opacity-90 transition-opacity"
          onClick={handleVisit}
        >
          Visit Website
          <ExternalLink size={14} className="ml-1" />
        </Button>
        <CardActions 
          name={name}
          onShare={handleShare}
        />
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
