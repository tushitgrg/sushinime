"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import ReactPlayer from 'react-player'
import HlsPlayer from '@/components/test/plyr-player'
import PlrVideoPlayer from '@/components/test/plyr-player'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AnimeDetails } from '@/components/anime-id-page'
import { AnimePlayer } from '@/components/player'
import { v4 as uuidv4 } from 'uuid';
import CommentSection from '@/components/ui/comments'
const page = () => {

const [current, setcurrent] = useState({default:null, backup:null})
const params = useParams();
const {episodeid,animeid} = params
const router = useRouter()


useEffect(()=>{


  const uid = localStorage.getItem('uid')
  if(!uid){
    
    localStorage.setItem('uid',uuidv4())
  }
    },[])
  return (
    <>
    <AnimePlayer animeid={animeid} episodeid={episodeid}/>

    </>
  
  )
}

export default page
{/* <ReactPlayer playing={true} controls={true} url={current.default||current.backup} /> */}
{/* <iframe src={ `https://plyr.link/p/player.html#${btoa(current.default||current.backup)}` } scrolling="no" frameBorder="0" allowFullScreen={true} title={params.streamid} allow="picture-in-picture" className="w-screen h-screen"></iframe> */}