import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if(!userId){
      throw new Error("Unauthenticated");
    }
    const article = await prisma.articles.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          }

        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!article) {
      return new NextResponse("Article not found", { status: 404 });
    }

    // Transform the data to match the expected format
    const transformedArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      author: {
        id: article.author.id,
        name: article.author.name,
        imageUrl: article.author.imageUrl,
      },
      createdAt: article.createdAt.toISOString(),
      likes: article._count.likes,
      comments: article._count.comments,
      isLiked: article.likes.length > 0,
    };

    return NextResponse.json({ article: transformedArticle });
  } catch (error) {
    console.error("[ARTICLE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
