'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {  ArrowBigLeft, Menu } from "lucide-react"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Skeleton } from './ui/skeleton'


const EpisodeList = ({ currentEpisode, setCurrentEpisode, animedata,animeid }) =>  (

  <div className="">
    <h2 className="text-2xl font-bold mb-4"> {animedata.title.english || animedata.title.romaji}</h2>
    <div className="space-y-2">
      {animedata.episodes.map((episode) => (
        <button
          key={episode.id}
          onClick={() => setCurrentEpisode(episode.id)}
          className={`w-1/2 lg:w-1/3 text-left p-2 rounded-md transition-colors ${
            currentEpisode === episode.id
              ? 'bg-red-600 text-white'
              : 'hover:bg-gray-800'
          }`}
        >
          <div className="font-semibold">Ep {episode.number}</div>
       
        </button>
      ))}
    </div>
  </div>
)

export function AnimePlayer({episodeid,animeid}) {
  const router = useRouter()


const setCurrentEpisode = (e)=>{
  router.push(`/watch/${animeid}/${e}`)
}
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
 


  const [animedata,setanimedata] = useState(null)


    const getdata = async ()=>{
        const response = await axios.get(`https://sushinimeapi.vercel.app/meta/anilist/info/${animeid}`)
       
    setanimedata(response.data)

    }
    useEffect(()=>{
getdata()
    },[])

  return (
    <div className=''>
   {animedata && ( videosrc.backup||videosrc.default) ?  <div className="flex flex-col h-screen bg-black text-white">
    {/* Header */}
    <header className="bg-gray-900 flex items-center justify-between ">
    <Button variant="default" className='absolute z-10 left-4 top-4'  size="icon" onClick={()=> {router.back();router.back();}} >
      <ArrowBigLeft size={24} />
           
          </Button>
   
      <Sheet>
        <SheetTrigger asChild>
          
          <Button variant="default" className='absolute z-10 left-14 top-4'  size="icon"  >
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-gray-900 text-white">
          <ScrollArea className="h-full">
            <EpisodeList animedata={animedata} animeid={animeid} currentEpisode={episodeid}  setCurrentEpisode={setCurrentEpisode} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>

    {/* Main content */}
    <div className="flex-grow flex w-screen h-screen overflow-auto">
      {/* Sidebar for larger screens */}
    

      {/* Video player and controls */}
      <div className="flex-grow  flex flex-col">
      
         
         {/* <PlrVideoPlayer hlsSource={videosrc.default||videosrc.backup||''} /> */}
         <iframe src={ `https://plyr.link/p/player.html#${btoa(videosrc.default||videosrc.backup)}${localStorage.getItem('uid')?`#uid=${localStorage.getItem('uid')}`:''}` } scrolling="no" frameBorder="0" allowFullScreen={true} title={episodeid} allow="picture-in-picture" className="w-screen aspect-video"></iframe>
           
    
        <div className="flex ">
          <h2 className="text-xl sm:text-2xl font-bold"> {episodeid.replaceAll('-',' ').toUpperCase()}</h2>
       
        </div>
      </div>
    </div>
  </div>:<Skeleton className='w-screen aspect-video bg-slate-900'/> }
  </div>
  )
}