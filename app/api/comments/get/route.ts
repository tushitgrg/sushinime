import { getUserSession } from "@/lib/getsessionuser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    let body = await req.json();



const resp = await prisma.comment.findMany({where:{

    animeid: body.animeid,
  episodeid: body.episodeid,

}, orderBy:{
    createdAt:"desc"
}

})


return  NextResponse.json(resp)
}