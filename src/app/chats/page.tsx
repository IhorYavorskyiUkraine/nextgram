import { getUserSession } from "@/lib/getUserSession";
import { prisma } from "@prisma/PrismaClient";
import { redirect } from "next/navigation";
import { ChatMain } from "./components/ChatMain";

export default async function ChatsPage() {
   const auth = await getUserSession();

   if (!auth) {
      redirect("/auth");
   }

   const chats = await prisma.chat.findMany({
      where: {
         users: { some: { id: Number(auth.id) } },
      },
      include: {
         users: true,
         messages: true,
      },
   });

   return (
      <div className="flex h-full flex-1 flex-col bg-[#212121] p-2">
         <ChatMain chats={chats} />
      </div>
   );
}
