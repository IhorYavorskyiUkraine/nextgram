import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
const prisma = new PrismaClient();

async function up() {
   // Создаем пользователей, если их еще нет
   await prisma.user.upsert({
      where: { email: "yapazhiloyigogosha@gmail.com" },
      update: {},
      create: {
         userName: "Ihor Yavorskyi",
         email: "yapazhiloyigogosha@gmail.com",
         password: hashSync("12345678", 10),
         verified: new Date(),
      },
   });

   await prisma.user.upsert({
      where: { email: "yapazhiloyi@gmail.com" },
      update: {},
      create: {
         userName: "Aboba",
         email: "yapazhiloyi@gmail.com",
         password: hashSync("12345678", 10),
         verified: new Date(),
      },
   });

   await prisma.user.upsert({
      where: { email: "yapazhiloyiaboba@gmail.com" },
      update: {},
      create: {
         userName: "Aboba2",
         email: "yapazhiloyiaboba@gmail.com",
         password: hashSync("12345678", 10),
         verified: new Date(),
      },
   });

   await prisma.chat.create({
      data: {
         users: {
            connect: [{ id: 1 }, { id: 2 }],
         },
         messages: {
            create: [
               {
                  text: "Hello",
                  senderId: 1,
               },
               {
                  text: "How are you?",
                  senderId: 2,
               },
               {
                  text: "I'm fine, thanks!",
                  senderId: 1,
               },
               {
                  text: "What about you?",
                  senderId: 1,
               },
               {
                  text: "I'm good too!",
                  senderId: 2,
               },
            ],
         },
      },
   });

   await prisma.chat.create({
      data: {
         users: {
            connect: [{ id: 1 }, { id: 3 }],
         },
         messages: {
            create: [
               {
                  text: "Hi aboba2",
                  senderId: 1,
               },
            ],
         },
      },
   });
}

async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE 
      "User", 
		"Chat", 
		"Message", 
      "VerificationCode"
      RESTART IDENTITY CASCADE`;
}

async function main() {
   try {
      await down();
      await up();
   } catch (error) {
      console.error(error);
   }
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async e => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
