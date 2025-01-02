"use client";

import { Chat } from "@/@types";
import { ButtonLogout } from "@/components/ui/button-logout";
import { useState } from "react";
import { ChatCard } from "./ChatCard";
import { ChatHeader } from "./ChatHeader";
import { SearchModal } from "./SearchModal";

interface Props {
   chats: Chat[];
}

export const ChatMain: React.FC<Props> = ({ chats }) => {
   const [hasFocus, setHasFocus] = useState(false);

   return (
      <>
         <ChatHeader hasFocus={hasFocus} setHasFocus={setHasFocus} />
         {hasFocus ? (
            <SearchModal />
         ) : (
            chats.map(chat => <ChatCard chat={chat} key={chat.id} />)
         )}
         <ButtonLogout />
      </>
   );
};
