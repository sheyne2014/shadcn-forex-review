# Forex Broker Review Components

This directory contains a comprehensive set of components for building forex broker review pages with rich user interface elements and SEO optimization.

## Components Overview

### HeroBrokerSection
The main header section for broker review pages, displaying broker logo, rating, and key information.

**Props:**
- `broker`: The broker data object
- `legitimacyData`: Object containing legitimacy verification information

**Example:**
```tsx
<HeroBrokerSection 
  broker={brokerData} 
  legitimacyData={{ 
    isLegitimate: true, 
    regulatoryStatus: "FCA, ASIC", 
    warningFlags: [] 
  }} 
/>
```

### BrokerOverviewSection
Displays general information about the broker, including key features, pros/cons, and suitability.

**Props:**
- `broker`: The broker data object
- `brokerAnalysis`: Optional detailed analysis information
- `prosCons`: Optional list of pros and cons

**Example:**
```tsx
<BrokerOverviewSection 
  broker={brokerData} 
  brokerAnalysis={{
    overview: "Detailed broker description...",
    strengths: "Key strengths...",
    considerations: "Important considerations...",
    suitableFor: ["Day traders", "Scalpers"],
    notSuitableFor: ["Long-term investors"]
  }}
  prosCons={{
    pros: ["Low spreads", "Fast execution"],
    cons: ["Limited instruments", "Higher fees"]
  }}
/>
```

### TradingConditionsSection
Presents detailed information about trading conditions, account types, spreads, and fees.

**Props:**
- `broker`: The broker data object
- `tradingFeatures`: Optional detailed trading features information

### PlatformsSection
Showcases the trading platforms offered by the broker with features and comparisons.

**Props:**
- `broker`: The broker data object
- `platformDetails`: Optional detailed platform information

### EducationSection
Highlights educational resources offered by the broker with a learning path visualization.

**Props:**
- `broker`: The broker data object
- `educationalResources`: Optional detailed educational resource information

### ReviewsSection
Displays user reviews with filtering options and a submission form.

**Props:**
- `broker`: The broker data object
- `reviews`: Optional array of user reviews

### FAQSection
Shows frequently asked questions about the broker with dynamic answers.

**Props:**
- `broker`: The broker data object
- `faqs`: Optional array of FAQ items

### BrokerComparisonWidget
Side-by-side comparison of the current broker with other similar brokers.

**Props:**
- `primaryBroker`: The main broker data object
- `comparisonBrokers`: Array of broker data objects to compare with
- `onAddBroker`: Optional callback function for adding new brokers to compare

**Example:**
```tsx
<BrokerComparisonWidget 
  primaryBroker={brokerData}
  comparisonBrokers={similarBrokers}
  onAddBroker={() => setShowBrokerSelector(true)}
/>
```

### BrokerLegitimacyScore
Displays a legitimacy verification score with detailed check information.

**Props:**
- `broker`: The broker data object
- `verificationData`: Optional detailed verification information

**Example:**
```tsx
<BrokerLegitimacyScore 
  broker={brokerData}
  verificationData={{
    score: 85,
    maxScore: 100,
    verificationChecks: [
      {
        name: "Regulatory Compliance",
        description: "Verification of regulatory status",
        status: "verified",
        details: "Regulated by FCA"
      }
    ]
  }}
/>
```

### BrokerRiskIndex
Shows a risk assessment for the broker with detailed risk factors.

**Props:**
- `broker`: The broker data object
- `riskData`: Optional detailed risk assessment information

**Example:**
```tsx
<BrokerRiskIndex 
  broker={brokerData}
  riskData={{
    overallRisk: "medium",
    riskFactors: [
      {
        name: "Leverage Risk",
        risk: "high",
        description: "High leverage increases potential losses"
      }
    ],
    riskDisclaimer: "Trading involves significant risk..."
  }}
/>
```

### BrokerAnalysisWidget
Provides comprehensive analysis of broker trading conditions, strategy fit, and suitability for different trader types.

**Props:**
- `broker`: The broker data object
- `userPreferences`: Optional user preference settings for personalized recommendations
  - `experienceLevel`: "beginner" | "intermediate" | "advanced"
  - `tradingStyle`: "day trading" | "scalping" | "swing trading" | "position trading" | "algorithmic trading"
  - `accountSize`: "small" | "medium" | "large"
  - `riskTolerance`: "low" | "medium" | "high"

**Example:**
```tsx
<BrokerAnalysisWidget 
  broker={brokerData}
  userPreferences={{
    experienceLevel: "intermediate",
    tradingStyle: "day trading",
    accountSize: "medium",
    riskTolerance: "medium"
  }}
/>
```

### DynamicFAQSection
Generates dynamic FAQ content based on broker data with intelligent answers tailored to the broker's features.

**Props:**
- `broker`: The broker data object
- `additionalFaqs`: Optional additional FAQ items to include

**Example:**
```tsx
<DynamicFAQSection 
  broker={brokerData}
  additionalFaqs={[
    {
      question: "Is this broker good for beginners?",
      answer: "Yes, this broker offers excellent educational resources and a low minimum deposit."
    }
  ]}
/>
```

## Broker Analysis Utilities

The components use advanced analysis utilities from `src/lib/broker-analysis.ts` that provide:

1. **Automated Broker Analysis**:
   - Trading strategy compatibility assessment
   - Experience level fit calculation
   - Cost analysis and comparison
   - Strengths and weaknesses identification
   - Platform quality evaluation

2. **Dynamic Content Generation**:
   - SEO-optimized broker descriptions
   - Personalized recommendations based on user preferences
   - Broker comparison insights
   - Dynamic FAQ generation based on broker features

3. **Usage with Context7**:
   The utilities seamlessly integrate with Context7 for enhanced SEO:
   ```tsx
   import { generateBrokerDescription } from "@/lib/broker-analysis";
   
   // Inside component
   const description = generateBrokerDescription(broker, currentYear, currentMonth);
   
   const context7Config = {
     title: `${broker.name} Review`,
     description: description.slice(0, 160),
     // Additional SEO configuration
   };
   ```

## Usage with Context7 for SEO

For optimal SEO, wrap your broker review page with `Context7Provider`:

```tsx
import { Context7Provider } from "@/components/Context7Provider";
import { Context7Config } from "@/lib/context7";

// Inside your component
const context7Config: Context7Config = {
  title: `${broker.name} Review`,
  description: `Comprehensive review of ${broker.name}...`,
  keywords: [`${broker.name}`, "forex broker", "trading"],
  // Additional SEO configuration
};

return (
  <Context7Provider config={context7Config}>
    {/* Broker review components */}
  </Context7Provider>
);
```

## Data Structure

Most components expect a broker object with the following structure:

```typescript
interface Broker {
  id: string;
  name: string;
  logo_url?: string;
  description?: string;
  regulations?: string;
  min_deposit?: number;
  trading_fee?: number;
  max_leverage?: string;
  spread_from?: string;
  year_founded?: string;
  country?: string;
  trading_platforms?: string;
  educational_resources?: string;
  supported_assets?: string[] | string;
  account_currencies?: string;
  rating?: number;
  reviews?: Review[];
  // Additional properties
}
```

Review components expect review objects with this structure:

```typescript
interface Review {
  id: string;
  user_name?: string;
  rating: number;
  comment?: string;
  created_at: string;
  verified_purchase?: boolean;
  helpful_count?: number;
  trading_experience?: string;
  pros?: string;
  cons?: string;
}
``` 