
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, PlusCircle, ListChecks } from 'lucide-react';
import CauseCard from '@/components/CauseCard';
import BusinessCard from '@/components/BusinessCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("active-campaigns");
  
  // Sample data - in a real app, these would come from an API
  const activeCampaigns = [
    {
      id: 1,
      title: "Local Park Cleanup",
      description: "We're organizing a community cleanup of Wilson Park on Saturday. Join us to help make our neighborhood greener!",
      image: "https://images.unsplash.com/photo-1571315584206-f07389cb7076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Environment",
      supporters: 36,
      target: 50,
      current: 36,
      featured: false
    },
    {
      id: 2,
      title: "Community Book Drive",
      description: "Collecting books for the local library and schools. Please donate your gently used books to support literacy!",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Education",
      supporters: 24,
      target: 100,
      current: 68,
      featured: false
    }
  ];
  
  const savedCampaigns = [
    {
      id: 3,
      title: "City Marathon for Charity",
      description: "Annual marathon raising funds for children's hospitals. Register as a runner or donate to support.",
      image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Health",
      supporters: 348,
      target: 5000,
      current: 3850,
      featured: true
    }
  ];
  
  const businessAds = [
    {
      id: 1,
      name: "Green Earth Cafe",
      description: "Organic, locally-sourced food and beverages. Sustainable practices and eco-friendly packaging.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Food & Beverage",
      location: "123 Main St, Cityville",
      rating: 4.8,
      featured: true
    }
  ];
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You need to sign in to view your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button className="hero-gradient border-0 text-white" asChild>
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">Manage your campaigns and business promotions.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button className="cause-gradient border-0 text-white" asChild>
              <Link to="/campaigns/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Campaign
              </Link>
            </Button>
            {user.role === 'business' && (
              <Button className="business-gradient border-0 text-white" asChild>
                <Link to="/business/promote">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Business
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="active-campaigns" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Active Campaigns
            </TabsTrigger>
            <TabsTrigger value="saved-campaigns" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Saved Campaigns
            </TabsTrigger>
            <TabsTrigger value="business-ads" className="flex items-center gap-2" disabled={user.role !== 'business'}>
              <PlusCircle className="h-4 w-4" />
              Business Promotions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active-campaigns">
            {activeCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeCampaigns.map((campaign) => (
                  <CauseCard
                    key={campaign.id}
                    title={campaign.title}
                    description={campaign.description}
                    image={campaign.image}
                    category={campaign.category}
                    supporters={campaign.supporters}
                    target={campaign.target}
                    current={campaign.current}
                    featured={campaign.featured}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Active Campaigns</CardTitle>
                  <CardDescription>
                    You haven't created or joined any campaigns yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to="/campaigns/create">
                      Create Your First Campaign
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="saved-campaigns">
            {savedCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savedCampaigns.map((campaign) => (
                  <CauseCard
                    key={campaign.id}
                    title={campaign.title}
                    description={campaign.description}
                    image={campaign.image}
                    category={campaign.category}
                    supporters={campaign.supporters}
                    target={campaign.target}
                    current={campaign.current}
                    featured={campaign.featured}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Saved Campaigns</CardTitle>
                  <CardDescription>
                    You haven't saved any campaigns for later.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to="/causes">
                      Browse Campaigns
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="business-ads">
            {user.role === 'business' ? (
              businessAds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {businessAds.map((business) => (
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
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Business Promotions</CardTitle>
                    <CardDescription>
                      You haven't added any business promotions yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link to="/business/promote">
                        Add Your Business
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Not Available</CardTitle>
                  <CardDescription>
                    This feature is only available for business accounts.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
