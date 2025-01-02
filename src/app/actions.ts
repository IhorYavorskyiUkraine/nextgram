"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@prisma/PrismaClient";
import { hashSync } from "bcrypt";

export async function registerUser(data: Prisma.UserCreateInput) {
   try {
      const user = await prisma.user.findFirst({
         where: {
            email: data.email,
         },
      });

      if (user) {
         if (!user?.verified) {
            throw new Error("User is not verified");
         }
         throw new Error("User already exists");
      }

      await prisma.user.create({
         data: {
            email: data.email,
            userName: data.userName,
            password: hashSync(data.password, 10),
         },
      });

      return { success: true };
   } catch (e) {
      console.error(e);
   }
}
