
import { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CauseCard from './CauseCard';
import { Badge } from '@/components/ui/badge';

const FeaturedCauses = () => {
  // Sample data for featured causes
  const allCauses = [
    {
      id: 1,
      title: "Clean Ocean Initiative",
      description: "Join our effort to remove plastic waste from oceans and protect marine wildlife. We organize beach cleanups and advocate for sustainable practices.",
      image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Environment",
      supporters: 1245,
      target: 10000,
      current: 7850,
      featured: true
    },
    {
      id: 2,
      title: "Education for All",
      description: "Help provide educational resources and opportunities for underprivileged children in rural areas.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80",
      category: "Education",
      supporters: 892,
      target: 5000,
      current: 3200,
      featured: true
    },
    {
      id: 3,
      title: "Food Security Program",
      description: "Support our mission to eliminate hunger and ensure access to nutritious food for vulnerable communities.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Food & Hunger",
      supporters: 678,
      target: 8000,
      current: 2500,
      featured: false
    },
    {
      id: 4,
      title: "Mental Health Awareness",
      description: "Breaking the stigma around mental health and providing resources for those in need of support.",
      image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Health",
      supporters: 1056,
      target: 12000,
      current: 9800,
      featured: false
    },
    {
      id: 5,
      title: "Animal Shelter Support",
      description: "Help us provide shelter, food and medical care to abandoned and rescued animals.",
      image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Animals",
      supporters: 722,
      target: 6000,
      current: 3400,
      featured: true
    }
  ];

  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get all unique categories
  const categories = Array.from(new Set(allCauses.map(cause => cause.category)));
  
  // Filter causes based on active category
  const filteredCauses = activeCategory 
    ? allCauses.filter(cause => cause.category === activeCategory)
    : allCauses;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Featured Campaigns</h2>
            <p className="text-muted-foreground max-w-2xl mb-4">
              Discover and support impactful social initiatives that are making a difference in our communities.
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 group" asChild>
            <Link to="/causes">
              View All Campaigns
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <span className="flex items-center text-sm font-medium mr-2">
            <Filter className="mr-1 h-4 w-4" /> Filter by:
          </span>
          <Badge 
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCauses.map((cause) => (
            <CauseCard
              key={cause.id}
              title={cause.title}
              description={cause.description}
              image={cause.image}
              category={cause.category}
              supporters={cause.supporters}
              target={cause.target}
              current={cause.current}
              featured={cause.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCauses;
