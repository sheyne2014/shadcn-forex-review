export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content: string | null
          id: string
          published_at: string | null
          title: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          id?: string
          published_at?: string | null
          title: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          id?: string
          published_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: true
            referencedRelation: "blog_posts"
            referencedColumns: ["author_id"]
          },
        ]
      }
      broker_categories: {
        Row: {
          broker_id: string
          category_id: string
        }
        Insert: {
          broker_id?: string
          category_id?: string
        }
        Update: {
          broker_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "broker_categories_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: true
            referencedRelation: "broker_categories"
            referencedColumns: ["broker_id"]
          },
          {
            foreignKeyName: "broker_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: true
            referencedRelation: "broker_categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      brokers: {
        Row: {
          // Basic Information
          id: string
          name: string
          slug: string | null
          logo_url: string | null
          website_url: string | null
          description: string | null
          short_description: string | null

          // Basic Trading Information
          min_deposit: number | null
          min_deposit_usd: number | null
          trading_fee: number | null
          max_leverage: number | null

          // Detailed Spread Information
          spreads_eur_usd: number | null
          spreads_gbp_usd: number | null
          spreads_usd_jpy: number | null
          spreads_from: string | null
          commission_per_lot: number | null

          // Regulation & Safety
          regulations: string | null
          primary_regulator: string | null
          secondary_regulators: string[] | null
          license_number: string | null
          segregated_accounts: boolean | null
          insurance_coverage: number | null

          // Platform Details
          trading_platforms: string | null
          platform_names: string[] | null
          mobile_app_rating: number | null
          demo_account_available: boolean | null
          api_access: boolean | null
          social_trading: boolean | null

          // Account Information
          account_currencies: string | null
          account_types: Json | null
          supported_assets: string[] | null

          // Customer Service
          support_languages: string[] | null
          support_hours: string | null
          live_chat_available: boolean | null
          phone_support_available: boolean | null

          // Educational Resources
          educational_content_quality: number | null
          webinars_available: boolean | null
          trading_signals: boolean | null
          market_research: boolean | null

          // Ratings & Scores
          rating: number | null
          overall_rating: number | null
          expert_score: number | null
          user_experience_score: number | null
          value_for_money_score: number | null

          // Unique Features & Analysis
          unique_selling_points: string[] | null
          pros: string[] | null
          cons: string[] | null

          // Company Information
          country: string | null
          headquarters: string | null
          year_founded: string | null
          founded_year: number | null

          // Content & SEO
          meta_title: string | null
          meta_description: string | null
          featured_image_url: string | null

          // Review & Analysis Meta
          last_reviewed_date: string | null
          review_methodology_version: number | null
          is_featured: boolean | null
          is_trusted: boolean | null
          is_regulated: boolean | null

          // Legacy fields
          min_trade_size: string | null
          regulation: string | null
          badge: string | null

          // Timestamps
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          // Basic Information
          id?: string
          name: string
          slug?: string | null
          logo_url?: string | null
          website_url?: string | null
          description?: string | null
          short_description?: string | null

          // Basic Trading Information
          min_deposit?: number | null
          min_deposit_usd?: number | null
          trading_fee?: number | null
          max_leverage?: number | null

          // Detailed Spread Information
          spreads_eur_usd?: number | null
          spreads_gbp_usd?: number | null
          spreads_usd_jpy?: number | null
          spreads_from?: string | null
          commission_per_lot?: number | null

          // Regulation & Safety
          regulations?: string | null
          primary_regulator?: string | null
          secondary_regulators?: string[] | null
          license_number?: string | null
          segregated_accounts?: boolean | null
          insurance_coverage?: number | null

          // Platform Details
          trading_platforms?: string | null
          platform_names?: string[] | null
          mobile_app_rating?: number | null
          demo_account_available?: boolean | null
          api_access?: boolean | null
          social_trading?: boolean | null

          // Account Information
          account_currencies?: string | null
          account_types?: Json | null
          supported_assets?: string[] | null

          // Customer Service
          support_languages?: string[] | null
          support_hours?: string | null
          live_chat_available?: boolean | null
          phone_support_available?: boolean | null

          // Educational Resources
          educational_content_quality?: number | null
          webinars_available?: boolean | null
          trading_signals?: boolean | null
          market_research?: boolean | null

          // Ratings & Scores
          rating?: number | null
          overall_rating?: number | null
          expert_score?: number | null
          user_experience_score?: number | null
          value_for_money_score?: number | null

          // Unique Features & Analysis
          unique_selling_points?: string[] | null
          pros?: string[] | null
          cons?: string[] | null

          // Company Information
          country?: string | null
          headquarters?: string | null
          year_founded?: string | null
          founded_year?: number | null

          // Content & SEO
          meta_title?: string | null
          meta_description?: string | null
          featured_image_url?: string | null

          // Review & Analysis Meta
          last_reviewed_date?: string | null
          review_methodology_version?: number | null
          is_featured?: boolean | null
          is_trusted?: boolean | null
          is_regulated?: boolean | null

          // Legacy fields
          min_trade_size?: string | null
          regulation?: string | null
          badge?: string | null

          // Timestamps
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          // Basic Information
          id?: string
          name?: string
          slug?: string | null
          logo_url?: string | null
          website_url?: string | null
          description?: string | null
          short_description?: string | null

          // Basic Trading Information
          min_deposit?: number | null
          min_deposit_usd?: number | null
          trading_fee?: number | null
          max_leverage?: number | null

          // Detailed Spread Information
          spreads_eur_usd?: number | null
          spreads_gbp_usd?: number | null
          spreads_usd_jpy?: number | null
          spreads_from?: string | null
          commission_per_lot?: number | null

          // Regulation & Safety
          regulations?: string | null
          primary_regulator?: string | null
          secondary_regulators?: string[] | null
          license_number?: string | null
          segregated_accounts?: boolean | null
          insurance_coverage?: number | null

          // Platform Details
          trading_platforms?: string | null
          platform_names?: string[] | null
          mobile_app_rating?: number | null
          demo_account_available?: boolean | null
          api_access?: boolean | null
          social_trading?: boolean | null

          // Account Information
          account_currencies?: string | null
          account_types?: Json | null
          supported_assets?: string[] | null

          // Customer Service
          support_languages?: string[] | null
          support_hours?: string | null
          live_chat_available?: boolean | null
          phone_support_available?: boolean | null

          // Educational Resources
          educational_content_quality?: number | null
          webinars_available?: boolean | null
          trading_signals?: boolean | null
          market_research?: boolean | null

          // Ratings & Scores
          rating?: number | null
          overall_rating?: number | null
          expert_score?: number | null
          user_experience_score?: number | null
          value_for_money_score?: number | null

          // Unique Features & Analysis
          unique_selling_points?: string[] | null
          pros?: string[] | null
          cons?: string[] | null

          // Company Information
          country?: string | null
          headquarters?: string | null
          year_founded?: string | null
          founded_year?: number | null

          // Content & SEO
          meta_title?: string | null
          meta_description?: string | null
          featured_image_url?: string | null

          // Review & Analysis Meta
          last_reviewed_date?: string | null
          review_methodology_version?: number | null
          is_featured?: boolean | null
          is_trusted?: boolean | null
          is_regulated?: boolean | null

          // Legacy fields
          min_trade_size?: string | null
          regulation?: string | null
          badge?: string | null

          // Timestamps
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      Brokers: {
        Row: {
          country: string | null
          created_at: string | null
          id: string
          min_deposit: number | null
          name: string
          rating: number | null
          regulations: string | null
          supported_assets: string | null
          trading_fee: number | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          id?: string
          min_deposit?: number | null
          name: string
          rating?: number | null
          regulations?: string | null
          supported_assets?: string | null
          trading_fee?: number | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          id?: string
          min_deposit?: number | null
          name?: string
          rating?: number | null
          regulations?: string | null
          supported_assets?: string | null
          trading_fee?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          broker_id: string
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          broker_id?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          broker_id?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          description: string | null
          id: string
          name: string
          url: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          url?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          url?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_admin: boolean | null
          password_hash: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_admin?: boolean | null
          password_hash?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_admin?: boolean | null
          password_hash?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
