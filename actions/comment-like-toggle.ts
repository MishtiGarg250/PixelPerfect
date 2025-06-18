"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function toggleCommentLike(commentId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to like a comment");

    // Ensure the user exists in database
    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        },
    });

    if (!user) {
        throw new Error("User does not exist in the database.");
    }

    // Check if the user has already liked the comment
    const existingLike = await prisma.commentLike.findFirst({
        where: { commentId, userId: user.id },
    });

    if (existingLike) {
        // Unlike the comment
        await prisma.commentLike.delete({
            where: { id: existingLike.id },
        });
    } else {
        // Like the comment
        await prisma.commentLike.create({
            data: { commentId, userId: user.id }
        });
    }

    // Get the article ID for revalidation
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: { articleId: true }
    });

    if (comment) {
        revalidatePath(`/articles/${comment.articleId}`);
    }
} 