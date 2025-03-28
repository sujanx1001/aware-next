
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Define data structure
export interface Cause {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  organizer: string;
  goal: number;
  raised: number;
  supporters: number;
  approved: boolean;
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  owner: string;
  category: string;
  location: string;
  approved: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'business' | 'admin';
  createdAt: string;
}

export interface Database {
  causes: Cause[];
  businesses: Business[];
  users: User[];
}

// Initialize data
const defaultData: Database = {
  causes: [
    {
      id: '1',
      title: 'Clean Ocean Initiative',
      description: 'Help us clean up plastics from our oceans and protect marine life.',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      organizer: 'Ocean Conservation Group',
      goal: 10000,
      raised: 6500,
      supporters: 142,
      approved: true,
      createdAt: '2023-04-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Forest Reforestation Project',
      description: 'Plant trees to restore forests and combat climate change.',
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      organizer: 'Green Earth Alliance',
      goal: 25000,
      raised: 12750,
      supporters: 89,
      approved: true,
      createdAt: '2023-05-10T08:15:00Z'
    },
    {
      id: '3',
      title: 'Educational Support for Rural Communities',
      description: 'Provide educational resources to children in rural communities.',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      organizer: 'Education For All',
      goal: 15000,
      raised: 8200,
      supporters: 113,
      approved: true,
      createdAt: '2023-06-05T14:45:00Z'
    }
  ],
  businesses: [
    {
      id: '1',
      name: 'Green Leaf Cafe',
      description: 'A sustainable cafe offering locally-sourced organic food and beverages.',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      owner: 'Sarah Johnson',
      category: 'Food & Beverage',
      location: 'Melbourne, VIC',
      approved: true,
      createdAt: '2023-03-20T09:00:00Z'
    },
    {
      id: '2',
      name: 'Eco Designs',
      description: 'Sustainable interior design services using recycled and eco-friendly materials.',
      imageUrl: 'https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      owner: 'Michael Chen',
      category: 'Home & Design',
      location: 'Sydney, NSW',
      approved: true,
      createdAt: '2023-04-12T11:30:00Z'
    },
    {
      id: '3',
      name: 'Mindful Yoga Studio',
      description: 'A community-focused yoga studio offering classes for all levels and abilities.',
      imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      owner: 'Priya Sharma',
      category: 'Health & Wellness',
      location: 'Brisbane, QLD',
      approved: true,
      createdAt: '2023-05-18T15:45:00Z'
    }
  ],
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@acs.com',
      role: 'admin',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: '2023-02-15T10:30:00Z'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah@greenleafcafe.com',
      role: 'business',
      createdAt: '2023-03-20T09:00:00Z'
    }
  ]
};

// Set up in-memory database for client-side use
class MemoryStorage {
  private data: string;

  constructor(defaultData: Database) {
    this.data = JSON.stringify(defaultData);
  }

  read() {
    return Promise.resolve(JSON.parse(this.data));
  }

  write(data: Database) {
    this.data = JSON.stringify(data);
    return Promise.resolve();
  }
}

// Create database instance
// The key fix: Pass the defaultData to the Low constructor instead of creating an adapter without it
const adapter = new MemoryStorage(defaultData);
export const db = new Low<Database>(adapter, defaultData);  // Added the defaultData as second parameter

// Database helper functions
export async function getCauses() {
  await db.read();
  return db.data?.causes || [];
}

export async function getCauseById(id: string) {
  await db.read();
  return db.data?.causes.find(cause => cause.id === id);
}

export async function getBusinesses() {
  await db.read();
  return db.data?.businesses || [];
}

export async function getBusinessById(id: string) {
  await db.read();
  return db.data?.businesses.find(business => business.id === id);
}

export async function getUsers() {
  await db.read();
  return db.data?.users || [];
}

export async function getUserById(id: string) {
  await db.read();
  return db.data?.users.find(user => user.id === id);
}

export async function getUserByEmail(email: string) {
  await db.read();
  return db.data?.users.find(user => user.email === email);
}

// Initialize the database
export async function initializeDb() {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }
  console.log("Database initialized with sample data");
}

// Call initialize when importing the module
initializeDb();
