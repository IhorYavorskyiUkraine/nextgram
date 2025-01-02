import { cn } from "@/lib";
import { format } from "date-fns";

interface Props {
   text: string;
   createdAt: Date;
   className?: string;
}

export const MessageCard: React.FC<Props> = ({
   text,
   createdAt,
   className,
}) => {
   return (
      <div className={cn(className, "flex max-w-[45%] gap-1 rounded-lg p-2")}>
         <p className="break-words text-white">{text}</p>
         <p className="mt-auto translate-y-1 text-sm !text-[#3B3C3E]">
            {format(createdAt, "HH:mm")}
         </p>
      </div>
   );
};
