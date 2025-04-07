import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { Navbar } from "../home/header/navbar";

type SearchPageProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

export function AllArticlesPage({ articles }: SearchPageProps) {
  if (articles.length === 0) return <NoSearchResults />;

  return (
    <div>
      
    <div className="min-h-screen p-6  text-white rounded-lg">

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="group relative overflow-hidden hover:shadow-pink-500/20 transition-all duration-300"
          >
            <div className="p-4">
              {/* Image Container */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Article Content */}
              <h3 className="text-xl font-semibold text-white group-hover:text-pink-400 transition-colors duration-300">
                {article.title}
              </h3>
              <p className="mt-1 text-sm text-pink-300">{article.category}</p>

              {/* Author and Meta Data */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.imageUrl as string} />
                    <AvatarFallback>
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-300">
                    {article.author.name}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(article.createdAt).toDateString()}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
}

export function NoSearchResults() {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        {/* Icon */}
        <div className="mb-4 rounded-full bg-[#1f1b38] p-4 shadow-md border border-[#302b63]">
          <Search className="h-8 w-8 text-pink-300" />
        </div>
  
        {/* Title */}
        <h3 className="text-2xl font-semibold text-white">No results found</h3>
  
        {/* Description */}
        <p className="mt-2 text-gray-400 max-w-md">
          We couldn't find any articles matching your search. Try a different
          keyword or phrase.
        </p>
      </div>
    );
  }
  