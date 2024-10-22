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
import { fetchDataRedis } from "@/lib/fetchdata"



  
export const HistorySection = ({ title="Continue Watching" }) =>{
  const scrollContainerRef = useRef(null);
    const router = useRouter();
    
    const [animedata,setanimedata] = useState(null)
   

    const getdata = async ()=>{
   const response = await axios.get('/api/history/get')

     setanimedata(response.data.history)

    }

    useEffect(()=>{
  
      try{
        getdata()
      }catch(error){
        console.log(error)
      }

    },[])
  
 

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
  // Get current search parameters

 
  
    return(

    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
  <div className="flex   items-center">
      <Badge onClick={scrollLeft} className="bg-black hidden md:block">   <ArrowBigLeft size={24}/>    </Badge>
      <div ref={scrollContainerRef} className="flex w-screen  overflow-x-scroll gap-4">
    
      
    { animedata ? <> {animedata.length>0 ? animedata.map((anime, index) => (
     
       <AnimeCard key={index} anime={JSON.parse(anime.anime)} onClick={()=> {


    
        router.push(`/watch/${anime.animeid}/${anime.episodeid}`);
     
      
  
       }
    
    } />
    )) :'No History Yet'}  </>  : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((i)=><Skeleton key={i} className="min-w-[50%] max-w-[50%] md:min-w-[33.33%] md:max-w-[33.33%] lg:min-w-[16.66%] h-64 bg-slate-900 lg:max-w-[16.66%] rounded-xl" />)}
  
  </div>
  <Badge onClick={scrollRight} className="bg-black hidden md:block">    <ArrowBigRight size={24}/>    </Badge>
  </div>
    </section>
  )}
  export default HistorySection