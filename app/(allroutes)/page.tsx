import HomePage from "@/components/page";
import { fetchDataRedis } from "@/lib/fetchdata";
import Image from "next/image";
export async function generateMetadata({ searchParams }: { searchParams?: { id?: string } }) {
  console.log("searchParams:", searchParams); // Debug

  const id = searchParams?.id;

  if (id) {
    
    const response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/info/${id}`); // Replace with your actual data-fetching logic

    return {
      title: `Watch "${response.data.title.english || response.data.title.romaji}" on Sushinime!`,
      description: `${response.data.description.slice(0,150)}...`,
      openGraph: {
        title: `Watch "${response.data.title.english || response.data.title.romaji}" on Sushinime!`,
        description: `${response.data.description.slice(0,150)}...`,
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
export default function Home() {
  return (
   <HomePage/>
  );
}
