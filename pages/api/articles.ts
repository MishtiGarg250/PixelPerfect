import { prisma } from "@/lib/prisma";
export default async function handler(req, res) {
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

  return res.status(200).json(articles);
}
