import Link from "next/link";
import { Metadata } from "next";
import { Globe, BookOpen, DollarSign, LineChart, BarChart3, Shield, Award, MapPin, TrendingUp, CloudLightning, Coins, Clock, Wallet, ChartPie, Network, School, UserCheck, Star, Zap, Briefcase, Users, BadgePercent, Smartphone, Layers } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/database";

export const metadata: Metadata = {
  title: "Best Brokers 2025 - Top Trading Platforms Categorized | BrokerAnalysis | May 2025",
  description: "Find the best brokers for forex, stocks, crypto, beginners and more. Updated May 2025 with detailed categories to help you find the perfect trading platform for your needs.",
};

interface CategoryCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  tag?: string;
  brokers?: string[];
}

// Function to get real brokers for each category
async function getCategoriesWithBrokers() {
  try {
    // Get all categories and brokers from the database
    const categories = await db.categories.getAll();
    const allBrokers = await db.brokers.getAll();
    
    // Helper function to get top brokers for a category
    const getTopBrokersForCategory = async (categoryTitle: string): Promise<string[]> => {
      try {
        // First try direct category match
        const matchingCategory = categories.find(cat => {
          const catName = cat.name.toLowerCase();
          const searchName = categoryTitle.toLowerCase().replace('best ', '').replace(' brokers', '');
          return catName === searchName || catName.includes(searchName);
        });
        
        if (matchingCategory) {
          const brokers = await db.brokers.getByCategory(matchingCategory.id);
          if (brokers && brokers.length > 0) {
            const brokerNames = brokers.slice(0, 3).map(b => b.name);
            if (brokerNames.length === 3) {
              return brokerNames;
            }
          }
        }
        
        // Fallback: keyword search
        const keywords = categoryTitle.toLowerCase()
          .replace('best ', '')
          .replace(' brokers', '')
          .split(' ');
        
        let matchingBrokers = allBrokers.filter(broker => 
          keywords.some(keyword => 
            (broker.name && broker.name.toLowerCase().includes(keyword)) ||
            (broker.country && broker.country.toLowerCase().includes(keyword)) ||
            (broker.supported_assets && Array.isArray(broker.supported_assets) && 
             broker.supported_assets.some(asset => 
               typeof asset === 'string' && asset.toLowerCase().includes(keyword)
             ))
          )
        );
        
        // Sort by rating and get names
        const brokerNames = matchingBrokers
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3)
          .map(b => b.name);
        
        // If we found enough brokers by keyword, return them
        if (brokerNames.length === 3) {
          return brokerNames;
        }
        
        // Last fallback: just use top-rated brokers
        const topRatedBrokerNames = allBrokers
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3)
          .map(b => b.name);
        
        // Combine unique broker names, ensuring we return 3
        const combinedNames = [...new Set([...brokerNames, ...topRatedBrokerNames])].slice(0, 3);
        
        return combinedNames;
      } catch (error) {
        console.error(`Error getting brokers for category '${categoryTitle}':`, error);
        // Emergency fallback: return placeholder names
        return allBrokers
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3)
          .map(b => b.name);
      }
    };

    // Create category arrays with broker data
    const typeCategories: CategoryCard[] = [
      {
        title: "Best Forex Brokers 2025",
        description: "Top platforms for trading forex with tight spreads, fast execution, and reliable service.",
        icon: <Globe className="h-8 w-8 text-primary" />,
        href: "/best-brokers/forex",
        brokers: await getTopBrokersForCategory("Best Forex Brokers")
      },
      {
        title: "Best Brokers for Beginners 2025",
        description: "User-friendly platforms with excellent educational resources and low minimum deposits.",
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        href: "/best-brokers/beginners",
        tag: "Popular",
        brokers: await getTopBrokersForCategory("Best Brokers for Beginners")
      },
      {
        title: "Best Low-Cost Brokers 2025",
        description: "Trading platforms with minimal fees, low spreads, and no hidden charges.",
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        href: "/best-brokers/low-cost",
        brokers: await getTopBrokersForCategory("Best Low-Cost Brokers")
      },
      {
        title: "Best Mobile Trading Platforms 2025",
        description: "Top-rated mobile apps for trading on the go with full functionality.",
        icon: <Smartphone className="h-8 w-8 text-primary" />,
        href: "/best-brokers/mobile-trading",
        brokers: await getTopBrokersForCategory("Best Mobile Trading Platforms")
      },
      {
        title: "Best Crypto Brokers 2025",
        description: "Secure platforms for cryptocurrency trading with wide asset selection.",
        icon: <Coins className="h-8 w-8 text-primary" />,
        href: "/best-brokers/crypto",
        brokers: await getTopBrokersForCategory("Best Crypto Brokers")
      },
      {
        title: "Best Stock Brokers 2025",
        description: "Top platforms for stock trading with extensive market access and research tools.",
        icon: <TrendingUp className="h-8 w-8 text-primary" />,
        href: "/best-brokers/stocks",
        brokers: await getTopBrokersForCategory("Best Stock Brokers")
      },
      {
        title: "Best CFD Brokers 2025",
        description: "Leading brokers for trading Contracts for Difference with competitive leverage.",
        icon: <ChartPie className="h-8 w-8 text-primary" />,
        href: "/best-brokers/cfd",
        brokers: await getTopBrokersForCategory("Best CFD Brokers")
      },
      {
        title: "Best Options Brokers 2025",
        description: "Platforms with advanced tools for options trading and derivatives.",
        icon: <Network className="h-8 w-8 text-primary" />,
        href: "/best-brokers/options",
        brokers: await getTopBrokersForCategory("Best Options Brokers")
      },
      {
        title: "Best Futures Brokers 2025",
        description: "Reliable platforms for trading futures contracts with deep liquidity.",
        icon: <Clock className="h-8 w-8 text-primary" />,
        href: "/best-brokers/futures",
        brokers: await getTopBrokersForCategory("Best Futures Brokers")
      },
      {
        title: "Best ETF Brokers 2025",
        description: "Top platforms for ETF investing with commission-free trading and wide selection.",
        icon: <BarChart3 className="h-8 w-8 text-primary" />,
        href: "/best-brokers/etf",
        brokers: await getTopBrokersForCategory("Best ETF Brokers")
      },
      {
        title: "Best Commodities Brokers 2025",
        description: "Leading platforms for trading commodities with extensive market access and advanced tools.",
        icon: <TrendingUp className="h-8 w-8 text-primary" />,
        href: "/best-brokers/commodities",
        brokers: await getTopBrokersForCategory("Best Commodities Brokers")
      },
      {
        title: "Best Penny Stock Brokers 2025",
        description: "Specialized platforms for trading penny stocks with affordable fees and wide OTC market access.",
        icon: <Coins className="h-8 w-8 text-primary" />,
        href: "/best-brokers/penny-stocks",
        brokers: await getTopBrokersForCategory("Best Penny Stock Brokers")
      },
      {
        title: "Best International Brokers 2025",
        description: "Global trading platforms offering multi-currency accounts and worldwide market access.",
        icon: <Globe className="h-8 w-8 text-primary" />,
        href: "/best-brokers/international",
        brokers: await getTopBrokersForCategory("Best International Brokers")
      },
    ];

    const regionCategories: CategoryCard[] = [
      {
        title: "Best Brokers in the UK 2025",
        description: "FCA-regulated brokers with excellent service for UK traders.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/uk",
        brokers: await getTopBrokersForCategory("Best Brokers in the UK")
      },
      {
        title: "Best Brokers in the US 2025",
        description: "CFTC and NFA regulated brokers available to US residents.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/us",
        brokers: await getTopBrokersForCategory("Best Brokers in the US")
      },
      {
        title: "Best Brokers in Europe 2025",
        description: "ESMA-compliant brokers serving European traders with multilingual support.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/europe",
        brokers: await getTopBrokersForCategory("Best Brokers in Europe")
      },
      {
        title: "Best Brokers in Australia 2025",
        description: "ASIC-regulated brokers with features tailored for Australian traders.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/australia",
        brokers: await getTopBrokersForCategory("Best Brokers in Australia")
      },
      {
        title: "Best Brokers in Asia 2025",
        description: "Reliable brokers serving Asian markets with local support and payment methods.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/asia",
        brokers: await getTopBrokersForCategory("Best Brokers in Asia")
      },
      {
        title: "Best Brokers in Canada 2025",
        description: "IIROC-regulated brokers offering services to Canadian traders.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/canada",
        brokers: await getTopBrokersForCategory("Best Brokers in Canada")
      },
      {
        title: "Best Brokers in India 2025",
        description: "SEBI-regulated brokers with features designed for Indian markets.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/india",
        brokers: await getTopBrokersForCategory("Best Brokers in India")
      },
      {
        title: "Best Brokers in Singapore 2025",
        description: "MAS-regulated brokers serving Singaporean traders with local support.",
        icon: <MapPin className="h-8 w-8 text-primary" />,
        href: "/best-brokers/singapore",
        brokers: await getTopBrokersForCategory("Best Brokers in Singapore")
      },
    ];

    const experienceCategories: CategoryCard[] = [
      {
        title: "Best Brokers for Beginners 2025",
        description: "User-friendly platforms with excellent educational resources and low minimum deposits.",
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        href: "/best-brokers/beginners",
        tag: "Popular",
        brokers: await getTopBrokersForCategory("Best Brokers for Beginners")
      },
      {
        title: "Best Brokers for Intermediate Traders 2025",
        description: "Platforms with balanced features for those with some trading experience.",
        icon: <Star className="h-8 w-8 text-primary" />,
        href: "/best-brokers/intermediate",
        brokers: await getTopBrokersForCategory("Best Brokers for Intermediate Traders")
      },
      {
        title: "Best Brokers for Day Traders 2025",
        description: "Platforms optimized for frequent trading with fast execution and low costs.",
        icon: <Zap className="h-8 w-8 text-primary" />,
        href: "/best-brokers/day-trading",
        brokers: await getTopBrokersForCategory("Best Brokers for Day Traders")
      },
      {
        title: "Best Brokers for Swing Traders 2025",
        description: "Platforms with great charting tools and research for multi-day positions.",
        icon: <TrendingUp className="h-8 w-8 text-primary" />,
        href: "/best-brokers/swing-trading",
        brokers: await getTopBrokersForCategory("Best Brokers for Swing Traders")
      },
      {
        title: "Best Brokers for Professionals 2025",
        description: "Advanced platforms with sophisticated tools for professional traders.",
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        href: "/best-brokers/professional",
        brokers: await getTopBrokersForCategory("Best Brokers for Professionals")
      },
      {
        title: "Best Brokers for Retirement Accounts 2025",
        description: "Platforms specializing in IRA options, retirement planning tools, and tax-advantaged trading.",
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        href: "/best-brokers/retirement",
        brokers: await getTopBrokersForCategory("Best Brokers for Retirement Accounts")
      },
    ];

    const featureCategories: CategoryCard[] = [
      {
        title: "Highest Rated Brokers 2025",
        description: "Top-rated platforms based on verified user reviews and expert analysis.",
        icon: <Award className="h-8 w-8 text-primary" />,
        href: "/best-brokers/highest-rated",
        brokers: await getTopBrokersForCategory("Highest Rated Brokers")
      },
      {
        title: "Most Secure Brokers 2025",
        description: "Brokers with top-tier regulation, segregated funds, and robust security measures.",
        icon: <Shield className="h-8 w-8 text-primary" />,
        href: "/best-brokers/secure",
        brokers: await getTopBrokersForCategory("Most Secure Brokers")
      },
      {
        title: "Best Brokers for Research 2025",
        description: "Platforms offering comprehensive research tools, market analysis, and insights.",
        icon: <ChartPie className="h-8 w-8 text-primary" />,
        href: "/best-brokers/research",
        brokers: await getTopBrokersForCategory("Best Brokers for Research")
      },
      {
        title: "Best Brokers for Education 2025",
        description: "Platforms with extensive learning resources, webinars, and trading courses.",
        icon: <School className="h-8 w-8 text-primary" />,
        href: "/best-brokers/education",
        brokers: await getTopBrokersForCategory("Best Brokers for Education")
      },
      {
        title: "Best Low Deposit Brokers 2025",
        description: "Brokers with very low minimum deposit requirements to start trading.",
        icon: <Wallet className="h-8 w-8 text-primary" />,
        href: "/best-brokers/low-deposit",
        brokers: await getTopBrokersForCategory("Best Low Deposit Brokers")
      },
      {
        title: "Best Brokers for Customer Service 2025",
        description: "Platforms with exceptional customer support available across multiple channels.",
        icon: <UserCheck className="h-8 w-8 text-primary" />,
        href: "/best-brokers/customer-service",
        brokers: await getTopBrokersForCategory("Best Brokers for Customer Service")
      }
    ];

    return {
      typeCategories,
      regionCategories,
      experienceCategories,
      featureCategories
    };
  } catch (error) {
    console.error("Error getting categories with brokers:", error);
    // In case of error, return empty arrays
    return {
      typeCategories: [],
      regionCategories: [],
      experienceCategories: [],
      featureCategories: []
    };
  }
}

export default async function BestBrokersPage() {
  const { typeCategories, regionCategories, experienceCategories, featureCategories } = await getCategoriesWithBrokers();

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Badge className="mb-4">Expert Recommendations</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Best Brokers by Category 2025
        </h1>
        <p className="text-xl text-muted-foreground">
          Find the perfect broker for your trading needs with our expert-curated lists across various categories. Updated May 2025.
        </p>
      </div>

      {/* By Type Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">By Market Type 2025</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground hidden md:block">Find the best broker for your preferred market</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {typeCategories.map((category) => (
            <Link key={category.href} href={category.href} className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {category.icon}
                    {category.tag && (
                      <Badge variant="secondary">{category.tag}</Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {category.brokers?.slice(0, 3).map((broker, idx) => (
                      <li key={idx} className="flex items-center">
                        <Award className="h-3 w-3 mr-2 text-muted-foreground" /> {broker}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* By Region Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">By Region 2025</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground hidden md:block">Find regulated brokers available in your region</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regionCategories.map((category) => (
            <Link key={category.href} href={category.href} className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {category.icon}
                  </div>
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors text-xl">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {category.brokers?.slice(0, 3).map((broker, idx) => (
                      <li key={idx} className="flex items-center">
                        <Award className="h-3 w-3 mr-2 text-muted-foreground" /> {broker}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* By Experience Section */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">By Experience Level 2025</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground hidden md:block">Find the best broker for your trading experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experienceCategories.map((category) => (
            <Link key={category.href} href={category.href} className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {category.icon}
                    {category.tag && (
                      <Badge variant="secondary">{category.tag}</Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {category.brokers?.slice(0, 3).map((broker, idx) => (
                      <li key={idx} className="flex items-center">
                        <Award className="h-3 w-3 mr-2 text-muted-foreground" /> {broker}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* By Features Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">By Features 2025</h2>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground hidden md:block">Find brokers that excel in specific areas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featureCategories.map((category) => (
            <Link key={category.href} href={category.href} className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {category.icon}
                  </div>
                  <CardTitle className="mt-4 group-hover:text-primary transition-colors text-xl">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {category.brokers?.slice(0, 3).map((broker, idx) => (
                      <li key={idx} className="flex items-center">
                        <Award className="h-3 w-3 mr-2 text-muted-foreground" /> {broker}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Can't find what you're looking for? Let us help you find the perfect broker.
        </p>
        <Button asChild size="lg">
          <Link href="/tools/quiz">
            Take Our Broker Finder Quiz
          </Link>
        </Button>
      </div>
    </div>
  );
} 