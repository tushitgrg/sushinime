import axios from 'axios';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const targetUrl = atob(searchParams.get('url'));
const referrer = atob(searchParams.get('referrer'));

    if (!targetUrl) {
        return new Response('Missing "url" query parameter', { status: 400 });
    }
    if (!referrer) {
        return new Response('Missing "referrer" query parameter', { status: 400 });
    }

    try {
        const response = await axios.get(targetUrl, {
            headers: {
                Referer: referrer, // Replace with your desired Referer
                'User-Agent': req.headers.get('user-agent'), // Forward User-Agent
            },
            responseType: 'stream', // For streaming large HLS content
        });

        return new Response(response.data, {
            status: response.status,
            headers: {
                'Content-Type': response.headers['content-type'],
                'Access-Control-Allow-Origin': '*', // Enable CORS
            },
        });
    } catch (error) {
        console.error('Proxy error:', error.message);
        return new Response('Failed to fetch the resource', { status: 500 });
    }
}
