import { Chat } from "@/@types";
import { ChatCard } from "./ChatCard";

interface Props {
   chats: Chat[];
}

export const ChatList: React.FC<Props> = ({ chats }) => {
   return (
      <div>
         {chats.map(chat => (
            <ChatCard chat={chat} key={chat.id} />
         ))}
      </div>
   );
};
