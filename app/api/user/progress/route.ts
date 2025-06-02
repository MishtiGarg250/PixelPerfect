import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  const tracks = await prisma.track.findMany({
    include: {
      modules: {
        include: {
          items: {
            include: {
              progress: userId
                ? {
                    where: { userId },
                  }
                : true, // Don't include progress if not logged in
            },
          },
        },
      },
    },
  });

  return Response.json({ tracks });
}

