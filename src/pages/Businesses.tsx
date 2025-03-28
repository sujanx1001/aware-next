
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, MapPin, Search, SlidersHorizontal } from 'lucide-react';

const Businesses = () => {
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
    },
    {
      id: 5,
      name: "Artisan Coffee Roasters",
      description: "Small-batch coffee roastery with ethically sourced beans and sustainable packaging.",
      image: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      category: "Food & Beverage",
      location: "Adelaide",
      rating: 4.6,
      featured: false
    },
    {
      id: 6,
      name: "Sustainable Crafts",
      description: "Handmade crafts using recycled materials, supporting local artisans and sustainable practices.",
      image: "https://images.unsplash.com/photo-1547844149-792aea87164d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Crafts & Art",
      location: "Melbourne",
      rating: 4.3,
      featured: false
    },
    {
      id: 7,
      name: "Eco Cleaning Services",
      description: "Professional cleaning services using eco-friendly products and sustainable methods.",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80",
      category: "Services",
      location: "Sydney",
      rating: 4.7,
      featured: false
    },
    {
      id: 8,
      name: "Community Fitness Center",
      description: "Inclusive fitness center with programs for all ages and abilities, focusing on community health.",
      image: "https://images.unsplash.com/photo-1561214078-f3247647fc5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Health & Fitness",
      location: "Brisbane",
      rating: 4.4,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Small Businesses</h1>
              <p className="text-muted-foreground">
                Support local businesses that are making a positive impact in their communities while providing quality products and services.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-10">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for businesses..."
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="all-locations">
                    <SelectTrigger className="min-w-[150px]">
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Location" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All Locations</SelectItem>
                      <SelectItem value="melbourne">Melbourne</SelectItem>
                      <SelectItem value="sydney">Sydney</SelectItem>
                      <SelectItem value="brisbane">Brisbane</SelectItem>
                      <SelectItem value="perth">Perth</SelectItem>
                      <SelectItem value="adelaide">Adelaide</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-categories">
                    <SelectTrigger className="min-w-[150px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-categories">All Categories</SelectItem>
                      <SelectItem value="food">Food & Agriculture</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="health">Health & Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          
          <div className="flex justify-center mt-10">
            <Button variant="outline" className="mx-2">Previous</Button>
            <Button variant="outline" className="mx-2 bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
            <Button variant="outline" className="mx-2">2</Button>
            <Button variant="outline" className="mx-2">3</Button>
            <Button variant="outline" className="mx-2">Next</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Businesses;
