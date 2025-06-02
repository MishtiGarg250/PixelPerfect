// app/user/dashboard/commentedarticles/page.tsx

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function CommentedArticlesPage() {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) return redirect("/sign-in");

  // Get comments by user and fetch the associated article and author
  const userComments = await prisma.like.findMany({
    where: { userId: user.id },
    include: {
      article: {
        include: {
          author: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  // Create a unique list of articles (avoid duplicates if multiple comments exist)
  const uniqueArticlesMap = new Map();
  userComments.forEach((comment) => {
    uniqueArticlesMap.set(comment.article.id, comment.article);
  });

  const uniqueArticles = Array.from(uniqueArticlesMap.values());

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 md:px-10 text-white">
      <h1 className="text-3xl font-bold mb-6">📝 Commented Articles</h1>

      {uniqueArticles.length === 0 ? (
        <p>You have not commented on any articles yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {uniqueArticles.map((article) => (
            <Card key={article.id} className="p-6">
              <Link href={`/articles/${article.id}`}>
                <h2 className="text-xl font-semibold mb-2 hover:underline">
                  {article.title}
                </h2>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                {article.category} ·{" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl || ""} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{article.author.name}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
