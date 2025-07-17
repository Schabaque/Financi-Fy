"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// ✅ Fixed serialization helper
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

export async function handleCreateAccount(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const balanceFloat = parseFloat(data.balance);
  if (isNaN(balanceFloat)) throw new Error("Invalid balance amount");

  const existingAccounts = await db.account.findMany({
    where: { userId: user.id },
  });

  const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

  if (shouldBeDefault) {
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });
  }

  const account = await db.account.create({
    data: {
      ...data,
      balance: balanceFloat,
      userId: user.id,
      isDefault: shouldBeDefault,
    },
  });

  return {
    success: true,
    data: serializeTransaction(account),
  };
}

export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }, // ✅ fixed typo: "createdBy" → "createdAt"
    include: {
      _count: {
        select: { transactions: true },
      },
    },
  });

  const serializedAccounts = accounts.map(serializeTransaction);
  return serializedAccounts;
}

export async function createAccount(data) {
  const result = await handleCreateAccount(data);
  revalidatePath("/dashboard");
  return result;
}
