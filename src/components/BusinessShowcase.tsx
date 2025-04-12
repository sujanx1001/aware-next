
import { ArrowRight, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BusinessCard from './BusinessCard';
import { Link } from 'react-router-dom';

const BusinessShowcase = () => {
  // Sample data for businesses
  const businesses = [
    {
      id: 1,
      name: "Green Earth Organics",
      description: "Local organic farm delivering fresh, sustainably grown produce. Support eco-friendly farming practices.",
      image: "https://images.unsplash.com/photo-1595351298020-7f1db2e68445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Food & Agriculture",
      location: "Melbourne",
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: "Eco Friendly Clothing",
      description: "Sustainable fashion using organic materials and ethical manufacturing processes.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Fashion",
      location: "Sydney",
      rating: 4.5,
      featured: true
    },
    {
      id: 3,
      name: "Tech For Good",
      description: "Technology solutions for nonprofits and social enterprises at affordable rates.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Technology",
      location: "Brisbane",
      rating: 4.7,
      featured: false
    },
    {
      id: 4,
      name: "Community Bookstore",
      description: "Independent bookstore offering diverse literature and community reading events.",
      image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      category: "Retail",
      location: "Perth",
      rating: 4.9,
      featured: false
    }
  ];

  // Sample data for advertisements
  const advertisements = [
    {
      id: 1,
      name: "Local Farm Collective",
      description: "Join our community of sustainable farmers! Weekly deliveries of fresh, seasonal produce grown with love.",
      image: "https://images.unsplash.com/photo-1615317779547-2f9b28150053?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Food & Agriculture",
      location: "Adelaide",
      rating: 4.6,
      isAd: true
    },
    {
      id: 2,
      name: "Artisan Craft Market",
      description: "Monthly market featuring local artisans and handmade goods. Support small businesses and find unique gifts!",
      image: "https://images.unsplash.com/photo-1607348585099-d0261ae7dc5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Art & Crafts",
      location: "Hobart",
      rating: 4.9,
      isAd: true
    },
    {
      id: 3,
      name: "Sustainable Energy Solutions",
      description: "Custom solar panel installations for homes and businesses. Make the switch to renewable energy today.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Technology",
      location: "Darwin",
      rating: 4.7,
      isAd: true
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Business Showcase</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover and support small businesses that are making a positive impact in their communities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <Link to="/business/promote">
                Add Your Business
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-brand-purple/30 text-brand-purple hover:bg-brand-purple/5" asChild>
              <Link to="/business/advertise">
                <Megaphone className="h-4 w-4" />
                Create Ad Campaign
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="businesses" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="ads">Ad Campaigns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="businesses" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  name={business.name}
                  description={business.description}
                  image={business.image}
                  category={business.category}
                  location={business.location}
                  rating={business.rating}
                  featured={business.featured}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ads" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertisements.map((ad) => (
                <BusinessCard
                  key={ad.id}
                  name={ad.name}
                  description={ad.description}
                  image={ad.image}
                  category={ad.category}
                  location={ad.location}
                  rating={ad.rating}
                  isAd={ad.isAd}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default BusinessShowcase;
