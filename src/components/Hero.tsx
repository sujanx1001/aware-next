
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-teal/10 -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Raise Awareness, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">Drive Change</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our platform to raise awareness, support social causes, and help small businesses thrive.
                Together, we can create the change we want to see in the world.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="hero-gradient border-0 text-white" asChild>
                <Link to="/campaigns/create">
                  Start Your Own
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/causes">
                  Join a Campaign
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[450px] w-full">
              <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-lg bg-gradient-to-r from-brand-blue/70 to-brand-teal/70 blur-3xl opacity-50" />
              <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-lg bg-gradient-to-r from-brand-purple/70 to-brand-orange/70 blur-3xl opacity-50" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
                  <div className="space-y-4 md:space-y-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg animate-pulse-slow">
                      <div className="h-64 bg-gradient-to-br from-brand-blue/20 to-brand-teal/20"></div>
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg animate-pulse-slow">
                      <div className="h-40 bg-gradient-to-br from-brand-orange/20 to-brand-purple/20"></div>
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 md:space-y-8 mt-10">
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg animate-pulse-slow">
                      <div className="h-40 bg-gradient-to-br from-brand-green/20 to-brand-teal/20"></div>
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg animate-pulse-slow">
                      <div className="h-64 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20"></div>
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block space-y-4 md:space-y-8 mt-20">
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg animate-pulse-slow">
                      <div className="h-64 bg-gradient-to-br from-brand-teal/20 to-brand-orange/20"></div>
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-white shadow-lg animate-pulse-slow">
                      <div className="h-40 bg-gradient-to-br from-brand-blue/20 to-brand-green/20"></div>
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
                      </div>
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

export default Hero;
