import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

export async function POST(req: Request, res: NextResponse) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.create({
      data: {
        imageUrl,
        name,
        profileId: profile.id,
        inviteCode: uuidV4(),
        channels: {
          create: [
            {
              name: "General",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 401 });
  }
}
