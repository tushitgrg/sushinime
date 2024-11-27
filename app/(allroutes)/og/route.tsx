import { ImageResponse } from "next/og";

async function loadGoogleFont (font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
 
  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }
 
  throw new Error('failed to load font data')
}
export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title").toUpperCase() || "Sushinime";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        
          color: "white",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: " url('https://sushinime.site/poster.png')",
          backgroundRepeat:'no-repeat',
          backgroundSize:'100% 100%'
        }}
      
      >

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "48px 60px",
            alignItems: "center",
            justifyContent: "center",
   
         

          
       

          }}
        >
   
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "100px",
           
           
              letterSpacing: "0.05em",
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
      width: 900,
      height: 1300,
      fonts: [
        {
          name: "Keania One",
          data: await loadGoogleFont('Keania One', title),
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}

