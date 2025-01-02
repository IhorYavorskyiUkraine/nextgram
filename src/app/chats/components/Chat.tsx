"use client";

import { Button, Input } from "@/components/ui";
import { Send } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MessageCard } from "./MessageCard";

interface ChatProps {
   chat: {
      id: string;
      messages: {
         id: string;
         text: string;
         createdAt: Date;
         senderId: string;
      }[];
   };
   auth: {
      id: string;
   };
}

export const Chat: React.FC<ChatProps> = ({ chat, auth }) => {
   const form = useForm({
      defaultValues: {
         message: "",
      },
   });
   const [message, setMessage] = React.useState("");

   const onSubmit = async (data: { message: string }) => {
      if (!data.message) return;
      const message = data.message;

      setMessage("");
   };

   return (
      <div className="flex h-full items-center justify-center !bg-[#000] p-2">
         <div className="flex h-full w-full max-w-[80%] flex-col">
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
               {chat.messages?.map(message => (
                  <div
                     key={message.id}
                     className={`flex ${
                        message.senderId === auth.id
                           ? "justify-end"
                           : "justify-start"
                     }`}
                  >
                     <MessageCard
                        className={`${
                           message.senderId === auth.id
                              ? "bg-purple"
                              : "bg-[#212121]"
                        }`}
                        text={message.text}
                        createdAt={message.createdAt}
                     />
                  </div>
               ))}
            </div>
            <FormProvider {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mt-4 flex items-center gap-2">
                     <Input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Type your message..."
                     />
                     <Button
                        variant="iconPurple"
                        size="icon"
                        disabled={!message}
                     >
                        <Send />
                     </Button>
                  </div>
               </form>
            </FormProvider>
         </div>
      </div>
   );
};
