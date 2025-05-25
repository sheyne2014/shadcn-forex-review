import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/env';

// Create Supabase client with service key to bypass RLS for review submission
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { broker_id, rating, comment, user_name, user_email, pros, cons } = body;

    // Validate required fields
    if (!broker_id || !rating) {
      return NextResponse.json(
        { error: 'Broker ID and rating are required' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create structured comment with user name and content
    let fullComment = '';

    // Add user name if provided
    if (user_name) {
      fullComment += `[USER:${user_name}]`;
    }

    // Add main comment
    if (comment) {
      if (fullComment) fullComment += '\n';
      fullComment += comment;
    }

    // Add pros and cons if they exist
    if (pros || cons) {
      if (fullComment) fullComment += '\n\n';
      if (pros) fullComment += `Pros: ${pros}`;
      if (pros && cons) fullComment += '\n';
      if (cons) fullComment += `Cons: ${cons}`;
    }

    // Insert review into database (using user_id instead of user_name/user_email)
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          broker_id,
          rating,
          comment: fullComment,
          user_id: null // For now, we'll allow anonymous reviews
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit review' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        review: data[0],
        message: 'Review submitted successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const broker_id = url.searchParams.get('broker_id');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    if (!broker_id) {
      return NextResponse.json(
        { error: 'Broker ID is required' },
        { status: 400 }
      );
    }

    // Fetch reviews for the broker
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('broker_id', broker_id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reviews: data || [],
      total: data?.length || 0
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
