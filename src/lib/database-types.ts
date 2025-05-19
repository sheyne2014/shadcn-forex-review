/**
 * Database Types
 * 
 * This file contains TypeScript interfaces for database models used throughout the application.
 */

import { Database as DatabaseGenerated } from "@/types/supabase";

// Re-export existing types from generated supabase types
export type Database = DatabaseGenerated;
export type Tables = Database["public"]["Tables"];

export type Broker = Tables["brokers"]["Row"];
export type BrokerInsert = Tables["brokers"]["Insert"];
export type BrokerUpdate = Tables["brokers"]["Update"];

export type User = Tables["users"]["Row"];
export type UserInsert = Tables["users"]["Insert"];
export type UserUpdate = Tables["users"]["Update"];

export type Category = Tables["categories"]["Row"];
export type CategoryInsert = Tables["categories"]["Insert"];
export type CategoryUpdate = Tables["categories"]["Update"];

export type Review = Tables["reviews"]["Row"];
export type ReviewInsert = Tables["reviews"]["Insert"];
export type ReviewUpdate = Tables["reviews"]["Update"];

export type BlogPost = Tables["blog_posts"]["Row"];
export type BlogPostInsert = Tables["blog_posts"]["Insert"];
export type BlogPostUpdate = Tables["blog_posts"]["Update"];

// Base type with common fields
export interface BaseModelSchema {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Broker entity
export interface BrokerSchema extends BaseModelSchema {
  name: string;
  slug: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  shortDescription?: string;
  
  // Ratings
  overallRating: number;
  userRating?: number;
  ratingCount?: number;
  
  // Key features
  minDeposit?: number;
  spreadFrom?: number;
  leverageMax?: number;
  
  // Attributes
  isRegulated: boolean;
  isTrusted: boolean;
  isFeatured?: boolean;
  
  // Category relations
  categoryIds: string[];
  categories?: CategorySchema[];
  
  // Features and specifications
  features: BrokerFeature[];
  platforms?: string[];
  paymentMethods?: string[];
  
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  
  // Additional fields
  pros?: string[];
  cons?: string[];
  foundedYear?: number;
  headquarters?: string;
  regulatoryBodies?: string[];
}

// Category entity
export interface CategorySchema extends BaseModelSchema {
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  
  // Relations
  brokerIds?: string[];
  brokers?: BrokerSchema[];
  
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  
  // Additional fields
  order?: number;
  featured?: boolean;
}

// Broker features
export interface BrokerFeature {
  name: string;
  value: string | number | boolean;
  category?: string;
}

// Review entity
export interface ReviewSchema extends BaseModelSchema {
  brokerId: string;
  broker?: BrokerSchema;
  
  userId: string;
  userName?: string;
  userAvatar?: string;
  
  title: string;
  comment: string;
  rating: number;
  
  isVerified?: boolean;
  isPinned?: boolean;
  isVisible?: boolean;
  
  tradingExperience?: string; // e.g. "Beginner", "Intermediate", "Expert"
  country?: string;
  upvotes?: number;
  downvotes?: number;
  
  response?: {
    text: string;
    authorName: string;
    role: string;
    createdAt: string;
  };
}

// User entity
export interface UserSchema extends BaseModelSchema {
  email: string;
  name?: string;
  avatar?: string;
  
  // Authentication
  isEmailVerified?: boolean;
  
  // Preferences
  favoriteIds?: string[]; // IDs of brokers marked as favorite
  
  // Reviews
  reviewIds?: string[];
  reviews?: ReviewSchema[];
  
  // Additional fields
  country?: string;
  experience?: string; // e.g. "Beginner", "Intermediate", "Expert"
  bio?: string;
}

// Comparison entity
export interface ComparisonSchema extends BaseModelSchema {
  slug: string;
  title: string;
  description?: string;
  
  brokerIds: string[];
  brokers?: BrokerSchema[];
  
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  
  // Additional fields
  viewCount?: number;
}

// Articles and Guides
export interface ArticleSchema extends BaseModelSchema {
  title: string;
  slug: string;
  content: string;
  summary?: string;
  
  // Author
  authorId: string;
  authorName?: string;
  authorAvatar?: string;
  
  // Categorization
  type: 'blog' | 'guide' | 'news'; // Article type
  categoryIds?: string[];
  tags?: string[];
  
  // Publishing
  publishedAt?: string;
  isPublished: boolean;
  
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  
  // Additional fields
  readingTimeMinutes?: number;
  viewCount?: number;
}

// FAQ entity
export interface FAQSchema extends BaseModelSchema {
  question: string;
  answer: string;
  
  // Categorization
  category?: string;
  tags?: string[];
  
  // Additional fields
  order?: number;
} 