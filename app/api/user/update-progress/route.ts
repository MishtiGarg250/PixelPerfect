import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Get the user from our database using the Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const body = await req.json();
    const { itemId, status } = body;

    if (!itemId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use upsert to create or update the progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_itemId: {
          userId: user.id,
          itemId,
        },
      },
      update: { 
        status,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        itemId,
        status,
      },
    });

    return NextResponse.json(progress);
  } catch (err) {
    console.error("Error in update-progress route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
