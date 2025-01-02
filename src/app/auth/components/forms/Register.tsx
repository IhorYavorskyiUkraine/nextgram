"use client";

import { registerUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { InputWithValidations } from "@/components/ui/input-with-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./schema";

export const Register: React.FC = () => {
   const form = useForm<TFormRegisterValues>({
      resolver: zodResolver(formRegisterSchema),
      defaultValues: {
         email: "",
         userName: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit = async (data: TFormRegisterValues) => {
      try {
         const user = await registerUser({
            email: data.email,
            userName: data.userName,
            password: data.password,
         });

         if (!user) {
            throw new Error("Failed to register user");
         }

         await signIn("credentials", {
            ...data,
            callbackUrl: "/chats",
            redirect: true,
         });
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="mb-2 flex w-[320px] flex-1 flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <InputWithValidations name="email" label="E-Mail" />
            <InputWithValidations name="userName" label="User Name" />
            <InputWithValidations
               name="password"
               label="Password"
               type="password"
            />
            <InputWithValidations
               name="confirmPassword"
               label="Confirm password"
               type="password"
            />
            <Button
               className="mb-2"
               loading={form.formState.isSubmitting}
               type="submit"
            >
               Register
            </Button>
         </form>
      </FormProvider>
   );
};
