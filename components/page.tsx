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
import LoginBoundary from "./test/login-boundary"
import HistorySection from "./ui/history-section"






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

  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
    

      <main className="pt-20">
      <TrendingCarousel/>

        <div className="container mx-auto px-4">
        {/* <AnimeSection title="Continue Watching" animes={animes.slice().reverse()} onclick={()=>setSelectedAnime(123)} type='history' /> */}
        <AnimeSection title="Recently Updated"  type='updated' passinganime={false}/>
        <AnimeSection title="Trending"   type='trending' passinganime={false}/>
        <LoginBoundary fallback={null}>
        <AnimeSection title="My List"   type='MyList' passinganime={false}/>
        <HistorySection/>
        </LoginBoundary>
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