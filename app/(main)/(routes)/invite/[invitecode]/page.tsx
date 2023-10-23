import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: {
    invitecode: string;
  };
}

const InvitePage = async ({ params: { invitecode } }: Props) => {
    const profile = await currentProfile();

    if (!profile) return redirectToSignIn();

    if (!invitecode) return redirect('/');

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: invitecode,
            members: {
                some: {
                    profileId: profile?.id
                }
            }
        }
    });
    if (existingServer)  return redirect(`/servers/${existingServer.id}`);
    const server = await db.server.update({
        where: {
            inviteCode: invitecode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if (server) return redirect(`/servers/${server.id}`);
  return (
    <div>
      Invite Page {invitecode}
      <div>Haha</div>
    </div>
  );
};

export default InvitePage;
