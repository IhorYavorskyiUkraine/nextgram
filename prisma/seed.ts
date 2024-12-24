import { prisma } from "./PrismaClient";

async function up() {}

async function down() {
   await prisma.$executeRaw`TRUNCATE TABLE 
      "User", 
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
