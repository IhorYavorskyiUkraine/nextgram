import { Message, User } from "@prisma/client";

export interface Chat {
   id: number;
   users: User[];
   messages: Message[];
   createdAt: Date;
   updatedAt: Date;
}
