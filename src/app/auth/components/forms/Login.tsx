import { Button } from "@/components/ui/button";
import { InputWithValidations } from "@/components/ui/input-with-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";

export const Login: React.FC = () => {
   const form = useForm<TFormLoginValues>({
      resolver: zodResolver(formLoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (data: TFormLoginValues) => {
      try {
         const res = await signIn("credentials", {
            ...data,
            callbackUrl: "/chats",
            redirect: true,
         });

         if (!res?.ok) {
            throw Error("Failed to login");
         }
      } catch (error) {
         console.error("Error [LOGIN]", error);
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="mb-2 flex w-[320px] flex-1 flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <InputWithValidations name="email" label="E-Mail" />
            <InputWithValidations
               name="password"
               label="Password"
               type="password"
               className="mb-2"
            />
            <Button
               className="mb-2"
               loading={form.formState.isSubmitting}
               type="submit"
            >
               Login
            </Button>
         </form>
      </FormProvider>
   );
};
