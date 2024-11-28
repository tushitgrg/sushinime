import { fetchDataRedis } from "@/lib/fetchdata";
import {convert} from 'html-to-text';
export async function generateMetadata({ params }: { params: { animeid: string } }) {
    const { animeid } =  params;
  

  
 if (animeid) {
    
    const response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/info/${animeid}`); // Replace with your actual data-fetching logic

    return {
      title: `Watch "${response.data.title.english || response.data.title.romaji}" on Sushinime!`,
      description: `${convert( response.data.description).slice(0,150)}...`,
      openGraph: {
        title: `Watch "${response.data.title.english || response.data.title.romaji}" on Sushinime!`,
        description: `${convert( response.data.description).slice(0,150)}...`,
        siteName: 'Sushinime',
        images: [
          {
            url: response.data.cover || '/preview.png',
            width: 1280,
            height: 720,
            alt: response.data.title.english || response.data.title.romaji || 'Image Cover',
          },
        ],
        type: 'website',
      },
    };
  }
  
    // Default metadata
    return {
      title: 'Sushinime',
      description: 'Watch Anime for free',
      openGraph: {
        title: 'Sushinime',
        description: 'Watch Anime for free',
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
      },
    };
  }
  

export default function EpisodeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }