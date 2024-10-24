"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Menu, Search,  } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import SearchForm from "@/components/ui/search-form";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster";
import EpisodeListx from "@/components/ui/episode-list";
import { useParams } from "next/navigation";




export default function watchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
    const params = useParams()
    const {animeid} = params
  return (
    <html lang="en">
          <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
      <body
        className={` antialiased `}
      >   <Toaster />
        <Analytics/> 
        <div className="min-h-screen bg-black text-white">
         <header className={`fixed top-0 w-full z-50 transition-all duration-500  bg-black`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
         <div className="flex  sm:block md:hidden items-center ">     
        <Sheet >
      <SheetTrigger asChild>
        <Button size={'icon'} variant="secondary" ><Menu/> </Button>
      </SheetTrigger>
      <SheetContent className="bg-black text-white flex-col gap-4" side={'left'}>
      <Link href="/">
  <img
    src="/headerlogo.png"
    alt="headerlogo"
    className="w-44 font-bold text-red-600"
  /></Link>
    
        
      <Link href="/" className="hover:text-gray-300 transition-colors">   <Button className="w-full mt-5 p-7">Home</Button></Link>


            <Link href="/genres" className="hover:text-gray-300 transition-colors">      <Button className="w-full mt-5 p-7">Explore</Button></Link>

         
            <Link href="/recently-updated" className="hover:text-gray-300 transition-colors">   <Button className="w-full mt-5 p-7">Recently Updated</Button></Link>

          
            <Link href="/trending" className="hover:text-gray-300 transition-colors">  <Button className="w-full mt-5 p-7"> Trending </Button></Link>
      
      </SheetContent>
    </Sheet>
    <Link href="/">

  <img
    src="/icon.png"
    alt="headerlogo"
    className="w-14 block sm:block md:hidden opacity-100 font-bold text-red-600"
  />
</Link>
    </div>  
        <Link href="/">
  <img
    src="/headerlogo.png"
    alt="headerlogo"
    className="w-44 hidden md:block opacity-100 font-bold text-red-600"
  />
 
</Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/genres" className="hover:text-gray-300 transition-colors">Explore</Link>
            <Link href="/recently-updated" className="hover:text-gray-300 transition-colors">Recently Updated</Link>
            <Link href="/trending" className="hover:text-gray-300 transition-colors">Trending</Link>
          </nav>
          
       <SearchForm/>

        </div>
      </header>

      <main className="pt-24">
      <div className="flex-grow flex w-screen h-screen overflow-auto flex-wrap">
      <div className="flex-grow w-full sm:w-3/4 flex flex-col p-3">

        {children}

</div>
<div className='w-full sm:w-1/4 p-3 '>

<EpisodeListx  animeid={animeid}/>
    </div>

</div>
</main>

        <footer className="bg-black/80 text-gray-400 py-8 mt-12">
        <div className="container mx-auto px-4">
       
          <div className="mt-8 text-center">
            <p>&copy; 2024 Sushinime. Developed by <a href="https://x.com/TushitGargg" target="_blank">Tushit Garg</a>  with ❤️</p>
          </div>
        </div>
      </footer>
        </div>
      </body>
    </html>
  );
}
