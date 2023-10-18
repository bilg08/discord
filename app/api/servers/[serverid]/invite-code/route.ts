import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";
export async function PATCH(
  req: Request,
  {params: {serverid}}: {params: {serverid: string}}
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!serverid)
      return new NextResponse("Server id missing", { status: 401 });

    const server = await db.server.update({
      where: {
        id: serverid,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidV4(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER ID]: ", "ERROR");
  }
}
