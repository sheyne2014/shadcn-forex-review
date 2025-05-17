import { Database as DatabaseGenerated } from "@/types/supabase";

// Re-export the Database and Table types
export type Database = DatabaseGenerated;

// Define more specific types for our entities
export type Broker = Database["public"]["Tables"]["brokers"]["Row"];
export type BrokerInsert = Database["public"]["Tables"]["brokers"]["Insert"];
export type BrokerUpdate = Database["public"]["Tables"]["brokers"]["Update"];

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
export type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
export type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"];

export type Tool = Database["public"]["Tables"]["tools"]["Row"];
export type ToolInsert = Database["public"]["Tables"]["tools"]["Insert"];
export type ToolUpdate = Database["public"]["Tables"]["tools"]["Update"];

export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
export type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"]; 