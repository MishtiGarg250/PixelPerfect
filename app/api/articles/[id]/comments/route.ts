import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First check if the article exists
    const article = await prisma.articles.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Then fetch the comments
    const comments = await prisma.comment.findMany({
      where: {
        articleId: params.id,
      },
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
       
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return empty array if no comments
    return NextResponse.json({ 
      comments: comments || [],
      total: comments.length 
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
} 