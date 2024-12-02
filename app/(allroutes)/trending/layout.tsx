import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Sushinime",
    description: "See What Anime is Trending!",
    openGraph: {
      title: "Sushinime",
      description: "See What Anime is Trending!",
      siteName: 'Sushinime',
      images: [
        {
          url: '/preview.png', 
          width: 1280,
          height: 720,
          alt: 'Logo Alt Text',
        },
      ],
      type: 'website',
  
    }
  }; 
  

export default function TrendingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }