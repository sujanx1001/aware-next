
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BusinessCard from './BusinessCard';

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
          <Button variant="ghost" className="mt-4 md:mt-0 group">
            View All Businesses
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
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
      </div>
    </section>
  );
};

export default BusinessShowcase;
