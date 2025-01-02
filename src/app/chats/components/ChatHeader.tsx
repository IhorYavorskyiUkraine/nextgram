"use client";

import { Input } from "@/components/ui";
import { Search } from "lucide-react";
import { useState } from "react";
import { ChatBurger } from "./ChatBurger";

interface Props {
   hasFocus: boolean;
   setHasFocus: (focused: boolean) => void;
}

export const ChatHeader: React.FC<Props> = ({ hasFocus, setHasFocus }) => {
   const [search, setSearch] = useState("");

   return (
      <div className="mb-2 flex items-center gap-2">
         <ChatBurger />
         <Input
            className="w-full"
            placeholder="Search"
            type="text"
            icon={<Search size={20} color={hasFocus ? "#8774E1" : "#AAAAAA"} />}
            onFocusChange={setHasFocus}
            hasFocus={hasFocus}
            value={search}
            onChange={e => setSearch(e.target.value)}
         />
      </div>
   );
};
