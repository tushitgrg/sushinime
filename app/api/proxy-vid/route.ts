import axios from 'axios';


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url'); // The original .m3u8 URL
    const type = searchParams.get('type'); // Determine if it's a playlist or segment
    const referrer =searchParams.get('referrer');
    if (!url) {
        return new Response('Missing "url" query parameter', { status: 400 });
    }

    try {
        if (type === 'playlist') {
            // Proxy the .m3u8 file
            const { data: playlistContent } = await axios.get(url, {

                headers: {
                    Referer: referrer, // Replace with your desired Referer
                    'User-Agent': req.headers.get('user-agent'), // Forward User-Agent
                },
                responseType: 'text', // For streaming large HLS content
            });

            // Modify .m3u8 content to point to your proxy for the segments
            const updatedPlaylist = playlistContent.replace(
                /(http.+?\.ts)/g, // Match .ts segment URLs
                (segmentUrl) => `/api/proxy-vid?url=${encodeURIComponent(segmentUrl)}&type=segment`
            );

            return new Response(updatedPlaylist, {
                status: 200,
                headers: {
                    'Content-Type': 'application/vnd.apple.mpegurl',
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow specific HTTP methods
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        } else if (type === 'segment') {
            // Proxy the .ts segment
            const response = await axios.get(url, { responseType: 'stream' });
            return new Response(response.data, {
                status: response.status,
                headers: {
                    'Content-Type': response.headers['content-type'],
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow specific HTTP methods
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        } else {
            return new Response('Invalid "type" query parameter', { status: 400 });
        }
    } catch (error) {
        console.error('Proxy error:', error.message);
        return new Response('Failed to proxy the resource', { status: 500 , headers:{
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow specific HTTP methods
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }});
    }
}
