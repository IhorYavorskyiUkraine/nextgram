"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./button";

export const ButtonLogout: React.FC = () => {
   return (
      <Button size="icon" variant="iconPurple" onClick={() => signOut()}>
         <LogOut />
      </Button>
   );
};
