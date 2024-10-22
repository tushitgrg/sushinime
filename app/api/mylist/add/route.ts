import { getUserSession } from "@/lib/getsessionuser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    let body = await req.json();
    
    const user = await getUserSession()
    if(!user) return new Response('Not Authenticated',{status:500})


const prev = await prisma.myList.findMany({
    where:{
        email:user.email,
        animeid: body.id
    }
})
console.log(prev)
if(prev.length>=1) return  NextResponse.json(prev[0])


const resp = await prisma.myList.create({data:{
    email:user.email,
    animeid: body.id,
    anime: JSON.stringify(body)
}

})

console.log(resp)
return  NextResponse.json(resp)
}