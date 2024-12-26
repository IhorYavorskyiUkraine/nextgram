import { Chat } from "@/@types";

interface Props {
   chat: Chat;
}

export const ChatCard: React.FC<Props> = ({ chat }) => {
   return <div>{chat.id}</div>;
};
