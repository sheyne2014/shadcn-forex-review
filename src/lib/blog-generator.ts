import { webSearch, extractQuestionsFromResults, searchTrendingTopics, getTrendingQuestions, searchMarketTrends } from './web-search';
import { context7Generate } from './context7';
import { getUnsplashImage } from './unsplash';
import { selectContentType, ContentType, CONTENT_TYPES } from './content-types';

interface BrokerData {
  id: string;
  name: string;
  description?: string;
  rating?: number;
  regulation?: string;
  min_deposit?: number;
  spreads?: string;
  platforms?: string[];
  website_url?: string;
}

interface BlogContentRequest {
  broker?: BrokerData;
  contentType?: ContentType;
  searchQuery: string;
  targetKeywords: string[];
  category?: string;
}

interface GeneratedBlogContent {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
  tags: string[];
  featuredImage: string;
  keyTakeaways: string[];
}

/**
 * Generate comprehensive blog content using Context7 and web research
 */
export async function generateBlogContent(request: BlogContentRequest): Promise<GeneratedBlogContent> {
  const { broker, contentType, searchQuery, targetKeywords, category } = request;

  // Determine content type if not provided
  const selectedContentType = contentType || selectContentType();

  console.log(`🎯 Generating ${selectedContentType.name} content`);
  if (broker) {
    console.log(`📊 Broker focus: ${broker.name}`);
  } else {
    console.log(`📈 Category focus: ${selectedContentType.category}`);
  }

  // Step 1: Research current trends and questions
  const searchResults = await webSearch(searchQuery, { maxResults: 10, dateRange: 'month' });
  const trendingQuestions = extractQuestionsFromResults(searchResults.results);

  // Step 2: Get additional trending topics for the category
  const additionalTopics = await searchTrendingTopics(selectedContentType.category);
  const categoryQuestions = await getTrendingQuestions(selectedContentType.category);
  const marketTrends = await searchMarketTrends(selectedContentType.category);

  // Combine all questions and trends
  const allQuestions = [...trendingQuestions, ...categoryQuestions, ...marketTrends.questions];
  const allTrends = [...additionalTopics, ...marketTrends.trends];

  // Step 3: Generate blog structure and content
  const blogStructure = await generateBlogStructure(
    selectedContentType,
    broker,
    allQuestions,
    targetKeywords,
    allTrends
  );

  // Step 4: Generate detailed content for each section
  const fullContent = await generateFullContent(
    blogStructure,
    selectedContentType,
    broker || {
      id: 'unknown',
      name: 'Unknown Broker',
      rating: 4.0,
      description: 'A trading broker',
      regulation: 'Various',
      min_deposit: 100
    },
    searchResults.results
  );

  // Step 5: Generate SEO metadata
  const seoData = await generateSEOMetadata(blogStructure.title, fullContent, targetKeywords);

  // Step 6: Get featured image
  const featuredImage = await getFeaturedImage(
    broker?.name || selectedContentType.category,
    blogStructure.title,
    selectedContentType.category
  );

  // Step 7: Calculate reading time
  const wordCount = fullContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 225); // Average reading speed

  return {
    title: blogStructure.title,
    slug: generateSlug(blogStructure.title),
    content: fullContent,
    excerpt: generateExcerpt(fullContent),
    seoTitle: seoData.title,
    seoDescription: seoData.description,
    readingTime,
    tags: blogStructure.tags,
    featuredImage,
    keyTakeaways: blogStructure.keyTakeaways
  };
}

/**
 * Generate blog structure using Context7
 */
async function generateBlogStructure(
  contentType: ContentType,
  broker: BrokerData | undefined,
  questions: string[],
  keywords: string[],
  trends: string[]
) {
  const prompt = `
Create a comprehensive blog post structure for a financial website.

Content Type: ${contentType.name}
Category: ${contentType.category}
Target Audience: ${contentType.targetAudience}

${broker ? `
Broker Focus:
- Broker: ${broker.name}
- Rating: ${broker.rating || 'N/A'}/5
- Regulation: ${broker.regulation || 'Check official website'}
- Min Deposit: ${broker.min_deposit ? '$' + broker.min_deposit : 'Varies'}
` : ''}

Research Context:
- Current trending questions: ${questions.slice(0, 8).join(', ')}
- Market trends: ${trends.slice(0, 5).join(', ')}
- Primary keywords: ${keywords.join(', ')}

Content Structure Template:
${contentType.contentStructure.sections.map(section => `
- ${section.heading}
  Subheadings: ${section.subheadings.join(', ')}
  Key Points: ${section.keyPoints.join(', ')}
  Target Words: ${section.estimatedWords}
`).join('')}

Requirements:
1. Create an engaging, SEO-optimized title (50-60 characters)
2. Include primary keyword: "${keywords[0]}"
3. Use the provided content structure as a guide
4. Target ${contentType.contentStructure.estimatedWordCount}+ words total
5. Include ${contentType.contentStructure.keyTakeawaysCount} key takeaways
6. Create ${contentType.contentStructure.faqCount} FAQ questions
7. Suggest 8-10 relevant tags for ${contentType.category}

Focus on providing value to ${contentType.targetAudience}.

Return as JSON with this structure:
{
  "title": "Blog post title",
  "sections": [
    {
      "heading": "Section heading",
      "subheadings": ["Sub 1", "Sub 2"],
      "keyPoints": ["Point 1", "Point 2", "Point 3"]
    }
  ],
  "faqQuestions": ["Question 1?", "Question 2?"],
  "keyTakeaways": ["Takeaway 1", "Takeaway 2"],
  "tags": ["tag1", "tag2"],
  "targetWordCount": ${contentType.contentStructure.estimatedWordCount}
}
`;

  try {
    const response = await context7Generate(prompt, {
      maxTokens: 1000,
      temperature: 0.7
    });

    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to generate blog structure:', error);

    // Fallback structure
    const fallbackBroker = broker || { name: 'Trading Platform', id: 'unknown' };
    return {
      title: `${fallbackBroker.name} Review 2025: Complete Trading Platform Analysis`,
      sections: [
        {
          heading: `${fallbackBroker.name} Overview and Key Features`,
          subheadings: ['Platform Overview', 'Key Trading Features', 'Account Types'],
          keyPoints: ['Regulation and safety', 'Trading platforms', 'Account options']
        },
        {
          heading: 'Trading Conditions and Fees',
          subheadings: ['Spreads and Commissions', 'Deposit and Withdrawal', 'Trading Costs'],
          keyPoints: ['Competitive spreads', 'Fee structure', 'Payment methods']
        },
        {
          heading: 'Platform and Tools Analysis',
          subheadings: ['Trading Platforms', 'Research Tools', 'Mobile Trading'],
          keyPoints: ['Platform features', 'Analysis tools', 'Mobile app']
        },
        {
          heading: `${fallbackBroker.name} Pros and Cons`,
          subheadings: ['Advantages', 'Disadvantages', 'Who Should Use'],
          keyPoints: ['Main benefits', 'Potential drawbacks', 'Target audience']
        }
      ],
      faqQuestions: [
        `Is ${fallbackBroker.name} regulated and safe?`,
        `What are ${fallbackBroker.name}'s trading fees?`,
        `Does ${fallbackBroker.name} offer demo accounts?`,
        `What trading platforms does ${fallbackBroker.name} provide?`,
        `How does ${fallbackBroker.name} compare to other brokers?`
      ],
      keyTakeaways: [
        `${fallbackBroker.name} is a trading broker with competitive features`,
        'Multiple trading platforms available for different trader types',
        'Comprehensive fee structure with transparent pricing',
        'Suitable for both beginner and experienced traders',
        'Strong customer support and educational resources'
      ],
      tags: [
        fallbackBroker.name.toLowerCase().replace(/\s+/g, '-'),
        'forex-broker',
        'trading-platform',
        'broker-review',
        'forex-trading',
        'online-trading',
        'trading-analysis',
        'broker-comparison'
      ],
      targetWordCount: 2000
    };
  }
}

/**
 * Generate full content for each section
 */
async function generateFullContent(structure: any, contentType: any, broker: BrokerData, searchResults: any[]): Promise<string> {
  let fullContent = '';

  // Add introduction
  const introPrompt = `
Write an engaging introduction (200-250 words) for a blog post titled "${structure.title}".

Include:
- Hook that grabs attention
- Brief overview of ${broker.name}
- What readers will learn
- Primary keyword: "${broker.name.toLowerCase()} review"

Write in a professional but accessible tone for forex traders.
`;

  try {
    const introduction = await context7Generate(introPrompt, { maxTokens: 300 });
    fullContent += `${introduction}\n\n`;
  } catch (error) {
    console.error('Failed to generate introduction:', error);
    fullContent += `In this comprehensive review, we'll examine ${broker.name} in detail, covering everything from trading conditions to platform features. Whether you're a beginner or experienced trader, this analysis will help you determine if ${broker.name} is the right broker for your trading needs.\n\n`;
  }

  // Add table of contents
  fullContent += '## Table of Contents\n\n';
  structure.sections.forEach((section: any, index: number) => {
    fullContent += `${index + 1}. [${section.heading}](#${generateAnchor(section.heading)})\n`;
  });
  fullContent += `${structure.sections.length + 1}. [Frequently Asked Questions](#frequently-asked-questions)\n`;
  fullContent += `${structure.sections.length + 2}. [Conclusion](#conclusion)\n\n`;

  // Generate content for each section
  for (const section of structure.sections) {
    fullContent += await generateSectionContent(section, broker);
  }

  // Add FAQ section
  fullContent += await generateFAQSection(structure.faqQuestions, broker);

  // Add conclusion
  fullContent += await generateConclusion(broker, structure.keyTakeaways);

  return fullContent;
}

/**
 * Generate content for a specific section
 */
async function generateSectionContent(section: any, broker: BrokerData): Promise<string> {
  const prompt = `
Write a detailed section for a ${broker.name} review blog post.

Section: ${section.heading}
Key points to cover: ${section.keyPoints.join(', ')}
Subheadings: ${section.subheadings.join(', ')}

Requirements:
- 400-500 words
- Include relevant subheadings (H3)
- Mention specific features and benefits
- Include data and facts where possible
- Professional tone for forex traders
- Include internal linking opportunities

Write in markdown format.
`;

  try {
    const content = await context7Generate(prompt, { maxTokens: 600 });
    return `## ${section.heading}\n\n${content}\n\n`;
  } catch (error) {
    console.error(`Failed to generate section content for ${section.heading}:`, error);

    // Fallback content
    return `## ${section.heading}\n\n${section.keyPoints.map((point: string) => `- ${point}`).join('\n')}\n\n`;
  }
}

/**
 * Generate FAQ section
 */
async function generateFAQSection(questions: string[], broker: BrokerData): Promise<string> {
  let faqContent = '## Frequently Asked Questions\n\n';

  for (const question of questions) {
    const answerPrompt = `
Answer this question about ${broker.name} in 2-3 sentences:
"${question}"

Provide a helpful, accurate answer based on typical broker features. Be specific but concise.
`;

    try {
      const answer = await context7Generate(answerPrompt, { maxTokens: 150 });
      faqContent += `### ${question}\n\n${answer}\n\n`;
    } catch (error) {
      console.error(`Failed to generate FAQ answer for: ${question}`, error);
      faqContent += `### ${question}\n\nPlease check ${broker.name}'s official website for the most current information about this topic.\n\n`;
    }
  }

  return faqContent;
}

/**
 * Generate conclusion section
 */
async function generateConclusion(broker: BrokerData, keyTakeaways: string[]): Promise<string> {
  const prompt = `
Write a compelling conclusion (200-250 words) for a ${broker.name} review.

Key takeaways to summarize:
${keyTakeaways.map(takeaway => `- ${takeaway}`).join('\n')}

Include:
- Summary of main points
- Final recommendation
- Call to action to visit broker or read more reviews
- Encourage readers to do their own research

Professional tone for forex traders.
`;

  try {
    const conclusion = await context7Generate(prompt, { maxTokens: 300 });
    return `## Conclusion\n\n${conclusion}\n\n`;
  } catch (error) {
    console.error('Failed to generate conclusion:', error);
    return `## Conclusion\n\n${broker.name} offers a comprehensive trading experience with competitive features for forex traders. Based on our analysis, it provides good value for both beginners and experienced traders. We recommend visiting their official website to learn more and consider opening a demo account to test their platform.\n\n**Remember**: Always conduct your own research and consider your risk tolerance before choosing a forex broker.\n\n`;
  }
}

// Helper functions
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

function generateAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function generateExcerpt(content: string): string {
  // Remove markdown and get first 160 characters
  const plainText = content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1');

  return plainText.substring(0, 160).trim() + '...';
}

async function generateSEOMetadata(title: string, content: string, keywords: string[]) {
  return {
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: generateExcerpt(content)
  };
}

async function getFeaturedImage(subject: string, title: string, category: string): Promise<string> {
  try {
    // Category-specific search terms for better image relevance
    const categorySearchTerms = {
      brokers: ['forex trading', 'trading platform', 'financial charts', 'stock market'],
      forex: ['forex trading', 'currency exchange', 'financial charts', 'trading desk'],
      stocks: ['stock market', 'financial charts', 'trading floor', 'investment'],
      crypto: ['cryptocurrency', 'bitcoin', 'blockchain', 'digital currency'],
      options: ['options trading', 'financial derivatives', 'trading charts', 'investment'],
      cfd: ['CFD trading', 'financial charts', 'trading platform', 'derivatives'],
      etf: ['ETF investing', 'index funds', 'portfolio', 'investment'],
      trading: ['day trading', 'financial charts', 'trading desk', 'market analysis'],
      investing: ['investment', 'portfolio', 'financial planning', 'wealth management']
    };

    const searchTerms = categorySearchTerms[category as keyof typeof categorySearchTerms] ||
                       categorySearchTerms.trading;

    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

    return await getUnsplashImage(randomTerm);
  } catch (error) {
    console.error('Failed to get featured image:', error);
    // Return category-specific default image
    const defaultImages = {
      brokers: '/images/blog/default-broker.jpg',
      forex: '/images/blog/default-forex.jpg',
      stocks: '/images/blog/default-stocks.jpg',
      crypto: '/images/blog/default-crypto.jpg',
      options: '/images/blog/default-options.jpg',
      cfd: '/images/blog/default-cfd.jpg',
      etf: '/images/blog/default-etf.jpg',
      trading: '/images/blog/default-trading.jpg',
      investing: '/images/blog/default-investing.jpg'
    };

    return defaultImages[category as keyof typeof defaultImages] || '/images/blog/default-trading.jpg';
  }
}

export type { BrokerData, BlogContentRequest, GeneratedBlogContent };
