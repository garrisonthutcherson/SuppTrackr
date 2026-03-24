import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Basic validation: make sure we actually have something to search for
  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // Make sure the API key is set up in the environment variables
  const apiKey = process.env.DSLD_API_KEY;
  if (!apiKey) {
    console.error('DSLD_API_KEY is missing from environment variables');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // Calling the NIH Dietary Supplement Label Database (DSLD) API
    // Documentation: https://dsld.od.nih.gov/api-guide
    // We limit the results to 10 to keep the UI snappy and avoid overwhelming the user
    const apiUrl = `https://api.ods.od.nih.gov/dsld/v8/search-filter?q=${encodeURIComponent(query)}&api_key=${apiKey}&size=10`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching supplement data:', error);
    // Return a generic error message to the client so we don't leak internal details
    return NextResponse.json({ error: 'Failed to fetch supplement data' }, { status: 500 });
  }
}
