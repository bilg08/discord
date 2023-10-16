import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { db } from "./prisma";

const initialProfile = async () => {
    const user = await currentUser();
    if (!user) return redirectToSignIn();

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        },
    });

    if (!profile) {
        const newProfile = await db.profile.create({
            data: {
                userId: user?.id,
                imageUrl: user?.imageUrl,
                name: `${user?.firstName} ${user?.lastName}`,
                email: user?.emailAddresses[0].emailAddress
            }
        });
        return newProfile;
    };
    
    return profile; 

}

export default initialProfile;