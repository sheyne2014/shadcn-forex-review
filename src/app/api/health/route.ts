import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const client = createClient();
    
    // Test basic database connectivity
    const { data: brokerCount, error: brokerError } = await Promise.race([
      client.from('brokers').select('count', { count: 'exact' }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      )
    ]) as any;

    const { data: categoryCount, error: categoryError } = await Promise.race([
      client.from('categories').select('count', { count: 'exact' }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      )
    ]) as any;

    const responseTime = Date.now() - startTime;

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: !brokerError && !categoryError,
        responseTime: `${responseTime}ms`,
        brokerCount: brokerCount?.count || 0,
        categoryCount: categoryCount?.count || 0,
        errors: {
          brokers: brokerError?.message || null,
          categories: categoryError?.message || null
        }
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    };

    // Determine overall status
    if (brokerError || categoryError || responseTime > 3000) {
      health.status = 'degraded';
    }

    if (responseTime > 10000) {
      health.status = 'unhealthy';
    }

    return NextResponse.json(health, {
      status: health.status === 'healthy' ? 200 : 
             health.status === 'degraded' ? 206 : 503
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      responseTime: `${responseTime}ms`,
      database: {
        connected: false,
        responseTime: `${responseTime}ms`,
        brokerCount: 0,
        categoryCount: 0,
        errors: {
          general: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    }, { status: 503 });
  }
}
