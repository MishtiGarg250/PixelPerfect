import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const created = await prisma.track.create({
      data: {
        title: body.title,
        description: body.description,
        modules: {
          create: body.modules.map((mod) => ({
            title: mod.title,
            items: {
              create: mod.items.map((item) => ({
                title: item.title,
                link: item.link || null,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({ success: true, track: created });
  } catch (error) {
    console.error("Failed to create track", error);
    return new NextResponse("Failed", { status: 500 });
  }
}


export async function GET() {
  const tracks = await prisma.track.findMany({
    include: {
      modules: {
        include: {
          items: true,
        },
      },
    },
  });

  return NextResponse.json({ tracks });
}


export async function PUT(req: Request) {
  const body = await req.json();
  const { id, title, description, modules } = body;

  if (!id || !title || !Array.isArray(modules)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    // Delete all old modules and items (for simplicity)
    await prisma.module.deleteMany({ where: { trackId: id } });

    // Now update the track and recreate modules/items
    const updatedTrack = await prisma.track.update({
      where: { id },
      data: {
        title,
        description,
        modules: {
          create: modules.map((mod) => ({
            title: mod.title,
            items: {
              create: mod.items.map((item) => ({
                title: item.title,
                link: item.link || null,
              })),
            },
          })),
        },
      },
      include: {
        modules: {
          include: {
            items: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, updatedTrack });
  } catch (error) {
    console.error("Failed to update track", error);
    return NextResponse.json({ error: "Failed to update track" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {

  const body = await req.json();
  console.log(body);
  const { id } = body;
  console.log("hi")
  if (!id) {
    console.log(id);
    return NextResponse.json({ error: "Missing track ID" }, { status: 400 });
  }

  try {
    await prisma.track.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Track deleted" });
  } catch (error) {
    console.error("Failed to delete track", error);
    return NextResponse.json({ error: "Failed to delete track" }, { status: 500 });
  }
}
