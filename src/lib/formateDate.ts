import { differenceInHours, format } from "date-fns";

export const formateDate = (createdAt: Date) => {
   const now = new Date();

   if (!createdAt) return "";

   const createdAtDate = new Date(createdAt);
   const hoursDiff = differenceInHours(now, createdAtDate);

   return hoursDiff > 24
      ? format(createdAtDate, "EEE")
      : format(createdAtDate, "HH:mm");
};
