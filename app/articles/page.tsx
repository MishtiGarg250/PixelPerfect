import { AllArticlesPage } from "@/components/articles/all-article-page"
import { Button } from "@/components/ui/button"
import type React from "react"
import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { fetchArticleByQuery } from "@/lib/query/fetch-articles"
import Link from "next/link"
import { BookOpen } from "lucide-react"

type ArticlesPageProps = {
  searchParams: { page?: string }
}

const ITEMS_PER_PAGE = 3 // Number of items per page

const page: React.FC<ArticlesPageProps> = async ({ searchParams }) => {
  const currentPage = Number(searchParams.page) || 1
  const skip = (currentPage - 1) * ITEMS_PER_PAGE
  const take = ITEMS_PER_PAGE

  const { articles, total } = await fetchArticleByQuery("", skip, take)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

      <main className="relative z-10 container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-3xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
                  All Articles
                </h1>
                <p className="text-gray-400 mt-2">Discover amazing content from our community</p>
              </div>
            </div>
          </div>

          {/* Simple Stats */}
          {/* <div className="max-w-md mx-auto">
            <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-[#b5b5f6]/20 backdrop-blur-sm text-center">
              <div className="text-3xl font-bold text-white mb-2">{total}</div>
              <div className="text-gray-400">Articles Available</div>
            </div>
          </div> */}
        </div>

        {/* All article page */}
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticlesPage articles={articles} />
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-[#b5b5f6]/20 backdrop-blur-sm">
              <Link href={`?page=${currentPage - 1}`} passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === 1}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  ← Prev
                </Button>
              </Link>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link key={index} href={`?page=${index + 1}`} passHref>
                    <Button
                      variant={currentPage === index + 1 ? "default" : "ghost"}
                      size="sm"
                      disabled={currentPage === index + 1}
                      className={`min-w-[40px] rounded-xl transition-all duration-300 ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      {index + 1}
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Next Button */}
              <Link href={`?page=${currentPage + 1}`} passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === totalPages}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  Next →
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="p-8 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-3xl border border-[#b5b5f6]/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Want to contribute?</h3>
            <p className="text-gray-400 mb-6">Share your knowledge and help others learn</p>
            <Button className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full px-8">
              Write an Article
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default page

export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 backdrop-blur-sm rounded-2xl"
          style={{
            animationDelay: `${index * 200}ms`,
          }}
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <div className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-[#b5b5f6]/20 to-[#f7bff4]/20 animate-pulse"></div>

            {/* Category Badge Skeleton */}
            <div className="mb-3 h-6 w-20 rounded-full bg-gradient-to-r from-[#b5b5f6]/30 to-[#f7bff4]/30 animate-pulse"></div>

            {/* Article Title Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-6 w-full rounded-lg bg-gray-600/50 animate-pulse"></div>
              <div className="h-6 w-3/4 rounded-lg bg-gray-600/50 animate-pulse"></div>
            </div>

            {/* Article Excerpt Skeleton */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full rounded-lg bg-gray-700/50 animate-pulse"></div>
              <div className="h-4 w-5/6 rounded-lg bg-gray-700/50 animate-pulse"></div>
            </div>

            {/* Author & Metadata Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#b5b5f6]/30 to-[#f7bff4]/30 animate-pulse"></div>

                <div className="space-y-1">
                  {/* Author Name Skeleton */}
                  <div className="h-4 w-20 rounded-lg bg-gray-600/50 animate-pulse"></div>
                  {/* Author Title Skeleton */}
                  <div className="h-3 w-16 rounded-lg bg-gray-700/50 animate-pulse"></div>
                </div>
              </div>

              {/* Date & Read Time Skeleton */}
              <div className="space-y-1 text-right">
                <div className="h-4 w-24 rounded-lg bg-gray-700/50 animate-pulse"></div>
                <div className="h-3 w-16 rounded-lg bg-gray-700/50 animate-pulse"></div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-16 rounded-full bg-gray-600/50 animate-pulse"></div>
                <div className="h-8 w-16 rounded-full bg-gray-600/50 animate-pulse"></div>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#b5b5f6]/30 to-[#f7bff4]/30 animate-pulse"></div>
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </Card>
      ))}
    </div>
  )
}
