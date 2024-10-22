import { getUserSession } from "@/lib/getsessionuser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    let body = await req.json();
    
    const user = await getUserSession()
    if(!user) return new Response('Not Authenticated',{status:500})



const resp = await prisma.comment.create({data:{
    email:user.email,
    animeid: body.animeid,
  episodeid: body.episodeid,
  name: user.name,
  avatar: user.image,
  text: body.text
}

})


return  NextResponse.json(resp)
}