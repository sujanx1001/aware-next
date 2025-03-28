
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CauseCard from '@/components/CauseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';

const Causes = () => {
  // Sample data for causes
  const causes = [
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
      title: "Community Gardens Project",
      description: "Creating green spaces in urban areas to promote sustainable living and community bonding.",
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
      category: "Community",
      supporters: 423,
      target: 3000,
      current: 1200,
      featured: false
    },
    {
      id: 6,
      title: "Clean Energy Initiative",
      description: "Promoting renewable energy adoption and reducing carbon footprint in communities.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Environment",
      supporters: 789,
      target: 15000,
      current: 10200,
      featured: false
    },
    {
      id: 7,
      title: "Refugee Support Network",
      description: "Providing essential services and integration support for refugees in their new communities.",
      image: "https://images.unsplash.com/photo-1444664597500-035db93e2323?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      category: "Humanitarian",
      supporters: 512,
      target: 7000,
      current: 4300,
      featured: false
    },
    {
      id: 8,
      title: "Youth Entrepreneurship Program",
      description: "Empowering young people with business skills and mentorship to start their own ventures.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      category: "Education",
      supporters: 345,
      target: 6000,
      current: 2800,
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Social Causes</h1>
              <p className="text-muted-foreground">
                Discover and support initiatives that are working to create positive change in communities around the world.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-10">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for causes..."
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="min-w-[150px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="humanitarian">Humanitarian</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="food">Food & Hunger</SelectItem>
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
            {causes.map((cause) => (
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

export default Causes;
