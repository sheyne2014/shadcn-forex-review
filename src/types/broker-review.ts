// Helper types (can be kept or adjusted if needed by the new flat structure)
export interface RegulatorInfo {
  name: string;
  licenseNumber?: string;
  country: string;
}

export interface AccountType {
  name: string;
  minDeposit: number;
  // Add other relevant fields
}

export interface FeeStructure {
  tradingFees: string;
  nonTradingFees: string;
}

export interface LeverageInfo {
  maxRetail: string;
  maxProfessional?: string;
}

export interface PlatformInfo {
  name: string;
  type: string;
}

export interface MobileAppReview {
  availability: string;
  features: string[];
  rating?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Redefined DetailedBrokerReview to match the flat structure produced by ReviewContentGenerator
export interface DetailedBrokerReview {
  id: string;
  broker_id: string;
  created_at: string;
  updated_at: string;
  last_major_update: string;
  slug: string | null;
  is_published: boolean;
  content_version: number;

  // Content fields
  executive_summary: string | null;
  company_background: string | null;
  regulation_and_licensing: string | null;
  account_types_and_features: string | null;
  trading_platforms: string | null;
  fees_and_spreads: string | null;
  customer_support: string | null;
  education_and_research: string | null;
  pros: string[] | null;
  cons: string[] | null;

  // Unique insights
  unique_selling_points: string | null;
  comparison_with_competitors: string | null;
  hidden_fees_analysis: string | null;

  // Ratings
  rating_overall: number | null;
  rating_trust_score: number | null;
  rating_customer_service: number | null;
  rating_ease_of_use: number | null;
  rating_fees: number | null;
  rating_platforms_and_tools: number | null;
  rating_research_and_education: number | null;
  rating_tradable_assets: number | null;

  // Meta
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null; // Or string | null if it's a single string

  // Other common fields
  faq: FAQ[] | null; // Using existing FAQ type
  awards_and_recognition: string[] | null;
  author_id: string | null; // Assuming string ID
  editor_id: string | null; // Assuming string ID
  target_audience: string | null;
  user_feedback_summary: string | null;
  alternative_brokers: string[] | null; // Assuming array of broker names or IDs
  key_takeaways: string[] | null;

  // Summaries
  trading_conditions_summary: string | null;
  security_measures_summary: string | null;

  // Details
  supported_languages: string[] | null;
  supported_countries: string[] | null;
  deposit_methods: string[] | null;
  withdrawal_methods: string[] | null;
  minimum_deposit: number | null;
  maximum_leverage: string | null; // e.g., "1:500" or number

  social_media_links: Record<string, string> | null; // e.g., { twitter: "url", facebook: "url" }
  contact_information: Record<string, string> | null; // e.g., { phone: "...", email: "..." }
  office_locations: string[] | null; // Or a more complex object array
  regulatory_body_details: RegulatorInfo[] | null; // Using existing RegulatorInfo

  // Legal & Disclaimers
  risk_warning: string | null;
  disclaimer: string | null;
  affiliate_links: Record<string, string> | null;

  // Related Content
  related_articles: string[] | null; // URLs or slugs
  review_methodology: string | null;
  glossary_terms: string[] | null; // Or Record<string, string> for term:definition

  // External Review Scores
  trustpilot_score: number | null;
  trustpilot_reviews_count: number | null;
  forexpeacearmy_score: number | null;
  forexpeacearmy_reviews_count: number | null;
  other_review_sites_scores: Record<string, { score: number; count: number }> | null;

  // Community & Innovation
  community_engagement_level: string | null; // e.g., "High", "Medium", "Low"
  innovation_initiatives: string[] | null;
  sustainability_efforts: string[] | null;

  // Compliance & Performance Metrics
  compliance_adherence_level: string | null;
  customer_complaints_ratio: number | null; // e.g., 0.05 (5%)
  customer_retention_rate: number | null; // e.g., 0.8 (80%)
  market_share_percentage: number | null;

  // Technology
  technology_stack_highlights: string[] | null;
  api_access_availability: boolean | null;
  mobile_app_ratings: Record<string, number> | null; // e.g., { ios: 4.5, android: 4.3 }
  desktop_platform_ratings: Record<string, number> | null;
  web_platform_ratings: Record<string, number> | null;

  // Trading Metrics
  trading_volume_daily_avg: number | null;
  number_of_active_traders: number | null;
  years_in_operation: number | null;
  parent_company_id: string | null;
  broker_type: string | null; // e.g., "ECN", "Market Maker"
  account_currency: string[] | null;
  commission_model: string | null;
  execution_model: string | null;

  // Asset & Tool Quality
  trading_instruments_categories: string[] | null;
  research_tools_quality: string | null; // e.g., "Excellent", "Good"
  educational_resources_quality: string | null;

  // Support Metrics
  customer_support_channels: string[] | null; // e.g., ["Live Chat", "Email", "Phone"]
  customer_support_response_time_avg: string | null; // e.g., "5 minutes"

  // Platform & Security Ratings
  platform_stability_rating: number | null;
  data_security_rating: number | null;
  regulatory_compliance_rating: number | null;
  fee_transparency_rating: number | null;
  overall_value_for_money_rating: number | null;
  user_experience_rating: number | null;

  // Suitability Ratings
  suitability_for_beginners_rating: number | null;
  suitability_for_professionals_rating: number | null;

  // Trading Features
  scalping_allowed: boolean | null;
  hedging_allowed: boolean | null;
  expert_advisors_allowed: boolean | null;
  copy_trading_available: boolean | null;
  social_trading_available: boolean | null;
  islamic_account_available: boolean | null;
  demo_account_available: boolean | null;

  // Programs & Protections
  referral_program_available: boolean | null;
  bonuses_and_promotions: string[] | null;
  negative_balance_protection: boolean | null;
  segregated_client_funds: boolean | null;
  investor_compensation_scheme: string | null; // Name or details

  // Audit & Compliance Contacts
  audit_firm: string | null;
  last_audit_date: string | null; // ISOString
  compliance_officer_contact: string | null;
  data_protection_officer_contact: string | null;

  // Plans & Policies
  crisis_management_plan_summary: string | null;
  business_continuity_plan_summary: string | null;
  third_party_integrations: string[] | null;
  white_label_solutions_offered: boolean | null;
  introducing_broker_program_offered: boolean | null;
  affiliate_program_details: string | null;

  // Media & Events
  media_mentions: string[] | null; // URLs or descriptions
  press_releases: string[] | null; // URLs or titles
  conference_participations: string[] | null;
  webinar_schedule: string[] | null; // URLs or descriptions
  seminar_schedule: string[] | null;

  // Contacts & HR
  public_relations_contact: string | null;
  investor_relations_contact: string | null;
  career_opportunities_link: string | null;
  employee_satisfaction_rating: number | null;

  // CSR & Governance
  corporate_social_responsibility_initiatives: string[] | null;
  environmental_social_governance_score: number | null;
  diversity_and_inclusion_initiatives: string[] | null;
  charitable_contributions: string[] | null;
  political_contributions: string[] | null;
  lobbying_activities_summary: string | null;
  legal_proceedings_summary: string | null;
  insurance_coverage_details: string | null;

  // Liquidity & Execution
  liquidity_providers: string[] | null;
  prime_brokerage_services: boolean | null;
  order_execution_speed_avg_ms: number | null;
  slippage_statistics: Record<string, number> | null; // e.g., { positive: 0.1, negative: 0.05 }
  server_locations: string[] | null;
  uptime_percentage: number | null;
  latency_to_major_financial_hubs_ms: Record<string, number> | null; // e.g., { london: 20, newyork: 70 }

  // API & Data
  trading_api_details: string | null; // e.g., "REST, WebSocket"
  historical_data_access: boolean | null;
  market_data_feed_provider: string | null;
  research_reports_frequency: string | null; // e.g., "Daily", "Weekly"
  trading_signals_provider: string | null;
  economic_calendar_provider: string | null;
  news_feed_provider: string | null;

  // Security & Privacy (Detailed)
  customer_verification_process_summary: string | null;
  aml_kyc_compliance_details: string | null;
  two_factor_authentication_enabled: boolean | null;
  encryption_methods_used: string | null;
  data_breach_history: string[] | null;
  penetration_test_results_summary: string | null;
  bug_bounty_program_details: string | null;
  security_incident_response_plan_summary: string | null;
  user_data_privacy_policy_summary: string | null;
  cookie_policy_summary: string | null;
  terms_and_conditions_summary: string | null;
  risk_disclosure_statement_summary: string | null;

  // Transparency
  order_book_transparency_level: string | null;
  pre_trade_transparency_details: string | null;
  post_trade_transparency_details: string | null;
  market_making_practices_disclosure: string | null;
  conflict_of_interest_policy_summary: string | null;
  best_execution_policy_summary: string | null;

  // Client Handling
  complaint_handling_procedure_summary: string | null;
  dispute_resolution_mechanism_summary: string | null;
  client_categorization_policy_summary: string | null;
  appropriateness_test_summary: string | null;
  suitability_test_summary: string | null;
  professional_client_requirements: string | null;
  eligible_counterparty_requirements: string | null;
  retail_client_protections: string[] | null;

  // Marketing & Business Conduct
  marketing_and_advertising_guidelines_summary: string | null;
  cross_border_business_policy_summary: string | null;
  outsourcing_arrangements_summary: string | null;

  // Audit & Financials (Detailed)
  record_keeping_policy_summary: string | null;
  internal_audit_process_summary: string | null;
  external_audit_process_summary: string | null;
  remuneration_policy_summary: string | null;
  capital_adequacy_ratio: number | null;
  liquidity_coverage_ratio: number | null;
  net_stable_funding_ratio: number | null;
  leverage_ratio: number | null;
  financial_statements_link: string | null;
  shareholder_information: string | null; // Or a more complex object

  // Governance (Detailed)
  voting_rights_policy_summary: string | null;
  insider_trading_policy_summary: string | null;
  anti_bribery_and_corruption_policy_summary: string | null;
  whistleblower_policy_summary: string | null;
  code_of_conduct_summary: string | null;

  // Employee & Workplace
  training_and_development_programs_summary: string | null;
  employee_benefits_summary: string | null;
  work_life_balance_initiatives: string[] | null;

  // Community & Environment (Detailed)
  community_investment_programs: string[] | null;
  environmental_impact_reduction_efforts: string[] | null;
  supply_chain_ethics_policy_summary: string | null;

  // Data Privacy (GDPR/CCPA etc.)
  customer_data_portability_policy_summary: string | null;
  right_to_be_forgotten_policy_summary: string | null;
  data_retention_policy_summary: string | null;
  subprocessor_list: string[] | null;
  gdpr_compliance_statement_link: string | null;
  ccpa_compliance_statement_link: string | null;
  other_privacy_regulations_compliance_summary: string | null;

  // Accessibility
  accessibility_statement_link: string | null;
  wcag_compliance_level: string | null; // e.g., "AA", "AAA"
  mobile_app_accessibility_features: string[] | null;
  platform_accessibility_features: string[] | null;
  assistive_technology_compatibility: string | null;
  feedback_mechanism_for_accessibility_issues: string | null;
  accessibility_audit_results_summary: string | null;
  future_accessibility_enhancements_plan: string | null;
}