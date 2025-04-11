
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { Loader, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  goal: z.coerce.number().positive("Goal must be a positive number"),
  imageUrl: z.string().url("Please enter a valid image URL").or(z.literal(""))
});

type FormValues = z.infer<typeof formSchema>;

const CampaignCreate = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      goal: 1000,
      imageUrl: ""
    }
  });
  
  const onSubmit = async (values: FormValues) => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a campaign",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload the image to a storage service
      // For this prototype, we'll use the provided URL directly
      const imageUrl = values.imageUrl || "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      
      const newCampaign = {
        id: uuidv4(),
        title: values.title,
        description: values.description,
        imageUrl: imageUrl,
        organizer: user?.name || "Anonymous",
        goal: values.goal,
        raised: 0,
        supporters: 0,
        approved: false, // Requires admin approval
        createdAt: new Date().toISOString(),
        category: values.category
      };
      
      // Add to database
      await db.read();
      db.data!.causes.push(newCampaign);
      await db.write();
      
      toast({
        title: "Campaign submitted",
        description: "Your campaign has been submitted for approval",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Failed to create campaign",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                You need to sign in to create a campaign.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button className="hero-gradient border-0 text-white" onClick={() => navigate("/")}>
                Back to Home
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create a Campaign</h1>
            <p className="text-muted-foreground">
              Share your cause with the world and gather support from like-minded individuals.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Give your campaign a clear, attention-grabbing title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your campaign, its goals, and why people should support it" 
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Animals">Animals</SelectItem>
                          <SelectItem value="Food & Hunger">Food & Hunger</SelectItem>
                          <SelectItem value="Community">Community</SelectItem>
                          <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal (Supporters)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Image URL</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Enter the URL of an image that represents your campaign" {...field} />
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave blank to use a default image. For best results, use a high-quality horizontal image.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="cause-gradient border-0 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Campaign"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-12 border-t pt-6">
            <h3 className="text-lg font-medium mb-2">What happens next?</h3>
            <p className="text-muted-foreground">
              Once submitted, your campaign will be reviewed by our administrators. 
              This process typically takes 1-2 business days. After approval, your 
              campaign will be visible to all users on our platform.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CampaignCreate;
