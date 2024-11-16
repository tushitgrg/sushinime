'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {  ArrowBigLeft, ArrowBigRight, House, Menu } from "lucide-react"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Skeleton } from './ui/skeleton'
import { fetchDataRedis } from '@/lib/fetchdata'
import Image from 'next/image'
import Link from 'next/link'
import CommentSection from './ui/comments'
import EpisodeSection from './ui/episodes-section'
import EpisodeListx from './ui/episode-list'




export function AnimePlayer({episodeid,animeid}) {
  const currentdomain = "http://localhost:3000"
  const router = useRouter()
const mainref = useRef(null)
useEffect(() => {
  setTimeout(() => {
    if (mainref.current) {
      mainref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',    
      });

    }
  }, 0); 
}, []);
 const [referrer, setrefferer] = useState()
const [nextep, setnextep] = useState()
const [currentepn, setcurrentepn] = useState()
const [prevep, setprevep] = useState()
const setCurrentEpisode = (e)=>{
  router.push(`/watch/${animeid}/${e}`)
}
  const [videosrc, setvideosrc] = useState({default:null, backup:null})
 
  if(episodeid){
    const getdata = async ()=>{
      const response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/watch/${episodeid}`)
   

    for(let i=0; i<response.data.sources.length; i++){
      if(response.data.sources[i].quality=='default'){
  const res1 = await fetch(`/api/proxy?referrer=${btoa(response.data.headers.Referer)}` + "&url=" +  btoa(response.data.sources[i].url) )
  const url  = await res1.blob();
        setvideosrc((prev)=>({backup:prev.backup, default: URL.createObjectURL(url )}))
      }
      if(response.data.sources[i].quality=='backup'){
        const res1 = await fetch(`/api/proxy?referrer=${btoa(response.data.headers.Referer)}` + "&url=" +  btoa(response.data.sources[i].url) )
  const url  = await res1.blob();
        setvideosrc((prev)=>({default:prev.default, backup:URL.createObjectURL(url )}))
  
              }
    }

    
  
  }
  useEffect(()=>{
  getdata()
  },[episodeid])
  }
 


  const [animedata,setanimedata] = useState(null)


    const getdata = async ()=>{
        const response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/info/${animeid}`)

        for(let i=0; i<response.data.episodes.length; i++){
          if(response.data.episodes[i].id==episodeid){
            setcurrentepn(response.data.episodes[i].number)
          }
        }
       
    setanimedata(response.data)
  
      try{
        await axios.post('/api/history/add', {animeid, episodeid, anime:{id:response.data.id, title:response.data.title, image:response.data.image, currentEpisode: response.data.currentEpisode, totalEpisodes:response.data.totalEpisodes}})
      }catch(e){
        console.log(e)
      }
    
    

    }
    useEffect(()=>{
getdata()
    },[])

    useEffect(()=>{
      if(!animedata) return
      for(let i=0; i<animedata.episodes.length; i++){
   
    
        if(currentepn &&animedata.episodes[i].number -1 == currentepn ){
          setnextep(animedata.episodes[i].id)
        }
        if(currentepn &&animedata.episodes[i].number +1 == currentepn ){
          setprevep(animedata.episodes[i].id)
        }
              }
    },[currentepn])
   
  return (
    <div className='' ref={mainref}>
   {animedata && ( videosrc.backup||videosrc.default) ?  <div className="flex flex-col  bg-black text-white">
  


  

    

 
    
      
         <div className='relative'>
         {nextep?<Button variant="secondary" className='absolute z-10 right-8 bottom-32'   onClick={()=> {setCurrentEpisode(nextep)}} > Next <ArrowBigRight/> </Button>:''}     
         {prevep?<Button variant="secondary" className='absolute z-10 left-8 bottom-32'   onClick={()=> {setCurrentEpisode(prevep)}} > Prev <ArrowBigLeft/>  </Button>:''}     
         <iframe   src={ `https://plyr.link/p/player.html#${btoa( videosrc.default   ||  videosrc.backup) }${localStorage.getItem('uid')?`#uid=${localStorage.getItem('uid')}${episodeid}`:''}` } scrolling="no" frameBorder="0" allowFullScreen={true} title={episodeid} allow="picture-in-picture" className="w-full aspect-video"></iframe>
         </div>
     
       
           
    
        <div className="flex p-6">
          <h2 className="text-xl  sm:text-2xl font-bold">  {animedata.title.english || animedata.title.romaji} Episode {currentepn} </h2>
       
        </div>
        <CommentSection animeid={animeid} episodeid={episodeid}/>
    


 
   
  </div>: <div className='w-full h-screen flex align-middle justify-center items-center'>
<Image src={'/sad-cute.gif'} alt='preloader' width={200} height={200}/>

  </div> }
  </div>
  )
}