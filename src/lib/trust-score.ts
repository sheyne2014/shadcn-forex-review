/**
 * Trust Score calculation system
 * 
 * Calculates a broker's trustworthiness on a scale of 0-100 based on:
 * - Tier-1 regulatory licenses (up to 40 points)
 * - Years in business (up to 20 points)
 * - Company structure (public vs private) (up to 10 points)
 * - Client fund protection (up to 15 points)
 * - Transparency and disclosure (up to 15 points)
 */

import { BrokerDetails } from "@/lib/brokers";

// List of tier-1 regulators
export const TIER_1_REGULATORS = [
  "FCA", // UK Financial Conduct Authority
  "ASIC", // Australian Securities and Investments Commission
  "SEC", // US Securities and Exchange Commission
  "CFTC", // US Commodity Futures Trading Commission
  "BaFin", // German Federal Financial Supervisory Authority
  "MAS", // Monetary Authority of Singapore
  "FINMA", // Swiss Financial Market Supervisory Authority
  "JFSA", // Japan Financial Services Agency
  "IIROC", // Investment Industry Regulatory Organization of Canada
  "CIMA", // Cayman Islands Monetary Authority
];

// List of tier-2 regulators
export const TIER_2_REGULATORS = [
  "CySEC", // Cyprus Securities and Exchange Commission
  "FSC", // Financial Services Commission (BVI)
  "FSCA", // Financial Sector Conduct Authority (South Africa)
  "DFSA", // Dubai Financial Services Authority
  "FSRA", // Financial Services Regulatory Authority (Abu Dhabi)
  "CNMV", // Comisión Nacional del Mercado de Valores (Spain)
  "CONSOB", // Commissione Nazionale per le Società e la Borsa (Italy)
  "ESMA", // European Securities and Markets Authority
];

/**
 * Calculate trust score for a broker - detailed method
 * @param broker Broker details object
 * @returns Trust score (0-100)
 */
export function calculateBrokerTrustScore(broker: BrokerDetails): number {
  if (!broker) return 0;
  
  let score = 0;
  
  // 1. Calculate regulatory score (max 40 points)
  score += calculateRegulatoryScore(broker);
  
  // 2. Calculate years in business score (max 20 points)
  score += calculateYearsInBusinessScore(broker);
  
  // 3. Calculate company structure score (max 10 points)
  score += calculateCompanyStructureScore(broker);
  
  // 4. Calculate client fund protection score (max 15 points)
  score += calculateClientFundProtectionScore(broker);
  
  // 5. Calculate transparency score (max 15 points)
  score += calculateTransparencyScore(broker);
  
  // Ensure score is between 0 and 100
  return Math.min(Math.max(Math.round(score), 0), 100);
}

/**
 * Calculate regulatory score based on licenses
 * @param broker Broker details
 * @returns Score (0-40)
 */
function calculateRegulatoryScore(broker: BrokerDetails): number {
  if (!broker.regulations) return 0;
  
  const brokerRegs = broker.regulations.split(',').map(r => r.trim());
  
  // Count tier-1 regulators (8 points each, max 32 points)
  const tier1Count = TIER_1_REGULATORS.filter(reg => 
    brokerRegs.some(br => br.includes(reg))
  ).length;
  
  // Count tier-2 regulators (4 points each, max 16 points)
  const tier2Count = TIER_2_REGULATORS.filter(reg => 
    brokerRegs.some(br => br.includes(reg))
  ).length;
  
  // Calculate total regulatory score (max 40 points)
  const regulatoryScore = Math.min((tier1Count * 8) + (tier2Count * 4), 40);
  
  return regulatoryScore;
}

/**
 * Calculate score based on years in business
 * @param broker Broker details
 * @returns Score (0-20)
 */
function calculateYearsInBusinessScore(broker: BrokerDetails): number {
  if (!broker.year_founded) return 0;
  
  const currentYear = new Date().getFullYear();
  // Ensure year_founded is treated as a number
  const foundingYear = typeof broker.year_founded === 'string' 
    ? parseInt(broker.year_founded, 10) 
    : Number(broker.year_founded);
  
  // Guard against NaN
  if (isNaN(foundingYear)) return 0;
  
  const yearsInBusiness = currentYear - foundingYear;
  
  // Score calculation: 
  // 0-2 years: 5 points
  // 3-5 years: 10 points
  // 6-10 years: 15 points
  // 11+ years: 20 points
  if (yearsInBusiness < 0) return 0;
  if (yearsInBusiness <= 2) return 5;
  if (yearsInBusiness <= 5) return 10;
  if (yearsInBusiness <= 10) return 15;
  return 20;
}

/**
 * Calculate score based on company structure
 * @param broker Broker details
 * @returns Score (0-10)
 */
function calculateCompanyStructureScore(broker: BrokerDetails): number {
  // Publicly traded companies get full points
  if (broker.publicly_traded === true || 
      broker.publicly_traded === "yes" || 
      broker.publicly_traded === "Yes") {
    return 10;
  }
  
  // If part of a bank or large financial group, award partial points
  if (broker.parent_company && 
     (broker.parent_company.includes("Bank") || 
      broker.parent_company.includes("Financial"))) {
    return 7;
  }
  
  // Private companies get base points
  return 5;
}

/**
 * Calculate score based on client fund protection
 * @param broker Broker details
 * @returns Score (0-15)
 */
function calculateClientFundProtectionScore(broker: BrokerDetails): number {
  let score = 0;
  
  // Check for segregated client funds
  if (broker.segregated_accounts === true ||
      broker.segregated_accounts === "yes" ||
      broker.segregated_accounts === "Yes") {
    score += 7;
  }
  
  // Check for investor compensation scheme
  if (broker.investor_compensation || 
      (broker.regulations && 
       (broker.regulations.includes("FCA") || 
        broker.regulations.includes("CySEC")))) {
    score += 5;
  }
  
  // Check for negative balance protection
  if (broker.negative_balance_protection === true ||
      broker.negative_balance_protection === "yes" ||
      broker.negative_balance_protection === "Yes") {
    score += 3;
  }
  
  return Math.min(score, 15);
}

/**
 * Calculate score based on transparency and disclosure
 * @param broker Broker details
 * @returns Score (0-15)
 */
function calculateTransparencyScore(broker: BrokerDetails): number {
  let score = 0;
  
  // Check for fee transparency
  if (broker.trading_fee !== null && broker.trading_fee !== undefined) {
    score += 5;
  }
  
  // Check for regulatory disclosures
  if (broker.regulations) {
    score += 5;
  }
  
  // Check for company information transparency
  if (broker.year_founded && broker.country) {
    score += 5;
  }
  
  return Math.min(score, 15);
}

/**
 * Calculate a trust score (0-100) based on various broker metrics - simplified method
 */
export function calculateTrustScore(input: BrokerDetails | {
  rating?: number;
  yearsInBusiness?: number;
  isRegulated?: boolean;
  hasInsurance?: boolean;
  isPlatformSecure?: boolean;
  hasGoodReputation?: boolean;
  hasTransparentFees?: boolean;
  hasFastWithdrawals?: boolean;
}): number {
  // If it's a BrokerDetails object, use the detailed calculation
  if ('name' in input && typeof input.name === 'string') {
    return calculateBrokerTrustScore(input as BrokerDetails);
  }
  
  // Otherwise use the simplified calculation
  const {
    rating = 0,                   // User rating (0-5)
    yearsInBusiness = 0,          // Years of operation 
    isRegulated = false,          // Whether the broker is regulated
    hasInsurance = false,         // Whether client funds are insured
    isPlatformSecure = false,     // Whether platform has 2FA or other security
    hasGoodReputation = false,    // Whether the broker has good online reputation
    hasTransparentFees = false,   // Whether fees and costs are transparent
    hasFastWithdrawals = false    // Whether withdrawals are processed quickly
  } = input;
  
  // Convert rating to a 0-25 scale
  const ratingScore = Math.min(5, Math.max(0, rating)) * 5;
  
  // Years in business (max 15 points)
  const yearsScore = Math.min(15, yearsInBusiness);
  
  // Regulatory status (max 20 points)
  const regulationScore = isRegulated ? 20 : 0;
  
  // Other factors (max 40 points total)
  const insuranceScore = hasInsurance ? 10 : 0;
  const securityScore = isPlatformSecure ? 10 : 0;
  const reputationScore = hasGoodReputation ? 10 : 0;
  const transparencyScore = hasTransparentFees ? 5 : 0;
  const withdrawalScore = hasFastWithdrawals ? 5 : 0;
  
  // Sum all scores
  const totalScore = Math.round(
    ratingScore + 
    yearsScore + 
    regulationScore + 
    insuranceScore + 
    securityScore + 
    reputationScore + 
    transparencyScore + 
    withdrawalScore
  );
  
  // Return score bounded to 0-100
  return Math.min(100, Math.max(0, totalScore));
}

/**
 * Get verbal description of trust score
 * @param score Trust score (0-100)
 * @returns Descriptive text for the trust score
 */
export function getTrustScoreDescription(score: number): string {
  if (score >= 90) return "Highly Trusted";
  if (score >= 80) return "Very Trustworthy";
  if (score >= 70) return "Trustworthy";
  if (score >= 60) return "Moderately Trustworthy";
  if (score >= 50) return "Average Trust";
  if (score >= 40) return "Exercise Caution";
  if (score >= 30) return "Low Trust";
  return "Not Recommended";
}

/**
 * Get a descriptive label for a trust score
 */
export function getTrustScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Above Average';
  if (score >= 50) return 'Average';
  if (score >= 40) return 'Below Average';
  if (score >= 30) return 'Poor';
  return 'Very Poor';
}

/**
 * Get color scheme for trust score (CSS color value)
 * @param score Trust score (0-100)
 * @returns CSS color value
 */
export function getTrustScoreColor(score: number): string {
  if (score >= 90) return "green";
  if (score >= 80) return "#00a86b";
  if (score >= 70) return "#4caf50";
  if (score >= 60) return "#8bc34a";
  if (score >= 50) return "#cddc39";
  if (score >= 40) return "#ffc107";
  if (score >= 30) return "#ff9800";
  return "#f44336";
}

/**
 * Get a color class for a trust score (tailwind color class)
 */
export function getTrustScoreTailwindClass(score: number): string {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-green-400';
  if (score >= 70) return 'bg-green-300';
  if (score >= 60) return 'bg-yellow-400';
  if (score >= 50) return 'bg-yellow-300';
  if (score >= 40) return 'bg-orange-400';
  if (score >= 30) return 'bg-red-400';
  return 'bg-red-500';
}

/**
 * Convert a 5-star rating to a trust score (0-100)
 */
export function convertRatingToTrustScore(rating: number): number {
  return Math.round(rating * 20); // Simple 5-star to percentage conversion
} 