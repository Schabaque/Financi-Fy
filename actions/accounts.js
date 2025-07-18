// app/actions/accounts.js
"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { se } from "date-fns/locale";
import { revalidatePath } from "next/cache";

function serializeTransaction(obj) {
  if (!obj) return null;
  const serialized = { ...obj };

  if (obj.balance && typeof obj.balance.toNumber === "function") {
    serialized.balance = obj.balance.toNumber();
  }

  if (obj.amount && typeof obj.amount.toNumber === "function") {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
}

export async function updateUpdateDefault(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    // First unset all other default accounts
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    // Then set this account as default
    const updated = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: serializeTransaction(updated),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getAccountWithTransactions(accountId){
   const user=await auth();
   if(!user) throw new Error("Unauthorized");
   const account=await db.account.findUnique({
      where: {
        id: accountId,
        userId: user.id,
      },
      include: {
        transactions: true,
      },
   });
   const accountis= await db.account.findUnique({
    where:{id:accountId,userId:user.id},
    include:{
        transactions:{
            orderBy:{date:"desc"},
        },
        _count: {
          select: { transactions: true },
        },
    },
   });
   if(!accountis) throw new Error("Account not found");
   return {
     ...serializeTransaction(accountis),
     transactions: account.transactions.map(serializeTransaction),
   };
}
