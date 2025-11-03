import { NextResponse } from 'next/server';
import { getSortedMicropostsData } from '@/lib/sanity-microposts';

export async function GET() {
  try {
    const microposts = await getSortedMicropostsData();
    return NextResponse.json(microposts);
  } catch (error) {
    console.error('Error fetching microposts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch microposts' },
      { status: 500 }
    );
  }
}
