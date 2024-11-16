import httpProxy from "http-proxy";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import axios from "axios";
import colors from "colors";

dotenv.config();

const proxy = httpProxy.createProxyServer();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("url");
    const referrer = searchParams.get("referrer") || "";

    if (!targetUrl) {
        return NextResponse.json(
            { error: "URL parameter is required" },
            { status: 400 }
        );
    }

    try {
        // Configure headers for the proxied request
        const response = await axios.get(targetUrl, {
            headers: {
                Referer: referrer, // Add the referrer header
            },
            responseType: "stream", // Stream the response
        });

        // Stream the proxied response back to the client
        return new Response(response.data, {
            status: response.status,
            headers: {
                "Content-Type": response.headers["content-type"] || "application/octet-stream",
                "access-control-allow-origin": "*", // Add CORS support
            },
        });
    } catch (error) {
        console.error(colors.red(`Error proxying request: ${error.message}`));
        return NextResponse.json(
            { error: "Error proxying the request" },
            { status: 500 }
        );
    }
}
