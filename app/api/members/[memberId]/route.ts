import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params: {memberId}}: {params: {memberId: string}}
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse('Unauthorized', {status: 401});

        const {searchParams} = new URL(req.url);
        const {role} = await req.json();

        const serverId = searchParams.get('serverId');
        if (!serverId) return new NextResponse('Server id missing', {status: 401}); 

        if (!memberId) return new NextResponse('Member id is missing');

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            role
                        }
                    }
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc'
                    }
                },
            }
        });
        return NextResponse.json(server)
    } catch (error) {
        return new NextResponse('Internal server error', {status: 401}); 
    }
}

export async function DELETE(
    req: Request,
    {params: {memberId}}: {params: {memberId: string}}
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse('Unauthorized', {status: 401});

        const {searchParams} = new URL(req.url);

        const serverId = searchParams.get('serverId');
        if (!serverId) return new NextResponse('Server id missing', {status: 401}); 

        if (!memberId) return new NextResponse('Member id is missing');

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                members: {
                    deleteMany: {
                        id: memberId,
                        profileId: {
                            not: profile.id
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc'
                    }
                },
            }
        });
        return NextResponse.json(server)
    } catch (error) {
        return new NextResponse('Internal server error', {status: 401}); 
    }
}