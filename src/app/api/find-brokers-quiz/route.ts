import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server'; // Use server client
import { Broker as SupabaseBrokerRow } from "@/lib/database-types";

interface QuizAnswers {
  experience?: string;
  assets?: string;
  deposit?: string;
  platform?: string;
  frequency?: string;
  priority?: string;
  location?: string;
  // Add other answer keys as defined in your quiz
}

interface QuizBrokerResult extends SupabaseBrokerRow {
  logo_url: string | null;
  supported_assets: string[] | null;
  match_score?: number;
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { answers } = (await request.json()) as { answers: QuizAnswers };

    if (!answers) {
      return NextResponse.json({ error: 'Missing quiz answers' }, { status: 400 });
    }

    let query = supabase.from('brokers').select('* (id, name, logo_url, min_deposit, trading_fee, regulations, supported_assets, country, rating, description, url, created_at)');

    // Apply filters based on answers - This is a simplified example
    if (answers.deposit) {
      switch (answers.deposit) {
        case 'small': // < $100
          query = query.lt('min_deposit', 100);
          break;
        case 'medium': // $100 - $500
          query = query.gte('min_deposit', 100).lte('min_deposit', 500);
          break;
        case 'large': // $500 - $2000
          query = query.gte('min_deposit', 500).lte('min_deposit', 2000);
          break;
        // Add more cases for other deposit ranges
      }
    }

    if (answers.assets && answers.assets !== 'any') {
      // Assuming answers.assets is a single string like 'forex', 'stocks'.
      // And broker.supported_assets is an array like ['Forex', 'Stocks'].
      // This requires case-insensitive matching and that the asset string is contained.
      // Supabase array contains can be tricky. A simpler approach might be a text search if assets are also in description,
      // or ensure consistent casing and use `cs` (contains) if `supported_assets` is a text[] type.
      // For this example, let's assume a direct match for simplicity, which might not be robust.
      // query = query.cs('supported_assets', `{${answers.assets}}`); // Example, adjust based on actual DB schema/needs
      // A more robust way might be to fetch all and filter in JS, or use a function in Supabase if complex array logic is needed.
    }
    
    if (answers.location) {
        // Example: Map quiz location to broker countries if possible
        // This is highly dependent on how locations are stored and how quiz answers are structured
        // switch (answers.location) {
        //    case 'northamerica': query = query.in('country', ['USA', 'Canada']); break;
        // }
    }

    // Execute query
    const { data: brokers, error } = await query;

    if (error) {
      console.error('Supabase error fetching brokers for quiz:', error);
      throw error;
    }

    // Simple scoring mechanism (example)
    const results: QuizBrokerResult[] = (brokers || []).map(broker => {
      let score = 70; // Base score
      if (answers.deposit) {
        if (answers.deposit === 'small' && (broker.min_deposit || 0) < 100) score += 10;
        if (answers.deposit === 'medium' && (broker.min_deposit || 0) >= 100 && (broker.min_deposit || 0) <= 500) score += 10;
      }
      if (answers.priority === 'lowfees' && (broker.trading_fee || 100) < 1) score += 15;
      if (answers.priority === 'regulation' && broker.regulations && broker.regulations.toLowerCase().includes('fca')) score +=10;

      // Ensure score is capped at 100 or a desired max
      score = Math.min(score, 99); 

      return {
        ...(broker as SupabaseBrokerRow), // Cast to ensure all fields from DB are there
        logo_url: broker.logo_url || null,
        supported_assets: broker.supported_assets || null,
        match_score: score,
      };
    }).sort((a, b) => (b.match_score || 0) - (a.match_score || 0)); // Sort by score desc

    return NextResponse.json(results.slice(0, 5)); // Return top 5 matches

  } catch (error: any) {
    console.error('Error in find-brokers-quiz API:', error);
    return NextResponse.json({ error: error.message || 'Failed to process quiz and find brokers' }, { status: 500 });
  }
} 