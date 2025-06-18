import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user from our database using the Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const tracks = await prisma.track.findMany({
      include: {
        modules: {
          include: {
            items: {
              include: {
                progress: {
                  where: { userId: user.id },
                },
              },
            },
          },
        },
      },
    });

    return Response.json({ tracks });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

