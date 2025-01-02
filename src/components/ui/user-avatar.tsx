import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

interface Props {
   src: string | null;
}

export const UserAvatar: React.FC<Props> = ({ src }) => {
   return (
      <Avatar className="size-[54px]">
         <AvatarImage src={src || ""} alt="User Avatar" />
         <AvatarFallback>
            <div className="h-full w-full rounded-full bg-[#e5e5e5]"></div>
         </AvatarFallback>
      </Avatar>
   );
};
