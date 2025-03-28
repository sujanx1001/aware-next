
import { db, User, getUserByEmail } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// Simple authentication service
export const authService = {
  async login(email: string, password: string) {
    // In a real app, you would validate the password here
    // For this prototype, we'll just check if the user exists
    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Store user info in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },
  
  async register(name: string, email: string, role: 'user' | 'business' = 'user') {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      role,
      createdAt: new Date().toISOString()
    };
    
    // Add user to database
    await db.read();
    db.data!.users.push(newUser);
    await db.write();
    
    // Store user info in localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  },
  
  logout() {
    localStorage.removeItem('currentUser');
  },
  
  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    return JSON.parse(userJson) as User;
  },
  
  isLoggedIn() {
    return !!this.getCurrentUser();
  },
  
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },
  
  isBusiness() {
    const user = this.getCurrentUser();
    return user?.role === 'business';
  }
};
