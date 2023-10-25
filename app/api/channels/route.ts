import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        const {searchParams} = new URL(req.url);
        const {name, type} = await req.json();
        const serverId = searchParams.get('serverId');
        if (!serverId) return new NextResponse('Server id is required', {status: 401});

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: ['ADMIN', 'MODERATOR']
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type
                    }
                }
            }
        });
        return NextResponse.json(server)
    } catch (error) {
        return new NextResponse("Unauthorized", {status: 401})
    }
}