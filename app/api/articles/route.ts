import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server"

export async function GET(){
    const articles = await prisma.articles.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          comments: true,
          author: {
            select: {
              name: true,
              email: true,
              imageUrl: true,
            },
          },
        },
      });
      console.log(articles);

    return NextResponse.json({articles});
}