import {
  FileText,
  MessageCircle,
  PlusCircle,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import RecentArticles from "./RecentArticles";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function BlogDashboard() {
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
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
    }),
    prisma.comment.count(),
  ]);

  return (
    <main className="relative flex-1 p-4 md:p-8  text-white min-h-screen rounded-lg shadow-inner overflow-hidden">

      {/* Optional background blur effect */}
      <div className="absolute inset-0 z-[-1] opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-transparent blur-3xl" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-purple-50">
            Manage your content and analytics
          </p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="gap-2  text-purple-200/50 border-1 border-purple-400
           transition-all duration-300">
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {/* Total Articles */}
        <Card className="border-purple-500 border hover:shadow-purple-500/20 transition duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-purple-300">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-pink-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-200/50">{articles.length}</div>
            <p className="text-xs text-purple-200/50 mt-1">
              +5 from last month
            </p>
          </CardContent>
        </Card>

        {/* Total Comments */}
        <Card className="border-purple-500 border hover:shadow-purple-500/20 transition duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-purple-300">
              Total Comments
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-pink-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-200/50">{totalComments}</div>
            <p className="text-xs text-purple-200/50 mt-1">
              12 awaiting moderations
            </p>
          </CardContent>
        </Card>

        {/* Avg Reading Time */}
        <Card className="border-purple-500 border hover:shadow-purple-500/20 transition duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-300">
              Total Likes
            </CardTitle>
            <FileText className="h-4 w-4 text-pink-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-200/50">0</div>
            <p className="text-xs text-purple-200/50 mt-1">
              +5 from last month
            </p>
          </CardContent>
        </Card>
        
      </div>

      {/* Recent Articles Section */}
      <RecentArticles articles={articles} />
    </main>
  );
}
