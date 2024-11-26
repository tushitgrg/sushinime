import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Sushinime";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          color: "white",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "48px 16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "144px",
              fontWeight: "bold",
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

