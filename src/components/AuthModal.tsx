
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Mail, LockKeyhole, UserRound, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'business'>('user');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const { toast } = useToast();
  const { login, register, socialLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      onOpenChange(false);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setIsLoading(true);
    
    // Password validation
    if (registerPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      await register(registerName, registerEmail, registerPassword, role);
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    // In a real app, this would use the actual SDK for Google/Facebook
    // For this prototype, we'll simulate a successful login
    
    try {
      setIsLoading(true);
      
      // Simulate social login data
      const userData = {
        name: provider === 'google' ? 'Google User' : 'Facebook User',
        email: provider === 'google' ? 'user@gmail.com' : 'user@facebook.com',
        avatar: `https://ui-avatars.com/api/?name=${provider}+User&background=random`
      };
      
      await socialLogin(provider, userData);
      
      toast({
        title: "Social login successful",
        description: `You have logged in with ${provider}.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Social login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to CauseConnect</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to get started.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <div className="space-y-4 mt-4">
              <div className="flex flex-col space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border border-muted" 
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border border-muted text-blue-600" 
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                >
                  <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                  Continue with Facebook
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email address" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a 
                      href="#" 
                      className="text-xs text-primary hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Your password"

                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full cause-gradient border-0" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="Your email address" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="Create a password (min. 6 characters)" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-destructive text-sm">{passwordError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Account Type</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="user-role"
                      name="role"
                      value="user"
                      checked={role === 'user'}
                      onChange={() => setRole('user')}
                      className="mr-2"
                    />
                    <Label htmlFor="user-role">Individual</Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="business-role"
                      name="role"
                      value="business"
                      checked={role === 'business'}
                      onChange={() => setRole('business')}
                      className="mr-2"
                    />
                    <Label htmlFor="business-role">Business</Label>
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full cause-gradient border-0" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
