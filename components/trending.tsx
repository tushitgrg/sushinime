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
import axios from "axios"
import AnimeCard from "./ui/anime-card"
import { Skeleton } from "./ui/skeleton"
import { fetchDataRedis } from "@/lib/fetchdata"






export default function TrendingPage() {

  const [selectedAnime, setSelectedAnime] = useState(null)
  const [animedata,setanimedata] = useState(null)

 
  const searchParams = useSearchParams();

const getdata = async ()=>{
 
    const response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/trending?page=1&perPage=30`)
  setanimedata(response.data.results)
  console.log(response.data.results)
}
useEffect(()=>{
   
  getdata()
 
},[])

useEffect(() => {
    const id = searchParams.get('id');
   
    if (id) {
      setSelectedAnime(id)

    }
  
  }, [searchParams]);



  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
    

      <main className="pt-20">
   

      { animedata  ? <div>  {animedata.length>0?<div>
       <AnimeSection title="" passinganime={true} type={animedata.slice(0,7)}/> 
       
    {animedata.slice(7,14).length>0?<AnimeSection title="" passinganime={true} type={animedata.slice(7,14)}/> :''}  
    {animedata.slice(14,21).length>0?<AnimeSection title="" passinganime={true} type={animedata.slice(14,21)}/> :''}  
    {animedata.slice(21,29).length>0?<AnimeSection title="" passinganime={true} type={animedata.slice(21,29)}/> :''}  


        </div>: <div className="h-screen w-screen flex justify-center align-middle items-center"> <h2>Oops, We Could not Find anything!</h2></div> }  </div>  : <div className="flex gap-8 justify-center flex-wrap">{ [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((i)=><Skeleton key={i} className="min-w-[50%] max-w-[50%] md:min-w-[33.33%] md:max-w-[33.33%] lg:min-w-[16.66%] h-64 bg-slate-900 lg:max-w-[16.66%] rounded-xl" />)}</div>}

      </main>

     

      {selectedAnime && (
       
        <div key={selectedAnime}>
        <AnimeModal
          anime={selectedAnime}
          isOpen={!!selectedAnime}
        
          onClose={() => {setSelectedAnime(null); 
         
            router.replace(`/trending`, {  scroll: false }) 
          }}
        />
       
        </div>
       
      )}
       
    </div>
  )
}