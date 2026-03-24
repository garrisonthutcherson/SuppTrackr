import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Make sure the API key is set up in the environment variables
  const apiKey = process.env.DSLD_API_KEY;
  if (!apiKey) {
    console.error('DSLD_API_KEY is missing from environment variables');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // Calling the NIH Dietary Supplement Label Database (DSLD) API
    // Documentation: https://dsld.od.nih.gov/api-guide
    // We fetch the specific label details using the ID
    const apiUrl = `https://api.ods.od.nih.gov/dsld/v8/label/${id}?api_key=${apiKey}`;
    
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
