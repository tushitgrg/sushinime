import { useEffect, useRef, useState } from "react"
import { AnimeDetails } from "../anime-id-page"
import AnimeCard from "./anime-card"
import { Dialog, DialogContent, DialogTitle } from "./dialog"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { Skeleton } from "./skeleton"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"

export const AnimeModal = ({ anime, isOpen, onClose,episodeid=null }) => {
  const [animeid, setanimeid] = useState(anime)
    const [isMuted, setIsMuted] = useState(true)
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose} >
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-4xl p-0 bg-black text-white border-none h-11/12">
         
        <AnimeDetails animeid={animeid} episodeid={episodeid}/>
       
        </DialogContent>
      </Dialog>
    )
  }

  
export const AnimeSection = ({ title, type, passinganime }) =>{
  const scrollContainerRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const [animedata,setanimedata] = useState(null)
    if(!passinganime){

    const getdata = async ()=>{
        let link = 'https://sushinimeapi.vercel.app/meta/anilist/trending?page=0&perPage=15'
        if(type=='updated')link = 'https://sushinimeapi.vercel.app/meta/anilist/recent-episodes?page=0&perPage=20&provider=gogoanime'
if(type=='Action') link='https://sushinimeapi.vercel.app/meta/anilist/advanced-search?genres=["Action"]'
if(type=='Comedy') link='https://sushinimeapi.vercel.app/meta/anilist/advanced-search?genres=["Comedy"]'        
if(type=='Fantasy') link='https://sushinimeapi.vercel.app/meta/anilist/advanced-search?genres=["Fantasy"]'   
if(type=='Mystery') link='https://sushinimeapi.vercel.app/meta/anilist/advanced-search?genres=["Mystery"]'   
if(type=='Romance') link='https://sushinimeapi.vercel.app/meta/anilist/advanced-search?genres=["Romance"]'   

        const response = await axios.get(link)
        if(response.data.results.length>0) {
          setanimedata(response.data.results)
          return
        }
        const response1 = await axios.get(link)
      
        if(response1.data.results.length>0) {
          setanimedata(response1.data.results)
          return
        }
        const response2 = await axios.get(link)
        if(response2.data.results.length>0) {
          setanimedata(response2.data.results)
          return
        }
        const response3 = await axios.get(link)
        if(response3.data.results.length>0) {
          setanimedata(response3.data.results)
          return
        }
        const response4 = await axios.get(link)
        if(response4.data.results.length>0) {
          setanimedata(response4.data.results)
          return
        }

    }

    useEffect(()=>{
      try{
        getdata()
      }catch(error){
        console.log(error)
      }

    },[])
  
  }else{
    useEffect(()=>{
      setanimedata(type)
          },[])
    
  }
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust the scroll amount
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust the scroll amount
        behavior: 'smooth',
      });
    }
  };
  const searchParams = useSearchParams(); // Get current search parameters

  const currentParams = new URLSearchParams(searchParams);
  
    return(

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
  <div className="flex   items-center">
      <Badge onClick={scrollLeft} className="bg-black hidden md:block">   <ArrowBigLeft size={24}/>    </Badge>
      <div ref={scrollContainerRef} className="flex  overflow-x-scroll gap-4">
    
      
    { animedata &&animedata.length>0 ? animedata.map((anime, index) => (
     
       <AnimeCard key={index} anime={anime} onClick={()=> {


    
        // Append the new query parameter
        currentParams.set('id', anime.id);
        
        // Push the new URL with the updated query parameters
        router.push(`${pathname}?${currentParams.toString()}`, {  scroll: false, });
     
      
  
       }
    
    } />
    )): [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((i)=><Skeleton key={i} className="min-w-[50%] max-w-[50%] md:min-w-[33.33%] md:max-w-[33.33%] lg:min-w-[16.66%] h-64 bg-slate-900 lg:max-w-[16.66%] rounded-xl" />)}
  
  </div>
  <Badge onClick={scrollRight} className="bg-black hidden md:block">    <ArrowBigRight size={24}/>    </Badge>
  </div>
    </section>
  )}
  export default AnimeSection