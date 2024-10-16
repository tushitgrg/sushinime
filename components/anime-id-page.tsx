'use client'

import { Button } from "@/components/ui/button"
import { PlayCircle, Plus, ThumbsUp, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import AnimeSection from "./ui/anime-section"
import axios from "axios"
import EpisodeSection from "./ui/episodes-section"
import { Skeleton } from "./ui/skeleton"
import { Badge } from "./ui/badge"


export function AnimeDetails({animeid,episodeid=null}) {

  const [videosrc, setvideosrc] = useState({default:null, backup:null})
  if(episodeid){
    const getdata = async ()=>{
      const response = await axios.get(`https://sushinimeapi.vercel.app/meta/anilist/watch/${episodeid}`)
    for(let i=0; i<response.data.sources.length; i++){
      if(response.data.sources[i].quality=='default'){
        setvideosrc((prev)=>({backup:prev.backup, default:response.data.sources[i].url}))
      }
      if(response.data.sources[i].quality=='backup'){
        setvideosrc((prev)=>({default:prev.default, backup:response.data.sources[i].url}))
  
              }
    }
  
  
    
  
  }
  useEffect(()=>{
  getdata()
  },[episodeid])
  }
  
  const [animeidd, setanimeid] = useState(animeid)
const [allbanners, setallbanners] = useState([])
let banners = []
  const [animedata,setanimedata] = useState(null)
    const getdata = async ()=>{
        const response = await axios.get(`https://sushinimeapi.vercel.app/meta/anilist/info/${animeidd}`)
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
    
  const animes = [
    { title: 'Attack on Titan', episodes: 75, genres: ['Action', 'Dark Fantasy'], status: 'Completed', description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to rid the world of Titans after a Titan brings about the destruction of his hometown and the death of his mother.' },
    { title: 'My Hero Academia', episodes: 113, genres: ['Superhero', 'Action'], status: 'Ongoing', description: 'In a world where people with superpowers (known as "Quirks") are the norm, a boy without powers dreams of enrolling in a prestigious hero academy and learning to be a hero.' },
    { title: 'Demon Slayer', episodes: 44, genres: ['Action', 'Supernatural'], status: 'Ongoing', description: 'A young man named Tanjiro Kamado becomes a demon slayer after his family is slaughtered and his younger sister Nezuko is turned into a demon.' },
    { title: 'One Punch Man', episodes: 24, genres: ['Action', 'Comedy'], status: 'Ongoing', description: 'The story of Saitama, a hero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge due to his overwhelming strength.' },
    { title: 'Steins;Gate', episodes: 24, genres: ['Sci-Fi', 'Thriller'], status: 'Completed', description: 'A group of friends create a device that can send messages to the past, but their actions have unforeseen consequences that they must deal with.' },
    { title: 'Your Name', episodes: 1, genres: ['Romance', 'Supernatural'], status: 'Movie', description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?' },
  ]

  const animeId = 123
  const [isMuted, setIsMuted] = useState(true)

 
  return (
    <ScrollArea className="w-full h-full bg-black text-white">
 
    
{animedata?  <main>
  {videosrc.default||videosrc.backup? <iframe  src={ `https://plyr.link/p/player.html#${btoa(videosrc.default||videosrc.backup)}` } scrolling="no" frameBorder="0" allowFullScreen={true} allow="picture-in-picture" className="w-full h-[70vh]"></iframe>
     

     : <section className="relative h-[70vh]">
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
{/*        
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         className="flex items-center space-x-4"
       >
         <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
           <PlayCircle className="mr-2" size={20} />
           Play
         </Button>
         <Button variant="outline" className="border-gray-400 text-gray-300 hover:bg-white/10 transition-colors">
           <Plus className="mr-2" size={20} />
           My List
         </Button>
         <Button variant="outline" className="border-gray-400 text-gray-300 hover:bg-white/10 transition-colors">
           <ThumbsUp className="mr-2" size={20} />
           Rate
         </Button>
       </motion.div> */}



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
   </section> }
       

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
        
  
          <AnimeSection title="Similar" passinganime={true} type={ animedata.relations.filter((an)=>an.relationType!='ADAPTATION') }/>
          <AnimeSection title="If You like this, You Might Like" passinganime={true} type={animedata.recommendations}/> 
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