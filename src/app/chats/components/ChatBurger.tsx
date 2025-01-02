import { Button } from "@/components/ui";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Bolt, Bookmark, Github, Menu, Moon, UserRound } from "lucide-react";

export const ChatBurger: React.FC = () => {
   const links = [
      {
         name: "Saved Messages",
         icon: <Bookmark size={20} />,
         href: "/saved-messages",
      },
      {
         name: "Contacts",
         icon: <UserRound size={20} />,
         href: "/contacts",
      },
      {
         name: "Settings",
         icon: <Bolt size={20} />,
         href: "/settings",
      },
      {
         name: "Night Mode",
         icon: <Moon size={20} />,
         onClick: () => console.log("Night Mode"),
      },
   ];

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button size="icon" variant="iconBlack">
               <Menu className="!h-5 !w-5" color={"#AAAAAA"} />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56 translate-x-2">
            <DropdownMenuGroup>
               {links.map((link, index) => {
                  return link.onClick ? (
                     <DropdownMenuItem
                        onClick={link.onClick}
                        key={index}
                        icon={link.icon}
                     >
                        <div className="flex items-center justify-between">
                           <p>{link.name}</p>
                           <Switch />
                        </div>
                     </DropdownMenuItem>
                  ) : (
                     <DropdownMenuItem key={index} icon={link.icon}>
                        <a href={link.href}>{link.name}</a>
                     </DropdownMenuItem>
                  );
               })}
            </DropdownMenuGroup>
            <DropdownMenuItem icon={<Github size={20} />}>
               <a href="https://github.com/IhorYavorskyiUkraine">
                  Creator's GitHub
               </a>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
