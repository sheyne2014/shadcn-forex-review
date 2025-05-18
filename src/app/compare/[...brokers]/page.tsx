import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrokerCompareSelector } from "@/components/compare/BrokerCompareSelector";
import { BrokerCompareDetails } from "@/components/compare/BrokerCompareDetails";
import { Suspense } from "react";
import { db } from "@/lib/database";
import { siteConfig } from "@/config/site";
import { getBrokerComparisonPairs } from "@/lib/route-generation";
import { supabaseBrokerClient } from "@/lib/supabase/broker-client";

// Generate static params for all comparison pages
export async function generateStaticParams() {
  const comparisonPairs = await getBrokerComparisonPairs();
  
  return comparisonPairs.map(pair => ({
    brokers: [pair],
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: { brokers: string[] } 
}): Promise<Metadata> {
  // Format should be /compare/broker1-vs-broker2
  const brokers = params?.brokers || [];
  if (brokers.length !== 1) {
    return {
      title: `Compare Trading Brokers | ${siteConfig.name}`,
      description: "Compare trading brokers side by side to find the best platform for your needs. Features detailed metrics on fees, platforms, regulation and more."
    };
  }
  
  // Parse the broker comparison string (broker1-vs-broker2)
  const comparisonString = brokers[0];
  const brokerNames = comparisonString.split('-vs-').map(part => 
    part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
  
  if (brokerNames.length !== 2) {
    return {
      title: `Compare Trading Brokers | ${siteConfig.name}`,
      description: "Compare trading brokers side by side to find the best platform for your needs. Features detailed metrics on fees, platforms, regulation and more."
    };
  }
  
  const year = new Date().getFullYear();
  const month = new Date().toLocaleString('default', { month: 'long' });
  
  // Create SEO-friendly title and description
  const title = `${brokerNames[0]} vs ${brokerNames[1]} | Detailed ${year} Comparison | ${siteConfig.name}`;
  const description = `Compare ${brokerNames[0]} vs ${brokerNames[1]} side by side. Updated ${month} ${year} with latest fees, trading features, platforms, and expert analysis to help you choose the best broker.`;
  
  return {
    title,
    description,
    openGraph: {
      title: `${brokerNames[0]} vs ${brokerNames[1]} | Which Broker Is Better in ${year}?`,
      description,
      type: "website",
      url: `${siteConfig.url}/compare/${comparisonString}`,
      images: [
        {
          url: `${siteConfig.url}/images/comparisons/${comparisonString}.png`,
          width: 1200,
          height: 630,
          alt: `${brokerNames[0]} vs ${brokerNames[1]} Comparison`
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brokerNames[0]} vs ${brokerNames[1]} | ${year} Comparison`,
      description,
      images: [`${siteConfig.url}/images/comparisons/${comparisonString}.png`],
    },
    keywords: [
      `${brokerNames[0]} vs ${brokerNames[1]}`, 
      `compare ${brokerNames[0]} and ${brokerNames[1]}`, 
      `${brokerNames[0]} ${brokerNames[1]} comparison`,
      `best between ${brokerNames[0]} and ${brokerNames[1]}`,
      `${brokerNames[0]} or ${brokerNames[1]}`,
      `${brokerNames[0]} review`,
      `${brokerNames[1]} review`
    ],
    alternates: {
      canonical: `${siteConfig.url}/compare/${comparisonString}`,
    },
  };
}

// Function to generate JSON-LD structured data for comparison
async function generateComparisonJsonLd(comparisonString: string, broker1Name: string, broker2Name: string) {
  // Try to fetch actual broker data if available
  try {
    const brokerSlugs = comparisonString.split('-vs-');
    const { data: brokers } = await supabaseBrokerClient
      .from('brokers')
      .select('*')
      .or(`name.ilike.%${brokerSlugs[0].replace(/-/g, '%')}%,name.ilike.%${brokerSlugs[1].replace(/-/g, '%')}%`)
      .limit(2);
    
    if (brokers && brokers.length === 2) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${broker1Name} vs ${broker2Name} Comparison`,
        description: `Detailed comparison between ${broker1Name} and ${broker2Name} trading platforms, analyzing fees, features, regulation, and more.`,
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '4.8',
            bestRating: '5',
            worstRating: '1'
          },
          author: {
            '@type': 'Organization',
            name: siteConfig.name
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.name
          }
        },
        offers: {
          '@type': 'AggregateOffer',
          highPrice: Math.max(brokers[0].min_deposit || 0, brokers[1].min_deposit || 0),
          lowPrice: Math.min(
            brokers[0].min_deposit > 0 ? brokers[0].min_deposit : 1000, 
            brokers[1].min_deposit > 0 ? brokers[1].min_deposit : 1000
          ),
          priceCurrency: 'USD',
          offerCount: 2
        }
      };
      
      return jsonLd;
    }
  } catch (error) {
    console.error('Error generating comparison JSON-LD:', error);
  }
  
  // Fallback generic JSON-LD if broker data couldn't be fetched
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${broker1Name} vs ${broker2Name} Broker Comparison`,
    description: `Comprehensive comparison between ${broker1Name} and ${broker2Name} trading brokers, analyzing trading fees, platforms, regulation status, and customer service.`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`
      }
    },
    image: `${siteConfig.url}/images/comparisons/${comparisonString}.png`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString()
  };
}

export default async function CompareBrokersPage({ 
  params 
}: { 
  params: { brokers: string[] } 
}) {
  const brokers = params?.brokers || [];
  
  // Handle invalid paths
  if (brokers.length !== 1) {
    // Show broker selection UI
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Compare Brokers</h1>
        <p className="text-muted-foreground mb-8">
          Select two brokers to compare them side by side.
        </p>
        <Suspense fallback={<div>Loading broker selection...</div>}>
          <BrokerCompareSelector 
            brokers={[
              // Provide default brokers for selection
              { id: "broker1", name: "Broker 1" },
              { id: "broker2", name: "Broker 2" },
              { id: "broker3", name: "Broker 3" },
              { id: "broker4", name: "Broker 4" },
              { id: "broker5", name: "Broker 5" },
            ]} 
            initialBroker1="broker1" 
            initialBroker2="broker2" 
          />
        </Suspense>
      </div>
    );
  }
  
  // Parse the broker comparison string (broker1-vs-broker2)
  const comparisonString = brokers[0];
  const brokerParts = comparisonString.split('-vs-');
  
  if (brokerParts.length !== 2) {
    notFound();
  }
  
  // Parse broker IDs from the comparison string
  const broker1Id = brokerParts[0];
  const broker2Id = brokerParts[1];
  
  // Format for display
  const brokerNames = brokerParts.map(part => 
    part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
  
  // Generate the JSON-LD structured data
  const jsonLd = await generateComparisonJsonLd(comparisonString, brokerNames[0], brokerNames[1]);
  
  return (
    <>
      {/* Add the JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-2">
          {brokerNames[0]} vs {brokerNames[1]}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Detailed comparison of features, fees, platforms and more
        </p>
        
        <Suspense fallback={<div>Loading comparison data...</div>}>
          <BrokerCompareDetails 
            broker1Id={broker1Id} 
            broker2Id={broker2Id} 
          />
        </Suspense>
      </div>
    </>
  );
} 