import { NextResponse } from 'next/server';

export async function GET() {
  const healthcheck = {
    status: 'OK',
    timestamp: Date.now()
  };

  try {
    // Add any critical checks here (e.g., database connection)
    // For example: await db.query('SELECT 1');
    
    return NextResponse.json(healthcheck, { status: 200 });
  } catch (error) {
    healthcheck.status = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(healthcheck, { status: 503 });
  }
}