import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { serverid } }: { params: { serverid: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { name, imageUrl } = await req.json();

    const server = await db.server.update({
      where: {
        id: serverid,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
