import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database-types';
import { env } from '@/env';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const category = url.searchParams.get('category');
    
    // Create Supabase client
    const supabase = createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Start the query
    let brokerQuery = supabase
      .from('brokers')
      .select(`
        *,
        broker_categories!inner (
          categories (
            id,
            name
          )
        ),
        reviews (
          id,
          rating,
          comment,
          created_at,
          users (
            id,
            email
          )
        )
      `)
      .order('rating', { ascending: false });
    
    // Apply search query if provided
    if (query) {
      brokerQuery = brokerQuery.ilike('name', `%${query}%`);
    }
    
    // Apply category filter if provided
    if (category) {
      brokerQuery = brokerQuery.eq('broker_categories.categories.id', category);
    }
    
    // Apply pagination
    const { data: brokers, error, count } = await brokerQuery
      .range(offset, offset + limit - 1)
      .limit(limit);
    
    if (error) {
      console.error('Error searching brokers:', error);
      return NextResponse.json({ error: 'Failed to search brokers' }, { status: 500 });
    }
    
    // If there are few or no results from the database, supplement with web search
    if (brokers.length < 3 && query) {
      try {
        // Use FireCrawl search to find additional broker information
        const webSearchResponse = await fetch('/api/search-broker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query })
        });
        
        if (webSearchResponse.ok) {
          const webData = await webSearchResponse.json();
          
          // Process web search results to extract potential broker information
          if (webData.urls && webData.urls.length > 0) {
            // Add a special flag to indicate these results are from web search
            const webBrokers = webData.urls.slice(0, 5).map((url: string) => {
              const domain = new URL(url).hostname.replace('www.', '');
              return {
                id: `web-${domain}`,
                name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
                logo_url: `https://www.google.com/s2/favicons?domain=${url}&sz=128`,
                country: 'Unknown',
                rating: null,
                isWebResult: true,
                url
              };
            });
            
            // Add web results to the response
            return NextResponse.json({
              brokers: [...brokers, ...webBrokers],
              count: (count || brokers.length) + webBrokers.length,
              hasWebResults: true
            });
          }
        }
      } catch (webError) {
        console.error('Error fetching web results:', webError);
        // Continue with database results if web search fails
      }
    }
    
    return NextResponse.json({
      brokers,
      count: count || brokers.length,
      hasWebResults: false
    });
  } catch (error) {
    console.error('Error in broker search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 