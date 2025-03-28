
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, Users, Briefcase, Heart, LogIn, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="bg-primary text-white font-bold p-2 rounded-md">ACS</span>
          <span className="font-bold text-xl text-foreground hidden sm:inline">Social Impact</span>
        </Link>

        {!isMobile ? (
          <nav className="flex items-center space-x-6">
            <div className="flex space-x-6">
              <Link to="/" className="font-medium text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/causes" className="font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Heart size={16} />
                Causes
              </Link>
              <Link to="/businesses" className="font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Briefcase size={16} />
                Businesses
              </Link>
              <Link to="/about" className="font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Users size={16} />
                About Us
              </Link>
            </div>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User size={16} />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={openAuthModal} className="flex items-center gap-1" variant="default">
                <LogIn size={16} />
                Sign In
              </Button>
            )}
          </nav>
        ) : (
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="container mx-auto px-4 py-3 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="font-medium p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/causes" className="font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Heart size={18} />
              Causes
            </Link>
            <Link to="/businesses" className="font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Briefcase size={18} />
              Businesses
            </Link>
            <Link to="/about" className="font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Users size={18} />
              About Us
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="font-medium p-2 hover:bg-muted rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <User size={18} />
                  Profile
                </Link>
                <Button onClick={handleLogout} variant="destructive" className="w-full justify-center">
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={openAuthModal} className="w-full justify-center" variant="default">
                <LogIn size={18} className="mr-2" />
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}

      {/* Auth modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </header>
  );
};

export default Navbar;
