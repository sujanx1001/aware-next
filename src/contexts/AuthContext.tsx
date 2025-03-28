
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '@/services/authService';
import { User } from '@/lib/db';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isBusiness: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, role?: 'user' | 'business') => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Load user from localStorage on initial mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setUser(user);
    return user;
  };
  
  const register = async (name: string, email: string, role: 'user' | 'business' = 'user') => {
    const user = await authService.register(name, email, role);
    setUser(user);
    return user;
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
