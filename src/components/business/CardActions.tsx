
import { ThumbsUp, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CardActionsProps {
  name: string;
  onShare: () => void;
}

const CardActions = ({ name, onShare }: CardActionsProps) => {
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? `${name} has been removed from your favorites` : `${name} has been added to your favorites`,
      variant: liked ? "default" : "default",
    });
  };

  return (
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
              onClick={onShare}
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
  );
};

export default CardActions;
