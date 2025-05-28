"use client";

import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";

interface SEOEnhancerProps {
  pageType: 'homepage' | 'brokerReview' | 'category' | 'blog' | 'comparison';
  data?: any;
  broker?: any;
  category?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function SEOEnhancer({ pageType, data, broker, category, breadcrumbs }: SEOEnhancerProps) {
  const renderHomepageSchema = () => (
    <>
      <StructuredData 
        type="website" 
        data={{
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description
        }} 
      />
      <StructuredData 
        type="organization" 
        data={{
          socialLinks: [
            siteConfig.social.twitter,
            siteConfig.social.facebook,
            siteConfig.social.linkedin,
            siteConfig.social.instagram,
            siteConfig.social.youtube
          ]
        }} 
      />
      <StructuredData 
        type="faq" 
        data={{
          questions: [
            {
              question: "What should I look for in a broker?",
              answer: "When choosing a broker, consider regulatory compliance, trading fees, available markets, platform usability, customer support, and educational resources."
            },
            {
              question: "How do I know if a broker is safe?",
              answer: "Look for regulation from respected authorities like FCA, ASIC, CySEC, or SEC. Also check for segregated client funds and investor protection schemes."
            },
            {
              question: "What's the difference between ECN and Market Maker brokers?",
              answer: "ECN brokers connect traders directly to liquidity providers, while Market Makers take the opposite side of trades. ECN typically offers more transparency but may have higher fees."
            },
            {
              question: "How much money do I need to start trading?",
              answer: "This varies by broker. Some allow you to start with as little as $10, while others require minimum deposits of $1,000 or more."
            }
          ]
        }} 
      />
    </>
  );

  const renderBrokerReviewSchema = () => {
    if (!broker) return null;
    
    return (
      <>
        <StructuredData 
          type="brokerReview" 
          data={{
            brokerName: broker.name,
            description: broker.description || `${broker.name} is a comprehensive trading platform offering forex, stocks, and other financial instruments.`,
            brokerUrl: broker.website_url,
            logo: broker.logo_url,
            rating: broker.rating || broker.overall_rating || 4.0,
            address: broker.country ? { country: broker.country } : undefined,
            aggregateRating: broker.rating ? {
              ratingValue: broker.rating,
              ratingCount: broker.review_count || 100
            } : undefined,
            offers: broker.min_deposit !== undefined ? {
              minDeposit: broker.min_deposit
            } : undefined,
            reviewBody: `Comprehensive review of ${broker.name} covering trading conditions, regulation, platforms, and user experience. ${broker.regulations ? `Regulated by ${broker.regulations}.` : ''} ${broker.min_deposit !== undefined ? `Minimum deposit: $${broker.min_deposit}.` : ''}`
          }} 
        />
        {breadcrumbs && (
          <StructuredData 
            type="breadcrumb" 
            data={{
              items: breadcrumbs
            }} 
          />
        )}
      </>
    );
  };

  const renderCategorySchema = () => {
    if (!category) return null;
    
    return (
      <>
        <StructuredData 
          type="website" 
          data={{
            name: `${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | ${siteConfig.name}`,
            url: `${siteConfig.url}/best-brokers/${category}`,
            description: `Discover the best ${category.replace(/-/g, ' ')} brokers with our expert reviews and detailed comparisons.`
          }} 
        />
        {breadcrumbs && (
          <StructuredData 
            type="breadcrumb" 
            data={{
              items: breadcrumbs
            }} 
          />
        )}
      </>
    );
  };

  const renderBlogSchema = () => {
    if (!data) return null;
    
    return (
      <>
        <StructuredData 
          type="article" 
          data={{
            title: data.title,
            description: data.description || data.excerpt,
            image: data.featuredImage,
            datePublished: data.publishedAt || new Date().toISOString(),
            dateModified: data.updatedAt || new Date().toISOString(),
            author: data.author || "BrokerAnalysis Team",
            url: `${siteConfig.url}/blog/${data.slug}`
          }} 
        />
        {breadcrumbs && (
          <StructuredData 
            type="breadcrumb" 
            data={{
              items: breadcrumbs
            }} 
          />
        )}
      </>
    );
  };

  const renderComparisonSchema = () => {
    if (!data || !data.brokers) return null;
    
    return (
      <>
        <StructuredData 
          type="website" 
          data={{
            name: `${data.brokers.map((b: any) => b.name).join(' vs ')} Comparison | ${siteConfig.name}`,
            url: data.url || `${siteConfig.url}/compare`,
            description: `Compare ${data.brokers.map((b: any) => b.name).join(' and ')} side by side. Detailed analysis of features, fees, and trading conditions.`
          }} 
        />
        {breadcrumbs && (
          <StructuredData 
            type="breadcrumb" 
            data={{
              items: breadcrumbs
            }} 
          />
        )}
      </>
    );
  };

  switch (pageType) {
    case 'homepage':
      return renderHomepageSchema();
    case 'brokerReview':
      return renderBrokerReviewSchema();
    case 'category':
      return renderCategorySchema();
    case 'blog':
      return renderBlogSchema();
    case 'comparison':
      return renderComparisonSchema();
    default:
      return null;
  }
}
