import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server"; // assuming Clerk for auth

export async function GET(req: Request) {
  const { userId } = await getAuth(req);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      progress: true,
    },
  });

  const tracks = await prisma.track.findMany({
    include: {
      modules: {
        include: {
          items: {
            include: {
              progress: {
                where: { userId: user?.id },
              },
            },
          },
        },
      },
    },
  });

  return Response.json({ tracks });
}
