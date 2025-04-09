import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export const getOrCreateUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("User not authenticated");

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });

  if (existingUser) return existingUser;

  // Create a new user if not found
  const newUser = await prisma.user.create({
    data: {
      clerkUserId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      imageUrl: clerkUser.imageUrl,
      role: "user", // default role
    },
  });

  return newUser;
};
