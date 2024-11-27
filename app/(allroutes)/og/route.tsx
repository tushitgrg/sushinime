import { ImageResponse } from "next/og";
import Image from "next/image";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Sushinime";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        
          color: "black",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
         
        }}
        tw="bg-white"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "48px 16px",
            alignItems: "center",
            justifyContent: "center",
        
           backgroundImage: " url('http://localhost/poster.png')"
          }}
        >
   
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "120px",
           
              fontFamily:"sans-serif",
              letterSpacing: "-0.05em",
              textAlign: "center",
              margin: 0,
            }}
          >

            {title}
          </h1>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 1200,
    }
  );
}

