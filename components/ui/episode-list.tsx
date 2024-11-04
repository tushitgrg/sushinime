import axios from 'axios'
import { motion } from 'framer-motion'
import { div } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { Badge } from './badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Skeleton } from './skeleton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { fetchDataRedis } from '@/lib/fetchdata'
import { ScrollArea } from './scroll-area'
const EpisodeListx = ({animeid}) => {
    const [episodes,setepisodes] = useState(null)
    const [allepisodes,setallepisodes] = useState(null)
    const [range, setrange] = useState([])
    const [selrange, setselrange] = useState('0')
    let episodesdata=[];
    const getdata = async ()=>{
        const response1 = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/info/${animeid}`)
        episodesdata = response1.data.episodes
        let response = {data:[]}
      try{
         response = await fetchDataRedis(`https://sushinimeapi.vercel.app/meta/anilist/episodes/${animeid}`)
      }catch{

      }
      
    
       
    const copy = [...episodesdata]
    console.log("Episodes")
  console.log(copy)
  if(response.data.length>0){
    for(let i =0; i<copy.length; i++){
      if(copy[i]){
        if(copy[i].id ==response.data[i].id){
          copy[i].title = response.data[i].title;
          copy[i].image = response.data[i].image;
      }
      }
      
    }
  }
  setallepisodes(copy)
    }
    useEffect(()=>{
        getdata()
            },[animeid])



useEffect(()=>{
if(!allepisodes) return
setrange([])
if(allepisodes.length<=100){ setepisodes(allepisodes)
    setrange([{from:1,to:allepisodes.length}])

}
    else{
        setepisodes([...allepisodes].slice(0,100))
      const n =  allepisodes.length % 100
      const nn = Math.floor( allepisodes.length/100)
for(let j=0; j<nn+1; j++){
    let from =j*100 + 1; let to = (j+1)*100

if(j==nn) to = (j)*100 + n

    
    setrange((prev)=>[...prev,{from, to}])
}

    } 

},[allepisodes])

useEffect(()=>{
    if(!allepisodes) return
    setepisodes([...allepisodes].slice(range[parseInt(selrange)].from-1,range[parseInt(selrange)].to))
},[selrange])
    const router = useRouter()
  return (
    <div> 
{episodes ? <div> {allepisodes.length>0 ? <>  <div className='flex justify-between'> <h2 className="text-2xl font-bold mb-4">Episodes</h2>
<Select onValueChange={(e)=>setselrange(e)} defaultValue={selrange}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Range" />
  </SelectTrigger>
  <SelectContent >
    {range.length>0?range.map((el,i)=> <SelectItem key={`${el.from}${el.to}`} value={`${i}`}>{el.from}-{el.to}</SelectItem>):''}
   
  </SelectContent>
</Select>

</div>

<ScrollArea className='w-full h-screen'>
    <div className=" grid lg:grid-cols-2 grid-cols-2 md:grid-cols-2 gap-4 "> 
        {episodes.map((episode) => (
  <motion.div
    key={episode.id}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
   
    <div className="group" onClick={()=> router.push(`/watch/${animeid}/${episode.id}`  , {  scroll: false, })}>
      <div className="relative rounded-md overflow-hidden hover:scale-110 cursor-pointer">
        <img
          src={episode.image}
          alt={episode.title}
          onError={(e)=>e.currentTarget.src='/icon.png'}
          className="w-full aspect-[2/1]  object-cover transition-transform duration-300 group-hover:scale-105"
        />
      
        <Badge className='absolute top-2 left-2'>{episode.number}</Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
      
      </div>
      <div className=" opacity-100">
      <h3 className="text-base font-semibold">{episode.title}</h3>
      </div>
    </div>
  </motion.div>
))} </div>
</ScrollArea>

 </> :'No Episodes yet'} </div> :    <div className=" grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 ">
  {[1,2,3,4,5].map((i)=><Skeleton key={Math.random()} className='w-full aspect-[2/1] bg-slate-900'></Skeleton>)}
    </div>}



</div>



        )   
     } 
      




export default EpisodeListx