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



export const metadata: Metadata = {
  title: "Sushinime",
  description: "Watch Anime for free",
  openGraph: {
    title: "Sushinime",
    description: "Watch Anime for free",
    siteName: 'Sushinime',
    images: [
      {
        url: '/icon.png', 
        width: 50,
        height: 50,
        alt: 'Logo Alt Text',
      },
    ],
    type: 'website',

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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

        {children}
        <footer className="bg-black/80 text-gray-400 py-8 mt-12">
        <div className="container mx-auto px-4">
          {/* <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4 text-red-600">Sushinime</h3>
              <p>Your ultimate destination for anime streaming.</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <Button type="submit" className="bg-red-600 hover:bg-red-700 transition-colors rounded-l-none">Subscribe</Button>
              </form>
            </div>
          </div> */}
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
