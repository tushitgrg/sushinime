import { getUserSession } from "@/lib/getsessionuser"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req){
    const user = await getUserSession()
    if(!user) return new Response('Not Authenticated',{status:500})
      const data = await prisma.history.findMany({
    where:{
        email:user.email
    }}) 
  
    return NextResponse.json({history:data})
}