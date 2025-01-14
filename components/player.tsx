'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {  ArrowBigLeft, ArrowBigRight,  } from "lucide-react"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { fetchDataRedis } from '@/lib/fetchdata'
import Image from 'next/image'
import CommentSection from './ui/comments'

import { Switch } from './ui/switch'




export function AnimePlayer({episodeid,animeid}) {
  const currentdomain = "https://sushinime.site"
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
const [currentvid, setcurrentvid] =  useState({default:null, backup:null});
  const [videosrc, setvideosrc] = useState({default:null, backup:null})
  const [dubvideosrc, setdubvideosrc] = useState({default:null, backup:null})
  const [dub, setdub] = useState(false);
  if(episodeid){
    // setdub(episodeid.includes("dub"));
    const getdata = async ()=>{
     
      const response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/watch/${episodeid}`)
   setrefferer(response.data.headers.Referer)

    for(let i=0; i<response.data.sources.length; i++){
      if(response.data.sources[i].quality=='default'){

        setvideosrc((prev)=>({backup:prev.backup, default: response.data.sources[i].url}))
      }
      if(response.data.sources[i].quality=='backup'){
       
        setvideosrc((prev)=>({default:prev.default, backup:response.data.sources[i].url } ))
  
              }
    }
    const response1 = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/watch/${episodeid.replace("-episode","-dub-episode")}`);
    console.log(`https://sushinimeapi.vercel.app/meta/anilist/watch/${episodeid.replace("-episode","-dub-episode")}`)
    for(let i=0; i<response1.data.sources.length; i++){
      if(response1.data.sources[i].quality=='default'){

        setdubvideosrc((prev)=>({backup:prev.backup, default: response1.data.sources[i].url}))
      }
      if(response1.data.sources[i].quality=='backup'){
       
        setdubvideosrc((prev)=>({default:prev.default, backup:response1.data.sources[i].url } ))
  
              }
    }
    
  
  }
  useEffect(()=>{
  getdata()
  },[episodeid])
  }
 
useEffect(()=>{
if(dub){
  setcurrentvid({default: dubvideosrc.default, backup:dubvideosrc.backup});
}else{
  console.log(currentvid)
  setcurrentvid({default: videosrc.default, backup:videosrc.backup});
}

},[dub,videosrc,dubvideosrc])

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
   {animedata && ( currentvid.backup||currentvid.default) ?  <div className="flex flex-col  bg-black text-white">
  


  

    

 
    
      
         <div className='relative'>
         {nextep?<Button variant="secondary" className='absolute z-10 right-8 bottom-32'   onClick={()=> {setCurrentEpisode(nextep)}} > Next <ArrowBigRight/> </Button>:''}     
         {prevep?<Button variant="secondary" className='absolute z-10 left-8 bottom-32'   onClick={()=> {setCurrentEpisode(prevep)}} > Prev <ArrowBigLeft/>  </Button>:''}     
       {/* <VideoWithHLS source={ `https://m3-u8-proxy2-two.vercel.app/m3u8-proxy?url=${encodeURIComponent(videosrc.default   ||  videosrc.backup)}&headers=${encodeURIComponent(JSON.stringify({referer:referrer}))}`  }/> */}
       {/* <VideoWithHLS source={`https://cors.zimjs.com/${videosrc.default   ||  videosrc.backup}`} /> */}
         <iframe   src={ `https://cozy-cocada-fc32ca.netlify.app#${btoa( `https://m3-u8-proxy2-two.vercel.app/m3u8-proxy?url=${currentvid.default   ||  currentvid.backup}` )  }${localStorage.getItem('uid')?`#uid=${localStorage.getItem('uid')}${episodeid}`:''}` } scrolling="no" frameBorder="0" allowFullScreen={true} title={episodeid} allow="picture-in-picture" className="w-full aspect-video"></iframe>
         </div>
     
       
           
    
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl  sm:text-2xl font-bold">  {animedata.title.english || animedata.title.romaji} Episode {currentepn} </h2>
         {dubvideosrc.backup||dubvideosrc.default? <div className='flex items-center gap-3'>
          <Switch
                      checked={dub}
                      onCheckedChange={()=>{
                        setdub((prev)=>!prev)
                      }}
                    />
                    Dub
          </div>:''}
         
         
        </div>
        <CommentSection animeid={animeid} episodeid={episodeid}/>
    


 
   
  </div>: <div className='w-full h-screen flex align-middle justify-center items-center'>
<Image src={'/sad-cute.gif'} alt='preloader' width={200} height={200}/>

  </div> }
  </div>
  )
}