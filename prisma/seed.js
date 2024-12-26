import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function up() {
   await prisma.user.create({
      data: {
         userName: "Ihor Yavorskyi",
         email: "yapazhiloyigogosha@gmail.com",
         password: "12345678",
         verified: new Date(),
      },
   });

   await prisma.user.create({
      data: {
         userName: "Aboba",
         email: "yapazhiloyi@gmail.com",
         password: "12345678",
         verified: new Date(),
      },
   });

   await prisma.chat.create({
      data: {
         users: {
            connect: [{ id: 1 }, { id: 2 }],
         },
         messages: {
            create: {
               text: "Hello",
               senderId: 1,
            },
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
