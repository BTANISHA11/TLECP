import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = 'https://www.codechef.com/api/list/contests/future?sort_by=START&sorting_order=desc&offset=0&mode=all';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching Codechef future contests' },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching Codechef future contests:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
