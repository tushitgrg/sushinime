// app/api/proxy/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Get the media URL from the query parameters
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
console.log(url)
  if (!url) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  try {
    // Fetch the media from the external URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }

    // Get the media content type
    const contentType = response.headers.get('content-type');
    
    // Create a response with the correct content type and media content
    const mediaBuffer = await response.arrayBuffer();
    
    return new NextResponse(Buffer.from(mediaBuffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error proxying media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}
