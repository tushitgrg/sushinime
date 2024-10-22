"use client"
import LoginBoundary from '@/components/test/login-boundary'
import AnimeSection from '@/components/ui/anime-section'
import HistorySection from '@/components/ui/history-section'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-black text-white">
    

    <main className="pt-20">
        <LoginBoundary fallback='You are not Logged in'>
    <AnimeSection title="My List"   type='MyList' passinganime={false}/>
    <HistorySection/>
    </LoginBoundary>
        </main>
        </div>
  )
}

export default page