import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
const handleauth = () => {
  const userId = auth();
  if (!userId) throw new Error("Unauthroized");
  return { userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(handleauth)
    .onUploadComplete(() => {}),
  messageFile: f(["pdf", "image"])
    .middleware(handleauth)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
