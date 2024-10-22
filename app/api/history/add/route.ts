import { getUserSession } from "@/lib/getsessionuser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    let body = await req.json();
    const {animeid, episodeid, anime} = body;

    const user = await getUserSession()
    if(!animeid || !episodeid|| !anime||!user) return new Response('Not Authenticated',{status:500})


const data = await prisma.history.upsert({
   where :{
    email_animeid: {
        email:user.email,
        animeid: body.animeid
    }},
    update:{
        episodeid:body.episodeid,
        
    },
    create:{
        email:user.email,
        animeid: body.animeid,
        episodeid:body.episodeid,
        anime: JSON.stringify( body.anime)
    }
})




return  NextResponse.json(data)
}