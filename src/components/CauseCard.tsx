
import { Heart, Share2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
        <Button size="sm" className="cause-gradient border-0 text-white">Support</Button>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost">
            <Heart size={18} className="text-muted-foreground hover:text-destructive" />
          </Button>
          <Button size="icon" variant="ghost">
            <Share2 size={18} className="text-muted-foreground" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CauseCard;
