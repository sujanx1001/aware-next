
import { db, User, getUserByEmail } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// Simple authentication service
export const authService = {
  async login(email: string, password: string) {
    // Get user by email
    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Check password (in a real app, you'd use bcrypt to compare hashed passwords)
    if (user.password && user.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    // Store user info in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', `fake-jwt-token-${user.id}`); // Simple fake JWT token
    
    return user;
  },
  
  async register(name: string, email: string, password: string, role: 'user' | 'business' = 'user') {
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
      password,
      role,
      createdAt: new Date().toISOString()
    };
    
    // Add user to database
    await db.read();
    db.data!.users.push(newUser);
    await db.write();
    
    // Store user info in localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('authToken', `fake-jwt-token-${newUser.id}`); // Simple fake JWT token
    
    return newUser;
  },
  
  async socialLogin(provider: 'google' | 'facebook', userData: { name: string, email: string, avatar?: string }) {
    // Check if user already exists
    let user = await getUserByEmail(userData.email);
    
    if (!user) {
      // Create new user if not exists
      user = {
        id: uuidv4(),
        name: userData.name,
        email: userData.email,
        role: 'user',
        avatar: userData.avatar,
        socialProvider: provider,
        createdAt: new Date().toISOString()
      };
      
      // Add user to database
      await db.read();
      db.data!.users.push(user);
      await db.write();
    }
    
    // Store user info in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', `fake-jwt-token-${user.id}`);
    
    return user;
  },
  
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  },
  
  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    return JSON.parse(userJson) as User;
  },
  
  getToken() {
    return localStorage.getItem('authToken');
  },
  
  isLoggedIn() {
    return !!this.getCurrentUser() && !!this.getToken();
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
