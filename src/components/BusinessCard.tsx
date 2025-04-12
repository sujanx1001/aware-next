import { Star, MapPin, ExternalLink, Share2, ThumbsUp, Heart, Info, PhoneCall, Clock, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();
  
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

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? `${name} has been removed from your favorites` : `${name} has been added to your favorites`,
      variant: liked ? "default" : "default",
    });
  };

  const handleShare = () => {
    // In a real app, this would integrate with the Web Share API
    // or show a modal with sharing options
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
    // In a real app, this would open the website or track the click
    window.open(website, "_blank", "noopener,noreferrer");
  };
  
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
        <CardTitle className="line-clamp-1 flex items-center justify-between">
          {name}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info size={16} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1 p-1">
                  <div className="flex items-center gap-2">
                    <PhoneCall size={14} className="text-muted-foreground" />
                    <span className="text-xs">{phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground" />
                    <span className="text-xs">{hours}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
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
        <Button 
          size="sm" 
          className="business-gradient border-0 text-white hover:opacity-90 transition-opacity"
          onClick={handleVisit}
        >
          Visit Website
          <ExternalLink size={14} className="ml-1" />
        </Button>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={handleLike}
                  className={liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-primary"}
                >
                  {liked ? (
                    <Heart size={18} className="fill-current" />
                  ) : (
                    <ThumbsUp size={18} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{liked ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={handleShare}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Share2 size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this business</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
