import { getServerSession, Session } from "next-auth";
import { authOptions } from "./authOptions";

export const getUserSession = async () => {
   const session: (Session & { user: { id: string; role: string } }) | null =
      await getServerSession(authOptions);

   return session?.user ?? null;
};
