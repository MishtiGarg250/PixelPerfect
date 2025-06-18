import type { Prisma } from "@prisma/client";
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

import { formatDistanceToNow } from "date-fns"

type CommentListProps = {
    comments: Prisma.CommentGetPayload<{
        include:{
            author:{
                select:{
                    name:true;
                    imageUrl:true;
                }
            }
            likes: true;
        }
    }>[];
    userId: string | null;
}

const CommentList: React.FC<CommentListProps> = ({comments}) => {
    

    

    return(
        <div className="flex flex-col gap-6">
            {comments.map((comment)=>(
                <div key={comment.id} className="flex gap-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.author.imageUrl as string}/>
                        <AvatarFallback className="text-[#b5b5f6] border-2 border-[#b5b5f6]">
                            {comment.author.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">
                                        {comment.author.name}
                                    </span>
                                    <span className="text-sm text-purple-200/50">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-purple-200/80 mt-1">{comment.body}</p>
                            </div>
                            
                        </div>
                        
                        {/* <div className="flex items-center gap-4 mt-2">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`text-purple-200/50 hover:text-purple-200 hover:bg-purple-900/20 ${
                                    comment.likes.some(like => like.userId === userId) ? "text-purple-400" : ""
                                }`}
                                onClick={() => handleLike(comment.id)}
                                disabled={isPending}
                            >
                                <ThumbsUp className={`h-4 w-4 mr-2 ${
                                    comment.likes.some(like => like.userId === userId) ? "fill-current" : ""
                                }`} />
                                {comment.likes.length} {comment.likes.length === 1 ? 'Like' : 'Likes'}
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-purple-200/50 hover:text-purple-200 hover:bg-purple-900/20"
                            >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Reply
                            </Button>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentList