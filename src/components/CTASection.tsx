import { ArrowRight, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-teal opacity-10 -z-10" />
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-border">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Make a Difference?</h2>
              <p className="text-muted-foreground mb-6">
                Whether you want to create a new cause or promote your business, 
                our platform gives you the tools to connect with a community that cares.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="cause-gradient border-0 text-white flex items-center" asChild>
                  <Link to="/campaigns/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create a Cause
                  </Link>
                </Button>
                <Button variant="outline" className="border-brand-orange/30 text-brand-orange hover:text-brand-orange/80 hover:bg-brand-orange/5" asChild>
                  <Link to="/business/promote">
                    Add Your Business
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * All new campaigns require admin approval before they go live on the platform
              </p>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-blue/10 to-brand-teal/10 transform rotate-3 scale-105" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 transform -rotate-3 scale-105" />
                <div className="relative bg-white rounded-xl p-6 border border-border">
                  <div className="space-y-4">
                    <div className="w-full h-40 bg-gradient-to-r from-muted/50 to-muted/80 rounded-md animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded-md w-3/4 animate-pulse" />
                      <div className="h-4 bg-muted rounded-md w-1/2 animate-pulse" />
                      <div className="h-4 bg-muted rounded-md w-5/6 animate-pulse" />
                    </div>
                    <div className="pt-2 flex justify-between">
                      <div className="h-9 bg-primary/30 rounded-md w-1/3 animate-pulse" />
                      <div className="h-9 bg-muted rounded-md w-1/4 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
