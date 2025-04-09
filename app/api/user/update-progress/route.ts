import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust to your Prisma client
import { auth } from "@clerk/nextjs/server"; // Clerk server-side auth

export async function POST(req: Request) {
    try {
        
        const {userId }= await auth();
        
        if (!userId) {
          return new Response("Unauthorized", { status: 401 });
        }
        
        const userExists = await prisma.user.findUnique({
          where: {id: userId },
        });
        
        if (!userExists) {
          return new Response("User not found", { status: 404 });
        }
        
      const body = await req.json();
      const {itemId,status} = body;
  
      console.log("userId:", userId);
      console.log("Received body:", body);

  
      // Add safety checks:
      if (!userId || !itemId || !status) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      const progress = await prisma.progress.upsert({
        where:{
        userId_itemId:{
            userId,
            itemId,
          }
        },
        
        update: { status },
        create: {
          userId,
          itemId,
          status,
        },
      });
      

      console.log("progress:", progress); // ✅ Better

      return NextResponse.json(progress)
    } catch (err) {
      console.error("Error in update-progress route:", err);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  