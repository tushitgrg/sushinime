'use client'

import { Button } from "@/components/ui/button"
import { Loader2, PlayCircle, Plus, ThumbsUp, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import AnimeSection from "./ui/anime-section"
import axios from "axios"
import EpisodeSection from "./ui/episodes-section"
import { Skeleton } from "./ui/skeleton"
import { Badge } from "./ui/badge"
import { fetchDataRedis } from "@/lib/fetchdata"
import { toast } from "@/hooks/use-toast"
import LoginBoundary from "./test/login-boundary"


export function AnimeDetails({animeid,episodeid=null,setmylistkey}) {

  const [btnloading, setbtnloading] = useState(false)
const addtolist = async ()=>{

  setbtnloading(true)
  try{  await axios.post('/api/mylist/add',{id:animedata.id, title:animedata.title, image:animedata.image, currentEpisode: animedata.currentEpisode, totalEpisodes:animedata.totalEpisodes})
toast({title:'Added to List!'})
if(setmylistkey) setmylistkey(`mylist${Math.random()}`)
}catch(e){
  console.log(e)
  toast({title:'Theres some error'})
}

  setbtnloading(false)
}

  
  const [animeidd, setanimeid] = useState(animeid)
const [allbanners, setallbanners] = useState([])
let banners = []
  const [animedata,setanimedata] = useState(null)
    const getdata = async ()=>{
        const response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/info/${animeidd}`)
        if(response.data.artwork){
      for(let i=0; i<response.data.artwork.slice(0,50).length; i++){
        if(response.data.artwork[i].type == 'banner' &&response.data.artwork[i].providerId == 'tvdb'){
banners.push(response.data.artwork[i].img)

        }
      }
      if(banners.length<=0){
        for(let i=0; i<response.data.artwork.slice(0,50).length; i++){
          if(response.data.artwork[i].type == 'banner'){
  banners.push(response.data.artwork[i].img)
  
          }
        }
      }
    }else{
      banners.push(response.data.cover)
    }

      setallbanners(banners)
        setanimedata(response.data)

    }
    useEffect(()=>{
getdata()
    },[])
    const [current, setcurrent] = useState<number>(0)

    useEffect(()=>{
    if(!animedata) return
    
    const int = setInterval(() => {
     
     setcurrent((prev)=>{
            if(prev+1>=allbanners.length) return 0;
            else return prev+1
        }); 
     
    
    
    
    }, 4000);
    
    
    return ()=>{
    clearInterval(int)
    }
    },[animedata])
    


  const animeId = 123
  const [isMuted, setIsMuted] = useState(true)

 
  return (
    <ScrollArea className="w-full h-full bg-black text-white">
 
    
{animedata?  <main>
  <section className="relative h-[70vh]">
     <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
  
<video
autoPlay
loop
muted={isMuted}
className="w-full h-full object-cover"
poster={allbanners[current]}
>
<source src="/placeholder.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
 <div className="absolute bottom-0 left-0 z-20 p-8 space-y-4 max-w-2xl">
       <motion.h1 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="text-5xl font-bold"
       >
 {animedata.title.english || animedata.title.romaji}
       </motion.h1>
       <LoginBoundary fallback={null}>
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         className="flex items-center space-x-4"
       >
        
         <Button variant="secondary" onClick={()=>addtolist()}>
          {btnloading? <Loader2 className="mr-2 h-4 w-4 animate-spin" />:      <Plus className="mr-2" size={20} />}
     
           My List
         </Button>
     
       </motion.div> 
       </LoginBoundary>


     </div>
    
     {/* <div className="absolute bottom-8 right-8 z-20">
       <Button
         variant="outline"
         className="border-gray-400 text-gray-300 hover:bg-white/10 transition-colors"
         onClick={() => setIsMuted(!isMuted)}
       >
         {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
       </Button>
     </div> */}
   </section> 
       

        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className=" flex  gap-4">
            <div className="w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center text-sm text-gray-400 mb-4"
              >
                <span className="mr-4">{animedata.releaseDate}</span>
                <span className="mr-4">{animedata.status}</span>
                <span className="mr-4">{animedata.totalEpisodes} Episodes</span>
               
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-gray-300 mb-8"
              >
                {animedata.description.replace(/<[^>]+>/g, '')}
              </motion.p>
              </div>
              <div className="w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-gray-400">Studio:</span> {animedata.studios}
                  </div>
                  <div className="gap-3">
                    <span className="text-gray-400">Genres:</span>  {animedata.genres.map((genre)=><Link key={genre} href={`/genres/${genre}`}> <Badge className="m-1" variant={'secondary'} key={`b${genre}`}>{genre}</Badge> </Link>)}
                  </div>
                  <div>
                    <span className="text-gray-400">Rating:</span> {animedata.rating}/100
                  </div>
                </div>
              </motion.div>
            </div>

       
          </div>

          </div>
           
            
<EpisodeSection animeid={animedata.id} episodesdata={animedata.episodes}/>
              
        </section>

        <section className="container mx-auto px-4 py-12">
        
  
        {animedata.relations.filter((an)=>an.relationType!='ADAPTATION').length>0?<AnimeSection title="Similar" passinganime={true} type={ animedata.relations.filter((an)=>an.relationType!='ADAPTATION') }/>:''}  
        {animedata.recommendations.length>0?   <AnimeSection title="If You like this, You Might Like" passinganime={true} type={animedata.recommendations}/> :''}   
       
        </section>
      </main>:<main>
        <section className="relative h-[70vh]">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <Skeleton className="w-full h-full bg-slate-900"/>
         
          <div className="absolute bottom-0 left-0 z-20 p-8 space-y-4 max-w-2xl">
          <Skeleton className="w-full h-10 bg-slate-900"/>
        
          </div>
       
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className=" flex  gap-4">
            <div className="w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center text-sm gap-3 text-gray-400 mb-4"
              >
               <Skeleton className="w-64 h-10 bg-slate-900"/>
               <Skeleton className="w-64 h-10 bg-slate-900"/>
               <Skeleton className="w-64 h-10 bg-slate-900"/>
               
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-gray-300 mb-8"
              >
                <Skeleton className="w-full h-20 bg-slate-900"/>
              </motion.p>
              </div>
              <div className="w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Skeleton className="w-full h-10 bg-slate-900"/>
                <div className="space-y-4 text-sm">
                  <div>
                  <Skeleton className="w-full h-10 bg-slate-900"/>
                  </div>
                  <div>
                  <Skeleton className="w-full h-10 bg-slate-900"/>
                  </div>
                  <div>
                  <Skeleton className="w-full h-10 bg-slate-900"/>
                  </div>
                </div>
              </motion.div>
            </div>

       
          </div>

          </div>
           

              
        </section>

       
      </main>}
    

    
 
    </ScrollArea>
  )
}