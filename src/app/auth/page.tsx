import { Container } from "@/components/ui";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { AuthForm } from "./components/AuthForm";

export default async function AuthPage() {
   const session = await getUserSession();

   if (session) {
      redirect("/chats");
   }

   return (
      <Container className="flex h-screen max-w-[720px] flex-col items-center justify-center">
         <AuthForm />
      </Container>
   );
}
