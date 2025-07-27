import { inngest } from "./client";
import { db } from "@/lib/prisma";
 
export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" }, // Every 6 hours
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: {
                  isDefault: true,
                },
              },
            },
          },
        },
      });
    });

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue;

      await step.run(`check-budget-${budget.id}`, async () => {
        const startDate = new Date();
        startDate.setDate(1); // First day of month

        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "EXPENSE",
            date: {
              gte: startDate,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const totalExpenses = Math.abs(expenses._sum.amount?.toNumber() || 0);
        const budgetAmount = Math.abs(budget.amount);
        const percentageUsed = (totalExpenses / budgetAmount) * 100;

        console.log(
          `📊 Budget ${budget.id} → ${percentageUsed.toFixed(2)}% used (Expenses: ${totalExpenses})`
        );

        const shouldUpdate =
          percentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(new Date(budget.lastAlertSent), new Date()));

        if (shouldUpdate) {
          console.log(`✅ Updating lastAlertSent for budget ${budget.id}`);
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        } else {
          console.log(`ℹ️ No update needed for budget ${budget.id}`);
        }
      });
    }
  }
);

// Utility: New month check
function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
