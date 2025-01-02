"use client";

import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Login } from "./forms/Login";
import { Register } from "./forms/Register";

export const AuthForm: React.FC = () => {
   const [type, setType] = useState<"login" | "register">("login");

   const onSwitch = () => {
      setType(type === "login" ? "register" : "login");
   };

   const providers = [
      {
         name: "Google",
         id: "google",
         image: "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg",
      },
      {
         name: "Twitter",
         id: "twitter",
         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/640px-X_logo_2023.svg.png",
      },
   ];

   return (
      <div className="space-y-4">
         <h1 className="mb-[40px] text-center text-3xl font-bold text-white">
            {type === "login" ? "Login in to NextGram" : "Register to NextGram"}
         </h1>
         {type === "login" ? <Login /> : <Register />}
         <span
            className="cursor-pointer text-center text-white underline"
            onClick={onSwitch}
         >
            {type === "login"
               ? "Don't have an account?"
               : "Already have an account?"}
         </span>
         <div className="flex items-center justify-center space-x-4">
            {providers.map(provider => (
               <Button
                  key={provider.id}
                  onClick={() =>
                     signIn(provider.id, {
                        callbackUrl: "/chats",
                        redirect: true,
                     })
                  }
                  type="button"
                  variant="rounded"
                  className="size-[48px]"
               >
                  <Image
                     width={42}
                     height={42}
                     loading="lazy"
                     alt={provider.name}
                     src={provider.image}
                  />
               </Button>
            ))}
         </div>
      </div>
   );
};
