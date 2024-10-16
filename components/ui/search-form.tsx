"use client"
import React, { useState } from 'react'
import { Input } from './input'
import { BadgePlus, ChevronDown, Link, Search,  } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import {Sheet, SheetTrigger, SheetContent, SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'

const SearchForm = () => {
  const router = useRouter()
  const [searchq, setsearchq] = useState('')
  const handlesubmit = (e)=>{
    e.preventDefault()
    if(searchq)  router.push(`/search?query=${searchq}`, )
   

  }
  return (
    <div className="flex items-center space-x-4 ">
{/*            
           <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
       <Button className="w-full">
      <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></Button>
      <Button className="w-full">
            <Link href="/genres" className="hover:text-gray-300 transition-colors">Explore</Link></Button>
            <Button className="w-full">
            <Link href="/recently-updated" className="hover:text-gray-300 transition-colors">Recently Updated</Link></Button>
            <Button className="w-full">
            <Link href="/trending" className="hover:text-gray-300 transition-colors">Trending</Link></Button>
      
      </SheetContent>
    </Sheet> */}



    <form className="relative hidden sm:block" onSubmit={handlesubmit}    id="searchform">
      <Input
        type="search"
    value={searchq}
    onChange={(e)=>setsearchq(e.target.value)}
        placeholder="Search"
        className="pl-10 pr-4 py-2 bg-black/60 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 w-40   md:w-64 transition-all duration-300 md:focus:w-80"
      />
      <Search className="absolute left-3 top-1/2 transform  -translate-y-1/2 text-gray-400" size={18} />
    </form>
    <Search onClick={()=> {if(document.getElementById('searchform')?.classList.contains('hidden'))  document.getElementById('searchform')?.classList.remove('hidden') 
    else document.getElementById('searchform')?.classList.add('hidden') 


    }} className="text-gray-300 hover:text-white block sm:hidden md:hidden transition-colors cursor-pointer " />
    <div className="flex items-center space-x-2 cursor-pointer group" >
      <a href="https://x.com/tushitgargg" target='_blank'>
      <img src="/mypfp.jpg" alt="User" className="w-8 h-8 rounded" />
      </a>

      {/* <ChevronDown className="text-white group-hover:rotate-180 transition-transform duration-300" size={16} /> */}
    </div>
  </div>
  )
}

export default SearchForm