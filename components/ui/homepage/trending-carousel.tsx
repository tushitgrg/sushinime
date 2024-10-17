import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import axios from 'axios'
import { Skeleton } from '../skeleton'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { fetchDataRedis } from '@/lib/fetchdata'
const TrendingCarousel = () => {
    const [trendin,settrendin] = useState(null)
    const getdata = async ()=>{
        const trend = await fetchDataRedis('https://sushinimeapi.vercel.app/meta/anilist/trending?page=1&perPage=10')
      
        settrendin(trend.data.results)
    }
    useEffect(()=>{
getdata()
    },[])
const [current, setcurrent] = useState<number>(0)

useEffect(()=>{
if(!trendin) return

const int = setInterval(() => {
 
 setcurrent((prev)=>{
        if(prev+1>=10) return 0;
        else return prev+1
    }); 
 



}, 4000);


return ()=>{
clearInterval(int)
}
},[trendin])


const router = useRouter()
  return ( 

<div>
    {trendin? <section className="relative h-[80vh] mb-12 hover:cursor-pointer " onClick={()=>{router.push(`/?id=${trendin[current].id}`  , { scroll: false })}}>
    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
   
     <video
      autoPlay
      loop
      muted
      className="w-full h-full object-cover"
      poster={trendin[current].cover}
    >
  
      <source src="/placeholder.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> 
    <div className="absolute bottom-0 left-0 z-20 p-8 space-y-4 max-w-2xl">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold"
      >
  { trendin[current].title.english || trendin[current].title.romaji}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl"
      >
        { trendin[current].description.replace(/<[^>]+>/g, '').slice(0,100)}...
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-sm"
      >
        { trendin[current].genres.toString()}
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex space-x-4"
      >
       
      </motion.div>
    </div>
  </section>: <Skeleton className="h-[80vh] w-full rounded-xl bg-slate-900" />}
</div>

  )
}

export default TrendingCarousel