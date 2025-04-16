"use client"
import {useRouter} from "next/navigation";
import React, {useActionState} from "react"
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { createComments } from "@/actions/create-comments"

type CommentFormProps={
    articleId:string,
    userId:string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({articleId,userId})=>{
    const router =useRouter();
    const [formState,action,isPending] = useActionState(createComments.bind(null,articleId),{
        errors:{},

    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!userId) {
          e.preventDefault(); // Prevent form submission
          router.push(
            "https://star-condor-3.accounts.dev/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard"
          );
        }
        // else, let the action run normally
      };
    return(
        <form action={action} className="mb-8" onSubmit={handleSubmit}>
            <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/current-user-avatar.jpg"/>
                    <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <Input placeholder="Add a comment..." name="body" className="py-6 text-base"/>
                    {formState.errors.body && <p className="text-red-600 text-sm font-medium">{formState.errors.body}</p>}
                    <div className="mt-4 flex jsutify-end">
                        <Button disabled={isPending} type="submit">
                            {isPending ? "Loading":"Post Comment"}
                        </Button>
                    </div>
                    {
                        formState.errors.formErrors && <div className="p-2 border border-red-600 bg-red-100">{formState.errors.formErrors[0]}</div>
                    }
                </div>
            </div>
        </form>
    )
}

export default CommentForm