import { ResizablePanel, ResizablePanelGroup } from "@/components/ui";
import { prisma } from "@prisma/PrismaClient";
import type { Metadata } from "next";
import { Chat } from "./components/Chat";

export const metadata: Metadata = {
   title: "Home",
   description: "NextGram is a messenger built with Next.js.",
};

export default async function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const chat = await prisma.chat.findUnique({
      where: { id: 1 },
      include: {
         users: true,
         messages: true,
      },
   });

   return (
      <div className="flex h-screen">
         <ResizablePanelGroup direction="horizontal" className="flex-grow">
            <ResizablePanel
               minSize={20}
               defaultSize={35}
               className="flex h-full flex-col"
            >
               {children}
            </ResizablePanel>
            <ResizablePanel
               minSize={20}
               defaultSize={65}
               className="flex h-full flex-col"
            >
               <Chat auth={{ id: 1 }} chat={chat} />
            </ResizablePanel>
         </ResizablePanelGroup>
      </div>
   );
}
