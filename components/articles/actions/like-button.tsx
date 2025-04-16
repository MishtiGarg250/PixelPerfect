"use client"

import { Button } from "@/components/ui/button"
import { Bookmark, Share2,ThumbsUp } from "lucide-react"
import React, {useOptimistic,useTransition} from 'react'
import {toggleLike} from "@/actions/like-toggle"
import type { Like } from "@prisma/client"
import { useRouter } from "next/navigation"

type LikeButtonProps = {
    articleId: string;
    likes: Like[];
    isLiked: boolean;
    userId: string;
}

const LikeButton: React.FC<LikeButtonProps>=({
    articleId,likes,isLiked,userId
})=>{
    const router = useRouter();
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes.length);
    const [isPending,startTransition] = useTransition();

    const handleLike = async()=>{
        if (!userId) {
            router.push("https://star-condor-3.accounts.dev/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard");
            return;
          }
        startTransition(async()=>{
            setOptimisticLikes(isLiked? optimisticLikes-1:optimisticLikes+1);
            await toggleLike(articleId);
        })
    };

    return(
        <div className="flex gap-4 mb-12 border-t pt-8">
            <form action={handleLike}>
                <Button
                type="button"
                variant='ghost'
                className="gap-2"
                onClick={handleLike}
                disabled={isPending}
                >
                    <ThumbsUp className="h-5 w-5"/>
                    {optimisticLikes}
                </Button>
            </form>
            <Button variant="ghost" className="gap-2">
                <Bookmark className="h-5 w-5"/>Save
            </Button>
            <Button variant = "ghost" className="gap-2">
                <Share2 className="h-5 w-5"/> Share
            </Button>
        </div>
    )
}

export default LikeButton