
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
import { Loader, Image as ImageIcon, Building2, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(3, "Business name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(3, "Please enter your business location"),
  imageUrl: z.string().url("Please enter a valid image URL").or(z.literal(""))
});

type FormValues = z.infer<typeof formSchema>;

const BusinessPromote = () => {
  const { user, isLoggedIn, isBusiness } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      location: "",
      imageUrl: ""
    }
  });
  
  const onSubmit = async (values: FormValues) => {
    if (!isLoggedIn || !isBusiness) {
      toast({
        title: "Access denied",
        description: "Only business accounts can promote businesses",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload the image to a storage service
      // For this prototype, we'll use the provided URL directly
      const imageUrl = values.imageUrl || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      
      const newBusiness = {
        id: uuidv4(),
        name: values.name,
        description: values.description,
        imageUrl: imageUrl,
        owner: user?.name || "Anonymous",
        category: values.category,
        location: values.location,
        approved: false, // Requires admin approval
        createdAt: new Date().toISOString()
      };
      
      // Add to database
      await db.read();
      db.data!.businesses.push(newBusiness);
      await db.write();
      
      toast({
        title: "Business submitted",
        description: "Your business has been submitted for approval",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Failed to add business",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isLoggedIn || !isBusiness) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                Only registered business accounts can promote businesses.
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
            <h1 className="text-3xl font-bold">Promote Your Business</h1>
            <p className="text-muted-foreground">
              Showcase your business to a community that values social responsibility and local enterprises.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Enter your business name" {...field} />
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
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
                        placeholder="Describe your business, its values, and what makes it unique" 
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
                          <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                          <SelectItem value="Home & Design">Home & Design</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Fashion">Fashion</SelectItem>
                          <SelectItem value="Art & Crafts">Art & Crafts</SelectItem>
                          <SelectItem value="Professional Services">Professional Services</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input placeholder="City, State" {...field} />
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        </div>
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
                    <FormLabel>Business Image URL</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Enter the URL of an image that represents your business" {...field} />
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
                  className="business-gradient border-0 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Business"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-12 border-t pt-6">
            <h3 className="text-lg font-medium mb-2">What happens next?</h3>
            <p className="text-muted-foreground">
              Once submitted, your business will be reviewed by our administrators. 
              This process typically takes 1-2 business days. After approval, your 
              business will be featured on our platform, visible to all users interested 
              in supporting local businesses with social impact.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessPromote;
