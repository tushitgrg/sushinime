import puppeteer from 'puppeteer';

export async function GET(request) {
    const url = request.url; // You can pass the URL as a query parameter

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Adjust the selector as needed
        const imageUrl = await page.evaluate(() => {
            return document.querySelector('img')?.src; 
        });

        await browser.close();

        return new Response(JSON.stringify({ imageUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
