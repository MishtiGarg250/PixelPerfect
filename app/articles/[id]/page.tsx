"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageCircle, Share2, Calendar, User, Eye } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { formatDistanceToNow } from "date-fns"
import { toggleLike } from "@/actions/like-toggle"
import { useTransition } from "react"
import { toast } from "sonner"
import CommentForm from "@/components/comments/comment-form"
import CommentList from "@/components/comments/comment-list"
import type { Prisma } from "@prisma/client"

type Article = {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    imageUrl: string
  }
  createdAt: string
  likes: number
  comments: number
  isLiked: boolean
}

type Comment = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: {
        name: true
        imageUrl: true
      }
    }
    likes: true
  }
}>

const ArticlePage = () => {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useUser()
  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/articles/${id}/comments`)
      if (res.data.comments) {
        setComments(res.data.comments)
      }
    } catch (err) {
      console.error("Error fetching comments:", err)
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        toast.error("Article not found")
      } else {
        toast.error("Failed to load comments")
      }
    }
  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/api/articles/${id}`)
        setArticle(res.data.article)
        setError(null)
        // Fetch comments after article is loaded
        await fetchComments()
      } catch (err) {
        console.error("Error fetching article:", err)
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("Article not found")
        } else {
          setError("Failed to load article")
        }
        toast.error("Failed to load article")
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticle()
  }, [comments, setComments, id])

  const handleLike = async () => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    if (!article) return

    startTransition(async () => {
      try {
        await toggleLike(article.id)
        setArticle((prev) =>
          prev
            ? {
                ...prev,
                likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
                isLiked: !prev.isLiked,
              }
            : null,
        )
        toast.success(article.isLiked ? "Article unliked" : "Article liked")
      } catch (err) {
        console.error("Error toggling like:", err)
        toast.error("Failed to update like")
      }
    })
  }

  const handleCommentAdded = async (newComment: Comment) => {
    try {
      setComments((prev) => [newComment, ...prev])
      setArticle((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments + 1,
            }
          : null,
      )
      toast.success("Comment added successfully")
      // Refresh comments to get the latest data
      await fetchComments()
    } catch (err) {
      console.error("Error adding comment:", err)
      toast.error("Failed to add comment")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <div className="text-2xl font-semibold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Loading Article...
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

        <div className="relative z-10 text-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-3xl border border-[#b5b5f6]/20 backdrop-blur-sm">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
            {error || "Article not found"}
          </h1>
          <p className="text-gray-400 mb-6">The article you are looking for does not exist or has been removed.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full px-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b5b5f6]/5 via-transparent to-[#f7bff4]/5"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#b5b5f6]/10 to-transparent"></div>

      {/* Header Section */}
      <div className="relative z-10 bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-b border-[#b5b5f6]/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/articles">
              <Button
                variant="ghost"
                className="text-[#b5b5f6] hover:text-white hover:bg-[#b5b5f6]/10 transition-all duration-300 rounded-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={article.author.imageUrl || "/placeholder.svg"}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-[#b5b5f6]/30"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-full flex items-center justify-center">
                  <User className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <span className="font-semibold text-white text-lg">{article.author.name}</span>
                <div className="text-sm text-gray-400">Author</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-[#f7bff4]">
                {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 backdrop-blur-sm border border-[#b5b5f6]/20 rounded-3xl shadow-2xl p-8 sm:p-12 mb-8">
          <article
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:bg-gradient-to-r prose-headings:from-[#b5b5f6] prose-headings:to-[#f7bff4] prose-headings:bg-clip-text prose-headings:text-transparent
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-[#b5b5f6] prose-a:hover:text-[#f7bff4] prose-a:transition-colors
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-[#f7bff4] prose-code:bg-gray-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700/50 prose-pre:rounded-xl
              prose-blockquote:border-l-[#b5b5f6] prose-blockquote:bg-gray-800/30 prose-blockquote:rounded-r-xl
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Button
            variant="outline"
            className={`transition-all duration-300 rounded-full px-6 py-3 ${
              article.isLiked
                ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50 text-red-400 hover:from-red-500/30 hover:to-pink-500/30"
                : "border-[#b5b5f6]/30 text-[#b5b5f6] hover:bg-[#b5b5f6]/10 hover:border-[#b5b5f6]/50 hover:text-white"
            }`}
            onClick={handleLike}
            disabled={isPending}
          >
            <Heart
              className={`h-5 w-5 mr-2 transition-all duration-300 ${article.isLiked ? "fill-current scale-110" : ""}`}
            />
            {article.likes} {article.likes === 1 ? "Like" : "Likes"}
          </Button>

          <Button
            variant="outline"
            className="border-[#f7bff4]/30 text-[#f7bff4] hover:bg-[#f7bff4]/10 hover:border-[#f7bff4]/50 hover:text-white transition-all duration-300 rounded-full px-6 py-3"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </Button>

          <Button
            variant="outline"
            className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10 hover:border-gray-400/50 hover:text-white transition-all duration-300 rounded-full px-6 py-3"
            onClick={() => {
              navigator
                .share({
                  title: article.title,
                  text: article.title,
                  url: window.location.href,
                })
                .catch(() => {
                  // Fallback for browsers that don't support Web Share API
                  navigator.clipboard.writeText(window.location.href)
                  toast.success("Link copied to clipboard")
                })
            }}
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 backdrop-blur-sm border border-[#b5b5f6]/20 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Comments
            </h2>
          </div>

          {!user ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-800/30 to-gray-700/30 backdrop-blur-sm border border-[#b5b5f6]/20 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-300 mb-6 text-lg">Please sign in to join the conversation</p>
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] hover:from-[#c5c5f8] hover:to-[#f8cff6] text-black transition-all duration-300 transform hover:scale-105 shadow-lg rounded-full px-8">
                  Sign In to Comment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <CommentForm articleId={article.id} userId={user.id} onCommentAdded={handleCommentAdded} />
              <CommentList comments={comments} userId={user.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
