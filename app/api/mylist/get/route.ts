import { getUserSession } from "@/lib/getsessionuser"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req){
    const user = await getUserSession()
    if(!user) return new Response('Not Authenticated',{status:500})
      const data = await prisma.myList.findMany({
    where:{
        email:user.email
    }}) 
    const animedata = []
    if(data.length>0){
        for(let i=0; i<data.length; i++){
          animedata.push( JSON.parse( data[i].anime) )
        }
    }
    return NextResponse.json({animedata})
}