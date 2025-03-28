
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Globe, Heart, Award, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Jane Smith",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      description: "Jane founded ACS with a vision to connect social causes with businesses that care."
    },
    {
      name: "Michael Chen",
      role: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      description: "Michael oversees all operations and ensures our platform runs efficiently."
    },
    {
      name: "Priya Sharma",
      role: "Head of Social Impact",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      description: "Priya works directly with causes to maximize their social impact and reach."
    },
    {
      name: "David Wilson",
      role: "Business Relations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      description: "David builds relationships with businesses looking to make a positive impact."
    }
  ];

  // Mission and values 
  const missionPoints = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Reach, Local Impact",
      description: "We connect social causes with supporters worldwide while making a difference in local communities."
    },
    {
      icon: <Heart className="h-8 w-8 text-destructive" />,
      title: "Passion for Change",
      description: "We believe in the power of passionate individuals to create meaningful societal change."
    },
    {
      icon: <Building className="h-8 w-8 text-accent" />,
      title: "Business for Good",
      description: "We empower businesses to contribute to social causes and improve their communities."
    },
    {
      icon: <Award className="h-8 w-8 text-secondary" />,
      title: "Transparency & Trust",
      description: "We maintain the highest standards of integrity in all our operations and partnerships."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  About <span className="text-transparent bg-clip-text hero-gradient">Team Social Impact</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Team Social Impact is dedicated to bridging the gap between social causes and businesses to create meaningful change in communities across Australia.
                </p>
                <div className="pt-4">
                  <Button asChild className="hero-gradient border-0 text-white">
                    <Link to="/causes">
                      Explore Our Causes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-teal/20 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                    alt="Team meeting" 
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to creating a platform that empowers individuals and businesses to make a positive impact on society.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {missionPoints.map((point, index) => (
                <div key={index} className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="mb-4">{point.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the passionate individuals behind ACS Social Impact who are dedicated to creating positive change.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-card shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card rounded-lg shadow-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Join Our Mission?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you're passionate about a cause, represent a business looking to make an impact, or want to collaborate with us, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="hero-gradient border-0 text-white">
                  <Link to="/causes">
                    Explore Causes
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/businesses">
                    Partner with Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
