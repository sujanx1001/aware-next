
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">About ACS Social Impact</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced Consulting Services is dedicated to raising awareness about social causes
              and providing a platform where small businesses can grow and thrive.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="rounded-full" aria-label="Facebook">
                <Facebook size={18} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full" aria-label="Twitter">
                <Twitter size={18} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full" aria-label="Instagram">
                <Instagram size={18} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full" aria-label="LinkedIn">
                <Linkedin size={18} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/causes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Causes
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-muted-foreground hover:text-foreground transition-colors">
                  Businesses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  123 Social Street, Melbourne, VIC, Australia
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  +61 3 1234 5678
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  info@acssocialimpact.com
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest causes, businesses, and social impact news.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="text-sm" 
              />
              <Button size="sm" className="hero-gradient border-0 text-white">
                Join
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground order-2 sm:order-1 mt-4 sm:mt-0">
            © {year} Advanced Consulting Services. All rights reserved.
          </p>
          <div className="flex gap-4 order-1 sm:order-2">
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
