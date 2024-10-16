"use client"
import GenrePage from '@/components/genrepage'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useParams()
  const {genreid}= params
  return (
<GenrePage genre={genreid}/>
  )
}

export default page