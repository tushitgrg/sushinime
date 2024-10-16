'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Bell, ChevronDown, PlayCircle, Search, ThumbsUp, Plus, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import AnimeSection, { AnimeModal } from "./ui/anime-section"
import TrendingCarousel from "./ui/homepage/trending-carousel"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { div } from "framer-motion/client"
import { v4 as uuidv4 } from 'uuid';






export default function HomePage() {

  const [selectedAnime, setSelectedAnime] = useState(null)
 
  const searchParams = useSearchParams(); // Hook to access query parameters

  useEffect(()=>{
const uid = localStorage.getItem('uid')
if(!uid){
  
  localStorage.setItem('uid',uuidv4())
}
  },[])

  useEffect(() => {
    const id = searchParams.get('id');
   
    if (id) {
      setSelectedAnime(id)

    }
  
  }, [searchParams]);

  const genres = ['Action','Comedy','Fantasy','Mystery','Romance']
  const animes = [
    { title: 'Attack on Titan', episodes: 75, genres: ['Action', 'Dark Fantasy'], status: 'Completed', description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to rid the world of Titans after a Titan brings about the destruction of his hometown and the death of his mother.' },
    { title: 'My Hero Academia', episodes: 113, genres: ['Superhero', 'Action'], status: 'Ongoing', description: 'In a world where people with superpowers (known as "Quirks") are the norm, a boy without powers dreams of enrolling in a prestigious hero academy and learning to be a hero.' },
    { title: 'Demon Slayer', episodes: 44, genres: ['Action', 'Supernatural'], status: 'Ongoing', description: 'A young man named Tanjiro Kamado becomes a demon slayer after his family is slaughtered and his younger sister Nezuko is turned into a demon.' },
    { title: 'One Punch Man', episodes: 24, genres: ['Action', 'Comedy'], status: 'Ongoing', description: 'The story of Saitama, a hero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge due to his overwhelming strength.' },
    { title: 'Steins;Gate', episodes: 24, genres: ['Sci-Fi', 'Thriller'], status: 'Completed', description: 'A group of friends create a device that can send messages to the past, but their actions have unforeseen consequences that they must deal with.' },
    { title: 'Your Name', episodes: 1, genres: ['Romance', 'Supernatural'], status: 'Movie', description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?' },
  ]
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
    

      <main className="pt-20">
      <TrendingCarousel/>

        <div className="container mx-auto px-4">
        {/* <AnimeSection title="Continue Watching" animes={animes.slice().reverse()} onclick={()=>setSelectedAnime(123)} type='history' /> */}
        <AnimeSection title="Recently Updated"  type='updated' passinganime={false}/>
        <AnimeSection title="Trending"   type='trending' passinganime={false}/>
      {genres.map((genre, index) => (
            <AnimeSection
              key={`genre${genre}`}
              title={`Popular in ${genre}`}
              passinganime={false}
             type={genre}
            />
          ))} 

          
        </div>
      </main>

     

      {selectedAnime && (
       
        <div key={selectedAnime}>
        <AnimeModal
          anime={selectedAnime}
          isOpen={!!selectedAnime}
        
          onClose={() => {setSelectedAnime(null); 
         
            router.replace('/', {  scroll: false }) 
          }}
        />
       
        </div>
       
      )}
       
    </div>
  )
}