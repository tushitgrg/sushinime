"use client"
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
    const params = useParams();
const {animeid} = params
const router = useRouter()
useEffect(()=>{
    router.push(`/?id=${animeid}`)
},[])
  return (
    <div>Loading</div>
  )
}

export default Page