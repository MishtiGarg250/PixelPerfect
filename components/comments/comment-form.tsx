"use client"
import {useRouter} from "next/navigation";
import React, {useActionState} from "react"
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createComments } from "@/actions/create-comments"
import { useUser } from "@clerk/nextjs/";
import { Send } from "lucide-react"

type CommentFormProps={
    articleId:string,
    userId:string | null;
    onCommentAdded?: (comment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({articleId, userId, onCommentAdded})=>{
    const router =useRouter();
    const {user} = useUser();
    const [formState,action,isPending] = useActionState(createComments.bind(null,articleId),{
        errors:{},
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!userId) {
          e.preventDefault(); // Prevent form submission
          router.push(
            "https://star-condor-3.accounts.dev/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard"
          );
          return;
        }

        const formData = new FormData(e.currentTarget);
        const result = await action(formData);
        
        if (!result.errors.body && !result.errors.formErrors) {
          // Clear the form
          e.currentTarget.reset();
          
          // Call the callback if provided
          if (onCommentAdded) {
            onCommentAdded({
              id: Date.now().toString(), // Temporary ID
              body: formData.get('body'),
              createdAt: new Date().toISOString(),
              author: {
                name: user?.fullName || 'Anonymous',
                imageUrl: user?.imageUrl,
              },
              likes: [],
            });
          }
        }
    };

    return(
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback className="bg-purple-900/50 text-purple-300 border-2 border-purple-800/50">
                        {user?.firstName?.[0] || "U"}
                    </AvatarFallback>
                </Avatar>
                
                <div className="relative flex-1">
                    <Input 
                        placeholder="Add a comment..." 
                        name="body" 
                        className="py-6 text-base bg-zinc-900/50 border-[#b5b5f6] text-purple-200 placeholder-[#b5b5f6] focus:ring-1 focus:ring-[#b5b5f6]focus:border-transparent"
                    />
                    <Button 
                        type="submit" 
                        disabled={isPending} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 border-1 border-[#b5b5f6] hover:bg-[#f7bff4] text-white"
                    >
                        <Send className="h-4 w-4 text-[#b5b5f6]" />
                    </Button>
                </div>
            </div>
            {formState.errors.body && (
                <p className="text-red-400 text-sm font-medium mt-1">{formState.errors.body}</p>
            )}
            {formState.errors.formErrors && (
                <div className="p-2 border border-red-600 bg-red-900/20 text-red-400 rounded-lg mt-2">
                    {formState.errors.formErrors[0]}
                </div>
            )}
        </form>
    )
}

export default CommentForm