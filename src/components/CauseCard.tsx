
import { useState } from 'react';
import { Heart, Share2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CauseCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  supporters: number;
  target?: number;
  current?: number;
  featured?: boolean;
}

const CauseCard = ({ 
  title, 
  description, 
  image, 
  category, 
  supporters, 
  target, 
  current, 
  featured = false 
}: CauseCardProps) => {
  const progress = target && current ? Math.min(100, (current / target) * 100) : null;
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  
  const handleSupport = () => {
    toast({
      title: "Support Registered",
      description: `You've successfully supported "${title}". Thank you!`,
    });
  };
  
  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked 
        ? `"${title}" has been removed from your favorites.` 
        : `"${title}" has been added to your favorites.`,
    });
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Support "${title}" on CauseConnect`,
          text: `Check out this cause: ${description}`,
          url: window.location.href,
        });
      } catch (error) {
        toast({
          title: "Sharing Failed",
          description: "Could not share this campaign. Try copying the link instead.",
          variant: "destructive",
        });
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Campaign link copied to clipboard. Share it with your friends!",
      });
    }
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'border-primary/30' : ''}`}>
      <div className="relative aspect-[16/9] w-full">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full" 
        />
        <Badge className="absolute top-3 left-3 cause-gradient border-0 text-white">
          {category}
        </Badge>
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <Users size={14} />
          <span>{supporters.toLocaleString()} supporters</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        {progress !== null && (
          <div className="mt-4 space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${current?.toLocaleString()}</span>
              <span>${target?.toLocaleString()}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button size="sm" className="cause-gradient border-0 text-white" onClick={handleSupport}>Support</Button>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={handleLike}>
                  <Heart 
                    size={18} 
                    className={liked ? "fill-destructive text-destructive" : "text-muted-foreground hover:text-destructive"} 
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{liked ? 'Remove from favorites' : 'Add to favorites'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={handleShare}>
                  <Share2 size={18} className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this campaign</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CauseCard;
