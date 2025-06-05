import { NextRequest, NextResponse } from 'next/server';

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  extra?: Record<string, any>;
}

interface ErrorReportRequest {
  reports: ErrorReport[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ErrorReportRequest = await request.json();
    
    if (!body.reports || !Array.isArray(body.reports)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // In production, you might want to:
    // 1. Store errors in a database
    // 2. Send to external monitoring service
    // 3. Send alerts for critical errors
    // 4. Rate limit error reports

    // For now, just log them
    console.error('Error reports received:', {
      count: body.reports.length,
      timestamp: new Date().toISOString(),
      reports: body.reports.map(report => ({
        message: report.message,
        url: report.url,
        timestamp: report.timestamp,
        extra: report.extra
      }))
    });

    // In a real implementation, you might store these in Supabase:
    /*
    const client = createClient();
    const errorRecords = body.reports.map(report => ({
      message: report.message,
      stack: report.stack,
      url: report.url,
      user_agent: report.userAgent,
      timestamp: report.timestamp,
      user_id: report.userId,
      session_id: report.sessionId,
      extra: report.extra,
      created_at: new Date().toISOString()
    }));

    const { error } = await client
      .from('error_reports')
      .insert(errorRecords);

    if (error) {
      console.error('Failed to store error reports:', error);
    }
    */

    return NextResponse.json({ 
      success: true, 
      processed: body.reports.length 
    });

  } catch (error) {
    console.error('Failed to process error reports:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check for error reporting endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    endpoint: 'error-reporting',
    timestamp: new Date().toISOString()
  });
}
