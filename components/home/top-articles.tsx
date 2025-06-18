"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Author = {
  imageUrl?: string;
  name: string;
};

type Article = {
  id?: string;
  title: string;
  category: string;
  author: Author;
  featuredImage?: string;
  createdAt: Date;
};

export default function TopArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await axios.get("/api/articles");
    setArticles(res.data.articles);
  };

  return (
    <section className="py-20" id="articles">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-white">
        Top Articles To{" "}<span className="text-[#b5b5f6]">Supercharge</span> your{" "}
        <span className="text-[#b5b5f6]">Tech Journey</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-10 mt-12">
        {articles.slice(0, 3).map((article) => (
          <Card
            key={article.id}
            className={cn(
              "w-[440px] group relative overflow-hidden transition-all hover:scale-[1.02]",
              "border border-gray-200/50 dark:border-white/10",
              "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
            )}
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <Link href={`/articles/${article.id}`}>
                {/* Image */}
                <div className="relative mb-4 h-52 w-full overflow-hidden rounded-xl">
                  <Image
                    src={article.featuredImage as string}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.imageUrl as string} />
                    <AvatarFallback>
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <span>{article.author.name}</span>
                </div>

                {/* Article Title */}
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {article.title}
                </h3>

                {/* Category */}
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {article.category}
                </p>

                {/* Meta Info */}
                <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(article.createdAt).toDateString()}</span>
                  <span>12 min read</span>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
