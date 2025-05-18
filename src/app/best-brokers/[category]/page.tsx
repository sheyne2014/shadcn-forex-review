import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ExternalLink, Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { getAllCategorySlugs } from "@/lib/route-generation";
import { capitalize } from "@/lib/utils";
import { getBrokersByCategory } from "@/lib/supabase/broker-client";
import { notFound } from "next/navigation";
import Image from "next/image";

// Generate static params for all category pages
export async function generateStaticParams() {
  const categorySlugs = await getAllCategorySlugs();
  
  return categorySlugs.map(slug => ({
    category: slug,
  }));
}

// Generate metadata for the category page
export async function generateMetadata({ 
  params 
}: { 
  params: { category: string } 
}): Promise<Metadata> {
  const { category } = params;
  const categoryName = category.replace(/-/g, ' ');
  const capitalizedCategory = capitalize(categoryName);
  
  // Prepare SEO-friendly title and description
  const currentYear = new Date().getFullYear();
  const title = `Best ${capitalizedCategory} Brokers ${currentYear} | Top-Rated ${capitalizedCategory} Trading Platforms | ${siteConfig.name}`;
  const description = `Compare the best ${categoryName} brokers with competitive fees, reliable platforms, and top-tier service. Expert-reviewed and ranked for all types of ${categoryName} traders.`;
  
  return {
    title,
    description,
    openGraph: {
      title: `Top 10 Best ${capitalizedCategory} Brokers for ${currentYear} | Ranked by Expert Analysis`,
      description,
      type: "website",
      url: `${siteConfig.url}/best-brokers/${category}`,
      images: [
        {
          url: `${siteConfig.url}/images/categories/${category}-brokers.png`,
          width: 1200,
          height: 630,
          alt: `Best ${capitalizedCategory} Brokers`
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Best ${capitalizedCategory} Brokers ${currentYear} | Top-Rated Trading Platforms`,
      description,
      images: [`${siteConfig.url}/images/categories/${category}-brokers.png`],
    },
    keywords: [
      `best ${categoryName} brokers`, 
      `top ${categoryName} trading platforms`, 
      `${categoryName} broker comparison`,
      `regulated ${categoryName} brokers`,
      `${categoryName} trading`,
      `${categoryName} investing`,
      `${currentYear} ${categoryName} brokers`
    ],
    alternates: {
      canonical: `${siteConfig.url}/best-brokers/${category}`,
    },
  };
}

// Generate JSON-LD structured data for brokers list
function generateListingJsonLd(topBrokers: any[], categoryName: string) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${categoryName} Brokers`,
    description: `Top-rated ${categoryName.toLowerCase()} brokers of ${new Date().getFullYear()}`,
    numberOfItems: topBrokers.length,
    itemListElement: topBrokers.map((broker, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'FinancialService',
        name: broker.name,
        description: `${broker.name} ${categoryName.toLowerCase()} broker with ${broker.trading_fee ? `${broker.trading_fee}% fees` : 'competitive fees'} and ${broker.min_deposit ? `$${broker.min_deposit} minimum deposit` : 'accessible deposit requirements'}`,
        image: broker.logo_url,
        url: `${siteConfig.url}/broker/${broker.id}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: broker.rating || '4.5',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '50'
        }
      }
    }))
  };

  return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

// Define category-specific content
type CategoryContent = {
  [key: string]: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
    faqs: Array<{ question: string; answer: string; }>;
  }
};

const categoryContent: CategoryContent = {
  'forex': {
    title: 'Forex',
    description: 'Compare the top forex brokers with tight spreads, fast execution, and comprehensive trading tools. All platforms thoroughly tested by our expert team.',
    pros: [
      'Access to the largest financial market in the world',
      '24-hour trading during weekdays',
      'High liquidity and low transaction costs',
      'Ability to profit in both rising and falling markets'
    ],
    cons: [
      'Volatility can lead to significant losses',
      'Leverage can amplify losses',
      'Complex market influenced by many factors',
      'Requires significant knowledge and experience'
    ],
    faqs: [
      {
        question: 'What is the minimum deposit for forex trading?',
        answer: 'Minimum deposits vary widely between brokers. Some brokers offer accounts with as little as $5-$50, while others may require $100-$1000. However, we recommend starting with at least $200-$500 for more effective trading even if lower options are available.'
      },
      {
        question: 'What makes a good forex broker?',
        answer: 'A good forex broker offers tight spreads, fast execution, reliable platforms, strong regulation, responsive customer support, and comprehensive educational resources. The best broker for you depends on your specific trading style, experience level, and needs.'
      },
      {
        question: 'Is forex trading suitable for beginners?',
        answer: 'Forex trading can be suitable for beginners, but it requires education and practice. Start with a demo account, learn about currency pairs, risk management, and trading strategies before risking real money. Consider brokers with good educational resources and low minimum deposits.'
      }
    ]
  },
  'stocks': {
    title: 'Stocks',
    description: 'Find the best stock brokers with low fees, powerful trading platforms, and extensive research tools. We\'ve tested dozens of platforms to help you choose the right broker for your investment goals.',
    pros: [
      'Ownership in real companies',
      'Potential for dividend income and capital appreciation',
      'Historically strong long-term returns',
      'Well-regulated markets with transparent pricing'
    ],
    cons: [
      'Individual stocks can be volatile',
      'Requires research and company analysis',
      'Limited trading hours',
      'Higher minimum investments than some other markets'
    ],
    faqs: [
      {
        question: 'How do I choose the best stock broker?',
        answer: 'The best stock broker depends on your needs. Consider factors like commission structure, available markets, research tools, trading platform quality, customer service, and educational resources. Long-term investors may prioritize different features than active traders.'
      },
      {
        question: 'What\'s the difference between discount and full-service brokers?',
        answer: 'Discount brokers offer lower fees and self-directed trading platforms but limited guidance. Full-service brokers provide personalized investment advice, dedicated brokers, and comprehensive wealth management services, but charge higher fees.'
      },
      {
        question: 'How much money do I need to start stock trading?',
        answer: 'Many online brokers now offer commission-free trading with no minimum deposit requirements. You can technically start with just enough to buy a single share or even fractional shares. However, a reasonable starting amount of $500-$1000 provides more options and flexibility.'
      }
    ]
  },
  // Add more categories as needed
};

// Default category content for categories not explicitly defined
const defaultCategoryContent = {
  title: 'Trading',
  description: 'Compare the top trading brokers with competitive pricing, reliable platforms, and excellent service. Our experts have thoroughly tested each platform to bring you the best options.',
  pros: [
    'Access to global financial markets',
    'Potential for profits in various market conditions',
    'Multiple asset classes available',
    'Advanced trading tools and platforms'
  ],
  cons: [
    'Trading involves significant risk',
    'Requires knowledge and experience',
    'Time commitment for research and analysis',
    'Potential for losses, especially with leveraged products'
  ],
  faqs: [
    {
      question: 'How do I choose the right broker?',
      answer: 'Consider factors like fees, available markets, platform features, customer support quality, educational resources, and regulatory status. The best broker depends on your specific trading style, experience level, and financial goals.'
    },
    {
      question: 'What\'s the minimum amount needed to start trading?',
      answer: 'Minimum requirements vary by broker and market. Some brokers allow you to start with as little as $50-$100, while others may require $1,000 or more. However, a reasonable starting amount is typically $500-$2,000 to provide adequate risk management.'
    },
    {
      question: 'Is online trading safe?',
      answer: 'When using regulated brokers, online trading is generally safe from a platform security perspective. However, trading itself carries financial risk. Use regulated brokers, enable security features like two-factor authentication, and never invest money you cannot afford to lose.'
    }
  ]
};

export default async function BestCategoryBrokersPage({ 
  params 
}: { 
  params: { category: string } 
}) {
  const { category } = params;
  const categoryName = category.replace(/-/g, ' ');
  const capitalizedCategory = capitalize(categoryName);
  
  // Get the content for this category, or use default if not found
  const content = categoryContent[category] || {
    ...defaultCategoryContent,
    title: capitalizedCategory
  };
  
  // Get brokers for this category
  const { data: brokers, error } = await getBrokersByCategory(category);
  
  if (error || !brokers || brokers.length === 0) {
    console.error(`Error fetching ${category} brokers:`, error);
    notFound();
  }
  
  const topBrokers = brokers.slice(0, 10); // Limit to top 10 brokers
  
  return (
    <>
      {/* Add JSON-LD structured data */}
      <div dangerouslySetInnerHTML={{ __html: generateListingJsonLd(topBrokers, capitalizedCategory) }} />
      
      <div className="container py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Updated {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Best {content.title} Brokers
          </h1>
          <p className="text-xl text-muted-foreground">
            {content.description}
          </p>
        </div>
        
        {/* Quick Navigation */}
        <div className="bg-muted/30 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="#comparison">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Broker Comparison
              </Button>
            </Link>
            <Link href="#how-we-rank">
              <Button variant="outline" className="w-full justify-start">
                <Info className="mr-2 h-4 w-4" />
                How We Rank
              </Button>
            </Link>
            <Link href="#regulations">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Regulations
              </Button>
            </Link>
            <Link href="#methodology">
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="mr-2 h-4 w-4" />
                Methodology
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Top Brokers */}
        <section className="mb-16" id="comparison">
          <h2 className="text-3xl font-bold mb-8">Top {topBrokers.length} {content.title} Brokers</h2>
          
          <div className="space-y-6">
            {topBrokers.map((broker, index) => (
              <Card key={broker.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/4 bg-muted/30 flex flex-col items-center justify-center p-6 border-r">
                    <Badge className="mb-2">{`#${index + 1}`}</Badge>
                    <div className="w-[120px] h-[60px] bg-white flex items-center justify-center rounded mb-4">
                      <Image 
                        src={broker.logo_url || `https://placehold.co/120x60/png?text=${encodeURIComponent(broker.name)}`}
                        alt={`${broker.name} logo`}
                        width={120}
                        height={60}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center">{broker.name}</h3>
                    <div className="flex items-center mt-2 mb-4">
                      <span className="text-yellow-500 font-bold">{broker.rating || "4.5"}</span>
                      <span className="text-muted-foreground text-sm ml-1">/5</span>
                    </div>
                    <div className="space-y-2 w-full">
                      <Button asChild className="w-full">
                        <Link href={`/broker/${broker.id}`}>Visit Broker</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/broker/${broker.id}`}>Read Review</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4 p-6">
                    <Tabs defaultValue="overview">
                      <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Min. Deposit</h4>
                            <p className="font-medium">${broker.min_deposit || "Varies"}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Trading Fee</h4>
                            <p className="font-medium">{broker.trading_fee ? `${broker.trading_fee}%` : "Varies by market"}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Country</h4>
                            <p className="font-medium">{broker.country || "Global"}</p>
                          </div>
                          <div className="md:col-span-3">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Regulation</h4>
                            <p className="font-medium">{broker.regulations || "Multiple regulatory bodies"}</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="features">
                        <div className="space-y-2">
                          <p className="text-sm">{broker.description || `${broker.name} is a leading ${content.title.toLowerCase()} broker offering competitive pricing, advanced trading platforms, and excellent customer service.`}</p>
                          <div className="mt-4">
                            <Button asChild size="sm" variant="outline" className="text-xs">
                              <Link href={`/broker/${broker.id}`}>View Full Details</Link>
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Pros & Cons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Pros & Cons of {content.title} Trading</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Advantages</h3>
                  <ul className="space-y-2">
                    {content.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-red-600">Disadvantages</h3>
                  <ul className="space-y-2">
                    {content.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="h-5 w-5 text-red-600 mr-2 mt-0.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-muted/30 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start trading {content.title.toLowerCase()}?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Open an account with one of our recommended brokers today, or use our comparison tool to find the perfect broker for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/find-my-broker">
                Find My Broker
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/broker/${topBrokers[0]?.id || ''}`}>
                Top Rated Broker
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
} 