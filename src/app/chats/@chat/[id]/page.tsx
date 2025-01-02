import { prisma } from "@prisma/PrismaClient";
import { Chat } from "../../components/Chat";

export default async function ChatPage({ params }: { params: { id: string } }) {
   const chat = await prisma.chat.findUnique({
      where: { id: Number(params.id) },
      include: {
         users: true,
         messages: true,
      },
   });

   if (!chat) {
      return <div>Chat not found</div>;
   }

   return <Chat chat={chat} />;
}
