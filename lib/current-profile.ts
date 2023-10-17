import { auth } from "@clerk/nextjs"
import { db } from "./prisma";

export const currentProfile = async () => {
    const user = auth();
    if (!user) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.userId!
        }
    });
    return profile;
}