
import { PhoneCall, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BusinessInfoProps {
  phone: string;
  hours: string;
}

const BusinessInfo = ({ phone, hours }: BusinessInfoProps) => {
  return (
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
  );
};

export default BusinessInfo;
