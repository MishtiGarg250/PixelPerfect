import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server"
import {auth} from "@clerk/nextjs/server"

export async function GET(){
    try {
        const {userId} = await auth()
        const articles = await prisma.articles.findMany({
            orderBy: {
              createdAt: "desc",
            },
            include: {
              author: {
                select: {
                  name: true,
                  email: true,
                  imageUrl: true,
                },
              },
              likes: {
                where: {
                  userId: userId || "",
                },
              },
              _count: {
                select: {
                  likes: true,
                  comments: true,
                },
              },
            },
          });

        // Transform the data to match the expected format
        const transformedArticles = articles.map((article) => ({
          id: article.id,
          title: article.title,
          content: article.content,
          category: article.category,
          featuredImage: article.featuredImage,
          author: {
            name: article.author.name,
            email: article.author.email,
            imageUrl: article.author.imageUrl,
          },
          createdAt: article.createdAt.toISOString(),
          likes: article._count.likes,
          comments: article._count.comments,
          isLiked: article.likes.length > 0,
        }));

        return NextResponse.json({articles: transformedArticles});
    } catch (error) {
        console.error("[ARTICLES_GET]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}