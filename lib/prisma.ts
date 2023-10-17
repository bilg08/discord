import { PrismaClient } from "@prisma/client";

const globalThisPrisma = global as {prisma: PrismaClient}

export const db =
  globalThisPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })
declare global {
    var prisma: PrismaClient | undefined;
};

if (process.env.NODE_ENV === 'production') globalThis.prisma = db;
