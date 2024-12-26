import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from "@/components/ui";
import { prisma } from "prisma/PrismaClient";
import { ChatList } from "./chats/components/ChatList";

export default async function PageHome() {
   const chats = await prisma.chat.findMany({
      where: {
         id: 1,
      },
      include: {
         users: true,
         messages: true,
      },
   });

   return (
      <ResizablePanelGroup direction="horizontal">
         <ResizablePanel defaultSize={35}>
            <ChatList chats={chats} />
         </ResizablePanel>
         <ResizableHandle />
         <ResizablePanel defaultSize={65}>
            <div>Chat</div>
         </ResizablePanel>
      </ResizablePanelGroup>
   );
}
