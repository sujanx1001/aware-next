
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '@/services/authService';
import { User } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isBusiness: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role?: 'user' | 'business') => Promise<User>;
  socialLogin: (provider: 'google' | 'facebook', userData: { name: string, email: string, avatar?: string }) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load user from localStorage on initial mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setUser(user);
      return user;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string, role: 'user' | 'business' = 'user') => {
    try {
      const user = await authService.register(name, email, password, role);
      setUser(user);
      return user;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const socialLogin = async (provider: 'google' | 'facebook', userData: { name: string, email: string, avatar?: string }) => {
    try {
      const user = await authService.socialLogin(provider, userData);
      setUser(user);
      return user;
    } catch (error) {
      toast({
        title: `${provider} login failed`,
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        isBusiness: user?.role === 'business',
        login,
        register,
        socialLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
