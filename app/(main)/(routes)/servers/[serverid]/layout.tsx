import ServerSideBar from "@/components/server/server-side-bar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prisma";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerPageLayout = async ({
  children,
  params: { serverid },
}: {
  children: React.ReactNode;
  params: { serverid: string };
}) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const server = await db.server.findFirst({
    where: {
      id: serverid,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 flex-col inset-y-0 z-20 fixed">
        <ServerSideBar serverId={serverid} />
      </div>
      <main className="h-full md:pl-60">
        {serverid}
        {children}
      </main>
    </div>
  );
};

export default ServerPageLayout;
