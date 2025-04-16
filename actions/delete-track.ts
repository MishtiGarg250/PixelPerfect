"use server"
import {prisma} from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteTrack = async (trackId: string) => {
    // First delete all RoadmapItems for modules in this track
    const modules = await prisma.module.findMany({
      where: { trackId },
      select: { id: true },
    })
  
    const moduleIds = modules.map((m) => m.id)
  
    // Delete all RoadmapItems that depend on those modules
    await prisma.roadmapItem.deleteMany({
      where: {
        moduleId: { in: moduleIds }
      }
    })
  
    // Then delete modules
    await prisma.module.deleteMany({
      where: { trackId }
    })
  
    // Finally delete the track
    await prisma.track.deleteMany({
      where: { id: trackId }
    })
  }
  