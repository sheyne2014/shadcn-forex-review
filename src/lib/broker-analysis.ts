import { capitalize } from "./utils";

/**
 * Analyzes broker data to generate insights and recommendations
 */
export interface BrokerAnalysisResult {
  tradingStrategyFit: {
    dayTrading: number; // 0-100 score
    scalping: number;
    swingTrading: number;
    positionTrading: number;
    algorithmicTrading: number;
    recommendedFor: string[];
    notRecommendedFor: string[];
  };
  experienceLevelFit: {
    beginner: number; // 0-100 score
    intermediate: number;
    advanced: number;
    recommendedLevel: string;
  };
  strengthsWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  costAnalysis: {
    overallCost: "very low" | "low" | "medium" | "high" | "very high";
    spreadCost: string;
    commissionCost: string;
    swapCost: string;
    costSummary: string;
  };
  platformQuality: {
    score: number; // 0-100
    stability: number;
    features: number;
    userExperience: number;
    mobileFunctionality: number;
    summary: string;
  };
}

/**
 * Analyzes a broker based on their data and returns detailed insights
 */
export function analyzeBroker(broker: any): BrokerAnalysisResult {
  // Default analysis result
  const analysis: BrokerAnalysisResult = {
    tradingStrategyFit: {
      dayTrading: 0,
      scalping: 0,
      swingTrading: 0,
      positionTrading: 0,
      algorithmicTrading: 0,
      recommendedFor: [],
      notRecommendedFor: []
    },
    experienceLevelFit: {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
      recommendedLevel: "intermediate"
    },
    strengthsWeaknesses: {
      strengths: [],
      weaknesses: []
    },
    costAnalysis: {
      overallCost: "medium",
      spreadCost: "Variable spreads starting from unknown",
      commissionCost: "Unknown commission structure",
      swapCost: "Standard overnight swap fees apply",
      costSummary: "Average trading costs compared to industry standards"
    },
    platformQuality: {
      score: 70,
      stability: 70,
      features: 70,
      userExperience: 70,
      mobileFunctionality: 70,
      summary: "Standard platform quality with good reliability and features"
    }
  };

  // Analyze trading strategy fit
  analysis.tradingStrategyFit = analyzeTradingStrategyFit(broker);
  
  // Analyze experience level fit
  analysis.experienceLevelFit = analyzeExperienceLevelFit(broker);
  
  // Analyze strengths and weaknesses
  analysis.strengthsWeaknesses = analyzeStrengthsWeaknesses(broker);
  
  // Analyze cost
  analysis.costAnalysis = analyzeCosts(broker);
  
  // Analyze platform quality
  analysis.platformQuality = analyzePlatformQuality(broker);
  
  return analysis;
}

/**
 * Analyzes which trading strategies the broker is best suited for
 */
function analyzeTradingStrategyFit(broker: any) {
  const result = {
    dayTrading: 50,
    scalping: 50,
    swingTrading: 50,
    positionTrading: 50,
    algorithmicTrading: 50,
    recommendedFor: [] as string[],
    notRecommendedFor: [] as string[]
  };
  
  // Check leverage (higher is better for day trading and scalping)
  if (broker.max_leverage) {
    const leverage = parseInt(broker.max_leverage.replace(/\D/g, '')) || 0;
    if (leverage >= 500) {
      result.dayTrading += 20;
      result.scalping += 25;
    } else if (leverage >= 200) {
      result.dayTrading += 15;
      result.scalping += 15;
    } else if (leverage >= 100) {
      result.dayTrading += 10;
      result.scalping += 5;
    }
    
    // For position trading, too high leverage is actually a negative
    if (leverage <= 100) {
      result.positionTrading += 10;
    } else if (leverage >= 500) {
      result.positionTrading -= 5;
    }
  }
  
  // Check spread (lower is better for scalping and day trading)
  if (broker.spread_from) {
    const spread = parseFloat(broker.spread_from) || 0;
    if (spread <= 0.5) {
      result.scalping += 25;
      result.dayTrading += 20;
    } else if (spread <= 1.0) {
      result.scalping += 15;
      result.dayTrading += 15;
    } else if (spread <= 1.5) {
      result.scalping += 5;
      result.dayTrading += 10;
    } else if (spread >= 2.0) {
      result.scalping -= 10;
    }
  }
  
  // Check platforms (MT4/MT5 are better for algorithmic trading)
  if (broker.trading_platforms) {
    const platforms = broker.trading_platforms.toLowerCase();
    if (platforms.includes('mt4') || platforms.includes('metatrader 4')) {
      result.algorithmicTrading += 20;
    }
    if (platforms.includes('mt5') || platforms.includes('metatrader 5')) {
      result.algorithmicTrading += 25;
    }
    if (platforms.includes('ctrader')) {
      result.algorithmicTrading += 20;
      result.scalping += 10;
    }
  }
  
  // Check for educational resources (good for swing/position trading)
  if (broker.educational_resources) {
    result.swingTrading += 10;
    result.positionTrading += 15;
  }
  
  // Check regulations (regulated brokers are better for long-term strategies)
  if (broker.regulations) {
    result.swingTrading += 15;
    result.positionTrading += 20;
  }
  
  // Generate recommendations based on scores
  const strategies = [
    { name: "Day Trading", score: result.dayTrading },
    { name: "Scalping", score: result.scalping },
    { name: "Swing Trading", score: result.swingTrading },
    { name: "Position Trading", score: result.positionTrading },
    { name: "Algorithmic Trading", score: result.algorithmicTrading }
  ];
  
  // Sort by score descending
  strategies.sort((a, b) => b.score - a.score);
  
  // Top 2 strategies are recommended
  result.recommendedFor = strategies.slice(0, 2).map(s => s.name);
  
  // Bottom 2 strategies are not recommended (if score is below 50)
  result.notRecommendedFor = strategies.slice(-2)
    .filter(s => s.score < 50)
    .map(s => s.name);
  
  return result;
}

/**
 * Analyzes which experience level the broker is best suited for
 */
function analyzeExperienceLevelFit(broker: any) {
  const result = {
    beginner: 50,
    intermediate: 50,
    advanced: 50,
    recommendedLevel: "intermediate"
  };
  
  // Check min deposit (lower is better for beginners)
  if (broker.min_deposit) {
    if (broker.min_deposit <= 50) {
      result.beginner += 25;
    } else if (broker.min_deposit <= 100) {
      result.beginner += 15;
    } else if (broker.min_deposit <= 250) {
      result.beginner += 5;
    } else if (broker.min_deposit >= 1000) {
      result.beginner -= 15;
      result.advanced += 10;
    }
  }
  
  // Check educational resources (better for beginners)
  if (broker.educational_resources) {
    result.beginner += 20;
    result.intermediate += 10;
  }
  
  // Check regulations (important for beginners)
  if (broker.regulations) {
    result.beginner += 15;
  }
  
  // Check platforms (advanced platforms are better for experienced traders)
  if (broker.trading_platforms) {
    const platforms = broker.trading_platforms.toLowerCase();
    if (platforms.includes('mt5') || platforms.includes('metatrader 5')) {
      result.intermediate += 10;
      result.advanced += 15;
    }
    if (platforms.includes('ctrader')) {
      result.intermediate += 10;
      result.advanced += 20;
    }
    if (platforms.includes('web') || platforms.includes('mobile')) {
      result.beginner += 10;
    }
  }
  
  // Check leverage (higher is better for advanced)
  if (broker.max_leverage) {
    const leverage = parseInt(broker.max_leverage.replace(/\D/g, '')) || 0;
    if (leverage >= 500) {
      result.advanced += 20;
      result.beginner -= 10;
    } else if (leverage >= 200) {
      result.intermediate += 15;
      result.advanced += 10;
    }
  }
  
  // Determine recommended level based on highest score
  const levels = [
    { level: "beginner", score: result.beginner },
    { level: "intermediate", score: result.intermediate },
    { level: "advanced", score: result.advanced }
  ];
  
  levels.sort((a, b) => b.score - a.score);
  result.recommendedLevel = levels[0].level;
  
  return result;
}

/**
 * Analyzes strengths and weaknesses of the broker
 */
function analyzeStrengthsWeaknesses(broker: any) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // Check regulation
  if (broker.regulations) {
    strengths.push(`Regulated by ${broker.regulations}`);
  } else {
    weaknesses.push("Unregulated or unclear regulatory status");
  }
  
  // Check minimum deposit
  if (broker.min_deposit) {
    if (broker.min_deposit <= 100) {
      strengths.push(`Low minimum deposit of $${broker.min_deposit}`);
    } else if (broker.min_deposit >= 1000) {
      weaknesses.push(`High minimum deposit of $${broker.min_deposit}`);
    }
  }
  
  // Check leverage
  if (broker.max_leverage) {
    const leverage = parseInt(broker.max_leverage.replace(/\D/g, '')) || 0;
    if (leverage >= 400) {
      strengths.push(`High maximum leverage of ${broker.max_leverage}`);
    } else if (leverage <= 50) {
      weaknesses.push(`Limited leverage of only ${broker.max_leverage}`);
    }
  }
  
  // Check spreads
  if (broker.spread_from) {
    const spread = parseFloat(broker.spread_from) || 0;
    if (spread <= 1.0) {
      strengths.push(`Competitive spreads from ${broker.spread_from} pips`);
    } else if (spread >= 2.0) {
      weaknesses.push(`Higher than average spreads from ${broker.spread_from} pips`);
    }
  }
  
  // Check platforms
  if (broker.trading_platforms) {
    const platforms = broker.trading_platforms.toLowerCase();
    if (platforms.includes('mt4') && platforms.includes('mt5')) {
      strengths.push("Offers both MetaTrader 4 and 5 platforms");
    } else if (!platforms.includes('mt4') && !platforms.includes('metatrader 4') && 
               !platforms.includes('mt5') && !platforms.includes('metatrader 5')) {
      weaknesses.push("Does not offer popular MetaTrader platforms");
    }
  }
  
  // Check educational resources
  if (broker.educational_resources) {
    strengths.push("Comprehensive educational resources available");
  } else {
    weaknesses.push("Limited educational content");
  }
  
  // Check years in business
  if (broker.year_founded) {
    const yearsInBusiness = new Date().getFullYear() - parseInt(broker.year_founded);
    if (yearsInBusiness >= 10) {
      strengths.push(`Well-established broker with ${yearsInBusiness} years of experience`);
    } else if (yearsInBusiness <= 2) {
      weaknesses.push(`Relatively new broker with only ${yearsInBusiness} years in the market`);
    }
  }
  
  // If we don't have enough data, add some generic strengths/weaknesses
  if (strengths.length < 3) {
    if (!strengths.some(s => s.toLowerCase().includes("platform"))) {
      strengths.push("Multiple trading platforms available");
    }
    if (!strengths.some(s => s.toLowerCase().includes("support"))) {
      strengths.push("Customer support available");
    }
  }
  
  if (weaknesses.length < 2) {
    if (!weaknesses.some(w => w.toLowerCase().includes("weekend"))) {
      weaknesses.push("Limited weekend support");
    }
    if (!weaknesses.some(w => w.toLowerCase().includes("fee"))) {
      weaknesses.push("Fee structure could be more transparent");
    }
  }
  
  return { strengths, weaknesses };
}

/**
 * Analyzes the cost structure of the broker
 */
function analyzeCosts(broker: any) {
  const result = {
    overallCost: "medium" as "very low" | "low" | "medium" | "high" | "very high",
    spreadCost: "Variable spreads",
    commissionCost: "Unknown commission structure",
    swapCost: "Standard overnight swap fees apply",
    costSummary: "Average trading costs compared to industry standards"
  };
  
  let costScore = 50; // Starting baseline (medium)
  
  // Check spreads
  if (broker.spread_from) {
    const spread = parseFloat(broker.spread_from) || 0;
    result.spreadCost = `Variable spreads from ${broker.spread_from} pips`;
    
    if (spread <= 0.5) {
      costScore -= 20; // Very low cost
    } else if (spread <= 1.0) {
      costScore -= 15; // Low cost
    } else if (spread >= 2.0) {
      costScore += 15; // High cost
    }
  }
  
  // Check commissions
  if (broker.trading_fee) {
    result.commissionCost = `Commission rate of ${broker.trading_fee}%`;
    
    if (broker.trading_fee <= 0.002) {
      costScore -= 10; // Very low cost
    } else if (broker.trading_fee >= 0.01) {
      costScore += 15; // High cost
    }
  }
  
  // Determine overall cost level
  if (costScore <= 20) result.overallCost = "very low";
  else if (costScore <= 40) result.overallCost = "low";
  else if (costScore <= 60) result.overallCost = "medium";
  else if (costScore <= 80) result.overallCost = "high";
  else result.overallCost = "very high";
  
  // Generate cost summary
  result.costSummary = `${capitalize(broker.name)} offers ${result.overallCost} trading costs compared to industry standards, with ${result.spreadCost.toLowerCase()}${broker.trading_fee ? ` and ${result.commissionCost.toLowerCase()}` : ''}.`;
  
  return result;
}

/**
 * Analyzes the quality of the broker's trading platforms
 */
function analyzePlatformQuality(broker: any) {
  const result = {
    score: 70,
    stability: 70,
    features: 70,
    userExperience: 70,
    mobileFunctionality: 70,
    summary: "Standard platform quality with good reliability and features"
  };
  
  // Without detailed platform data, we can make basic assessments based on available info
  if (broker.trading_platforms) {
    const platforms = broker.trading_platforms.toLowerCase();
    
    // Check for popular and stable platforms
    if (platforms.includes('mt4') || platforms.includes('metatrader 4')) {
      result.stability += 10;
      result.features += 5;
    }
    
    if (platforms.includes('mt5') || platforms.includes('metatrader 5')) {
      result.stability += 10;
      result.features += 15;
      result.userExperience += 5;
    }
    
    if (platforms.includes('ctrader')) {
      result.features += 15;
      result.userExperience += 10;
      result.stability += 5;
    }
    
    if (platforms.includes('web')) {
      result.userExperience += 10;
      result.mobileFunctionality += 5;
    }
    
    if (platforms.includes('mobile')) {
      result.mobileFunctionality += 15;
    }
    
    // Calculate overall score
    result.score = Math.round(
      (result.stability + result.features + result.userExperience + result.mobileFunctionality) / 4
    );
    
    // Generate summary
    let platformQuality = "standard";
    if (result.score >= 85) platformQuality = "excellent";
    else if (result.score >= 75) platformQuality = "very good";
    else if (result.score < 60) platformQuality = "basic";
    
    const platformsList = [];
    if (platforms.includes('mt4') || platforms.includes('metatrader 4')) platformsList.push("MetaTrader 4");
    if (platforms.includes('mt5') || platforms.includes('metatrader 5')) platformsList.push("MetaTrader 5");
    if (platforms.includes('ctrader')) platformsList.push("cTrader");
    if (platforms.includes('web')) platformsList.push("WebTrader");
    if (platforms.includes('mobile')) platformsList.push("mobile apps");
    
    const platformsText = platformsList.length > 0 
      ? `including ${platformsList.slice(0, -1).join(', ')}${platformsList.length > 1 ? ' and ' : ''}${platformsList[platformsList.length-1]}`
      : "with limited information about available platforms";
    
    result.summary = `${capitalize(broker.name)} offers ${platformQuality} trading platforms ${platformsText}. ${
      result.stability > 80 ? "Platform stability is excellent" : 
      result.stability > 70 ? "Platform stability is good" : 
      "Platform stability is adequate"
    }, with ${
      result.features > 80 ? "comprehensive" : 
      result.features > 70 ? "good" : 
      "basic"
    } features and ${
      result.mobileFunctionality > 80 ? "excellent" : 
      result.mobileFunctionality > 70 ? "good" : 
      "limited"
    } mobile functionality.`;
  }
  
  return result;
}

/**
 * Generates a personalized broker recommendation based on user preferences
 */
export function generatePersonalizedRecommendation(
  broker: any, 
  userPreferences: {
    experienceLevel?: "beginner" | "intermediate" | "advanced";
    tradingStyle?: "day trading" | "scalping" | "swing trading" | "position trading" | "algorithmic trading";
    accountSize?: "small" | "medium" | "large";
    riskTolerance?: "low" | "medium" | "high";
  }
) {
  const analysis = analyzeBroker(broker);
  let recommendation = "";
  let matchScore = 0;
  const reasons: string[] = [];
  
  // Check experience level match
  if (userPreferences.experienceLevel) {
    const experienceLevel = userPreferences.experienceLevel;
    const score = analysis.experienceLevelFit[experienceLevel];
    
    if (score >= 70) {
      matchScore += 25;
      reasons.push(`Strong match for ${experienceLevel} traders`);
    } else if (score >= 50) {
      matchScore += 15;
      reasons.push(`Suitable for ${experienceLevel} traders`);
    } else {
      reasons.push(`May not be ideal for ${experienceLevel} traders`);
    }
  }
  
  // Check trading style match
  if (userPreferences.tradingStyle) {
    const tradingStyle = userPreferences.tradingStyle.replace(' ', '').toLowerCase();
    const styleScores = {
      'daytrading': analysis.tradingStrategyFit.dayTrading,
      'scalping': analysis.tradingStrategyFit.scalping,
      'swingtrading': analysis.tradingStrategyFit.swingTrading,
      'positiontrading': analysis.tradingStrategyFit.positionTrading,
      'algorithmictrading': analysis.tradingStrategyFit.algorithmicTrading
    };
    
    const score = styleScores[tradingStyle as keyof typeof styleScores] || 50;
    
    if (score >= 70) {
      matchScore += 25;
      reasons.push(`Excellent for ${userPreferences.tradingStyle}`);
    } else if (score >= 50) {
      matchScore += 15;
      reasons.push(`Suitable for ${userPreferences.tradingStyle}`);
    } else {
      reasons.push(`Less optimal for ${userPreferences.tradingStyle}`);
    }
  }
  
  // Check account size considerations
  if (userPreferences.accountSize && broker.min_deposit) {
    if (userPreferences.accountSize === "small" && broker.min_deposit <= 100) {
      matchScore += 15;
      reasons.push(`Good for small accounts with low minimum deposit of $${broker.min_deposit}`);
    } else if (userPreferences.accountSize === "small" && broker.min_deposit >= 500) {
      reasons.push(`Higher minimum deposit of $${broker.min_deposit} may be challenging for small accounts`);
    } else if (userPreferences.accountSize === "large" && broker.min_deposit >= 1000) {
      matchScore += 10;
      reasons.push(`Premium account options available for larger deposits`);
    }
  }
  
  // Check risk tolerance
  if (userPreferences.riskTolerance && broker.max_leverage) {
    const leverage = parseInt(broker.max_leverage.replace(/\D/g, '')) || 0;
    
    if (userPreferences.riskTolerance === "high" && leverage >= 500) {
      matchScore += 15;
      reasons.push(`High leverage options (${broker.max_leverage}) available for high-risk strategies`);
    } else if (userPreferences.riskTolerance === "low" && leverage <= 100) {
      matchScore += 15;
      reasons.push(`Moderate leverage options align with conservative trading approaches`);
    } else if (userPreferences.riskTolerance === "low" && leverage >= 500) {
      reasons.push(`High available leverage may require careful risk management for conservative traders`);
    }
  }
  
  // Generate final recommendation
  let matchLevel = "potential";
  if (matchScore >= 60) matchLevel = "excellent";
  else if (matchScore >= 40) matchLevel = "good";
  else if (matchScore >= 20) matchLevel = "decent";
  
  recommendation = `${capitalize(broker.name)} is a ${matchLevel} match for your trading preferences. ${reasons.join('. ')}.`;
  
  return {
    matchScore,
    matchLevel,
    recommendation,
    reasons
  };
}

/**
 * Generates comparative insights between two brokers
 */
export function compareBrokers(primaryBroker: any, comparisonBroker: any) {
  const primaryAnalysis = analyzeBroker(primaryBroker);
  const comparisonAnalysis = analyzeBroker(comparisonBroker);
  
  const advantages: string[] = [];
  const disadvantages: string[] = [];
  
  // Compare trading costs
  const costLevels = { "very low": 1, "low": 2, "medium": 3, "high": 4, "very high": 5 };
  if (costLevels[primaryAnalysis.costAnalysis.overallCost] < costLevels[comparisonAnalysis.costAnalysis.overallCost]) {
    advantages.push(`Lower overall trading costs compared to ${comparisonBroker.name}`);
  } else if (costLevels[primaryAnalysis.costAnalysis.overallCost] > costLevels[comparisonAnalysis.costAnalysis.overallCost]) {
    disadvantages.push(`Higher overall trading costs compared to ${comparisonBroker.name}`);
  }
  
  // Compare min deposit
  if (primaryBroker.min_deposit && comparisonBroker.min_deposit) {
    if (primaryBroker.min_deposit < comparisonBroker.min_deposit) {
      advantages.push(`Lower minimum deposit of $${primaryBroker.min_deposit} (vs $${comparisonBroker.min_deposit})`);
    } else if (primaryBroker.min_deposit > comparisonBroker.min_deposit) {
      disadvantages.push(`Higher minimum deposit of $${primaryBroker.min_deposit} (vs $${comparisonBroker.min_deposit})`);
    }
  }
  
  // Compare platform quality
  if (primaryAnalysis.platformQuality.score > comparisonAnalysis.platformQuality.score + 10) {
    advantages.push(`Superior trading platforms compared to ${comparisonBroker.name}`);
  } else if (primaryAnalysis.platformQuality.score < comparisonAnalysis.platformQuality.score - 10) {
    disadvantages.push(`Less advanced trading platforms compared to ${comparisonBroker.name}`);
  }
  
  // Compare leverage
  if (primaryBroker.max_leverage && comparisonBroker.max_leverage) {
    const leverage1 = parseInt(primaryBroker.max_leverage.replace(/\D/g, '')) || 0;
    const leverage2 = parseInt(comparisonBroker.max_leverage.replace(/\D/g, '')) || 0;
    
    if (leverage1 > leverage2 + 100) {
      advantages.push(`Higher maximum leverage of ${primaryBroker.max_leverage} (vs ${comparisonBroker.max_leverage})`);
    } else if (leverage1 < leverage2 - 100) {
      disadvantages.push(`Lower maximum leverage of ${primaryBroker.max_leverage} (vs ${comparisonBroker.max_leverage})`);
    }
  }
  
  return {
    advantages,
    disadvantages,
    summaryComparison: `Compared to ${comparisonBroker.name}, ${primaryBroker.name} ${advantages.length > disadvantages.length ? 'offers several advantages' : 'has some trade-offs to consider'}.`
  };
}

/**
 * Generates dynamic FAQ questions and answers based on broker data
 */
export function generateDynamicFAQs(broker: any) {
  const faqs: {question: string; answer: string}[] = [];
  
  // Standard questions with dynamic answers
  faqs.push({
    question: `What is the minimum deposit requirement for ${broker.name}?`,
    answer: broker.min_deposit 
      ? `The minimum deposit required to open an account with ${broker.name} is $${broker.min_deposit}. This allows traders to start with a relatively ${broker.min_deposit <= 100 ? 'low' : 'reasonable'} initial investment.`
      : `${broker.name} has different minimum deposit requirements depending on the account type you choose. We recommend checking their official website for the most current information.`
  });
  
  faqs.push({
    question: `Is ${broker.name} regulated?`,
    answer: broker.regulations
      ? `Yes, ${broker.name} is regulated by ${broker.regulations}. This regulatory oversight helps ensure the broker follows industry standards and provides a layer of protection for traders.`
      : `${broker.name} appears to have limited or unclear regulatory information available. We recommend carefully verifying their regulatory status before opening an account, as regulation is a key factor in broker security.`
  });
  
  // Generate additional FAQs based on available data
  if (broker.max_leverage) {
    faqs.push({
      question: `What leverage does ${broker.name} offer?`,
      answer: `${broker.name} offers maximum leverage of ${broker.max_leverage}. ${
        parseInt(broker.max_leverage.replace(/\D/g, '')) > 500 
          ? 'This high leverage can amplify both gains and losses, so it should be used with caution and proper risk management.' 
          : 'This level of leverage is typical in the industry and allows traders to control larger positions with a smaller capital outlay.'
      }`
    });
  }
  
  if (broker.trading_platforms) {
    faqs.push({
      question: `What trading platforms are available with ${broker.name}?`,
      answer: `${broker.name} offers the following trading platforms: ${broker.trading_platforms}. ${
        broker.trading_platforms.toLowerCase().includes('mt4') && broker.trading_platforms.toLowerCase().includes('mt5')
          ? 'Both MetaTrader 4 and 5 are provided, giving traders access to industry-standard platforms with extensive features.'
          : broker.trading_platforms.toLowerCase().includes('proprietary')
            ? 'Their proprietary platform is designed to offer a customized trading experience alongside industry-standard options.'
            : 'These platforms provide the tools and features needed for effective market analysis and trade execution.'
      }`
    });
  }
  
  if (broker.spread_from) {
    faqs.push({
      question: `What are the typical spreads at ${broker.name}?`,
      answer: `${broker.name} offers spreads starting from ${broker.spread_from} pips. ${
        parseFloat(broker.spread_from) <= 1.0
          ? 'These competitive spreads help reduce trading costs, which is particularly important for high-frequency traders and scalpers.'
          : 'These spreads are within the standard range offered by retail forex brokers.'
      }`
    });
  }
  
  // Add questions about deposit/withdrawal methods if available
  faqs.push({
    question: `What payment methods does ${broker.name} accept?`,
    answer: broker.payment_methods
      ? `${broker.name} accepts the following payment methods: ${broker.payment_methods}.`
      : `${broker.name} typically accepts standard payment methods including credit/debit cards, bank transfers, and various e-wallets. Specific options may vary by country and account type.`
  });
  
  // Add question about customer support
  faqs.push({
    question: `How can I contact ${broker.name}'s customer support?`,
    answer: broker.support_hours
      ? `${broker.name} provides customer support ${broker.support_hours} through ${broker.support_channels || 'various channels including email, live chat, and phone'}.`
      : `${broker.name} offers customer support through standard channels including email, live chat, and phone support. For specific contact details and support hours, please visit their official website.`
  });
  
  return faqs;
}

/**
 * Generate a personalized broker description based on broker data with SEO considerations
 */
export function generateBrokerDescription(broker: any, year: number, month: string) {
  const analysis = analyzeBroker(broker);
  
  // Compile key features
  const keyFeatures = [];
  if (broker.regulations) keyFeatures.push(`${broker.regulations} regulation`);
  if (broker.min_deposit) keyFeatures.push(`$${broker.min_deposit} min deposit`);
  if (broker.max_leverage) keyFeatures.push(`${broker.max_leverage} leverage`);
  if (broker.spread_from) keyFeatures.push(`spreads from ${broker.spread_from} pips`);
  
  // Create feature text
  const featureText = keyFeatures.length > 0 
    ? `Key features include ${keyFeatures.slice(0, 3).join(', ')}.` 
    : '';
  
  // Create trader suitability text
  const suitabilityText = analysis.tradingStrategyFit.recommendedFor.length > 0
    ? `Particularly suitable for ${analysis.tradingStrategyFit.recommendedFor.join(' and ')} strategies`
    : `Suitable for various trading strategies`;
  
  // Create experience level text
  const experienceLevelText = `and ${analysis.experienceLevelFit.recommendedLevel} traders`;
  
  // Create full description
  return `${capitalize(broker.name)} is a ${broker.year_founded ? `broker established in ${broker.year_founded}` : 'forex broker'} ${
    broker.headquarters ? `based in ${broker.headquarters}` : ''
  } offering trading services in forex${
    broker.supported_assets ? ` and various ${typeof broker.supported_assets === 'string' ? broker.supported_assets : broker.supported_assets.join(', ')}` : ' and other financial instruments'
  }. ${featureText} ${suitabilityText} ${experienceLevelText}. Updated ${month} ${year}.`;
} 