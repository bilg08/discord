import InitialModal from "@/components/modal/initial-modal";
import initialProfile from "@/lib/initial-profile";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

const Setup = async () => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
        members: {
            some: {
                profileId: profile.id
            }
        },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  } 
  return (
    <InitialModal />
  );
};

export default Setup;
