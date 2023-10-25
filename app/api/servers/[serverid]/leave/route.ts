import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, 
    {params: {serverid}}: {params: {serverid: string}}
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse('Unauthorized', {status: 401});

        if (!serverid) return new NextResponse('Server id is required', {status: 401});
        
        const server = await db.server.update({
            where: {
                id: serverid,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        return new NextResponse('Internal server error', {status: 401})
    }
}