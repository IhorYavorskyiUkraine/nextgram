import { Chat } from "@/@types";
import { UserAvatar } from "@/components/ui/user-avatar";
import { formateDate } from "@/lib";
import { Check } from "lucide-react";
import Link from "next/link";

interface Props {
   chat: Chat;
}

export const ChatCard: React.FC<Props> = ({ chat }) => {
   const lastMessage = chat.messages.slice(-1)[0];
   const corespondent = chat.users.find(user => user.id !== chat.users[0].id);

   return (
      <Link
         href={`/chat/${chat.id}`}
         passHref
         className="flex w-full cursor-pointer items-center space-x-4 rounded-lg bg-[#212121] p-4 hover:bg-[#2C2C2C]"
      >
         <UserAvatar src={corespondent?.imageUrl || ""} />
         <div className="flex w-full justify-between">
            <div>
               <h3 className="text-white">{corespondent?.userName}</h3>
               <p className="text-[#AAAA9E]">{lastMessage?.text}</p>
            </div>
            <div className="flex items-center space-x-1">
               {/* TODO: Add checked icon */}
               <Check size={16} color={"#3F54CA"} />
               <p className="text-[#AAAA9E]">
                  {formateDate(lastMessage?.createdAt)}
               </p>
            </div>
         </div>
      </Link>
   );
};
