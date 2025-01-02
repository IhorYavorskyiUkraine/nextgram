import { prisma } from "@prisma/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const userId = searchParams.get("userId");

   if (!userId) {
      return NextResponse.json(
         { error: "UserId is required" },
         { status: 400 },
      );
   }

   try {
      const messages = await prisma.message.findMany({
         where: { senderId: Number(userId) },
         include: { sender: true },
      });
      return NextResponse.json(messages);
   } catch (error) {
      return NextResponse.json(
         { error: "Failed to fetch messages" },
         { status: 500 },
      );
   }
}

export async function POST(req: Request) {
   const { userId, text, chatId } = await req.json();

   if (!userId || !text) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
   }

   try {
      const newMessage = await prisma.message.create({
         data: { text, chatId, senderId: userId },
      });
      return NextResponse.json(newMessage, { status: 201 });
   } catch (error) {
      return NextResponse.json(
         { error: "Failed to create message" },
         { status: 500 },
      );
   }
}
