
export async function generateMetadata({ params }: { params: { genreid: string } }) {
    const { genreid } =  params;
  
    const genres = [
        { name: "Action",   image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg" },
        { name: "Romance", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21519-fPhvy69vnQqS.png" },
        { name: "Comedy",  image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20755-q0b3Ok1cAbPd.jpg" },
        { name: "Sci-Fi", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-7pdcVzQSkKxT.jpg" },
        { name: "Fantasy", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg" },
        { name: "Drama", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-Dilr312jctdJ.jpg" },
        { name: "Mystery", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-4r88a1tsBEIz.jpg" },
        { name: "Thriller", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101759-G9I2ymYrFS8o.jpg" },
        { name: "Horror", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11111-Y4QgkX8gJQCa.png" },
        { name: "Slice of Life", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20954-UMb6Kl7ZL8Ke.jpg" },
        { name: "Mecha", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx99423-8MBxtwCeHf8B.png" },
        { name: "Mahou Shoujo", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9756-qnR83EYPzY1Z.jpg" },
        { name: "Sports", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-7fLWc7VvWeVB.png" },
        { name: "Psychological", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21234-bCvWk2f58LCv.jpg" },
      ]
  
 if (genreid) {
    
  
console.log(genreid)
    return {
      title: `Explore '${genreid}' at Sushinime!`,
      description: `Watch anime at Sushinime for free!`,
      openGraph: {
        title: `Explore '${genreid}' at Sushinime!`,
        description: `Watch anime at Sushinime for free!`,
        siteName: 'Sushinime',
        images: [
          {
            url: genres.filter((e)=>encodeURIComponent(e.name)==genreid)[0].image || '/preview.png',
            width: 1280,
            height: 720,
            alt: genreid|| 'Image Cover',
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