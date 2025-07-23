import { getAccountWithTransactions } from "../../../../actions/accounts";
import TransactionsClientWrapper from "../_components/TransactionsClientWrapper";
export default async function AccountPage(context) {
  const { params } = await context;
  const accountId = params.id;

  const accountData = await getAccountWithTransactions(accountId);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5 bg-black text-white">
      <div className="flex gap-4 items-end justify-between p-5">
        <div>
          <h1 className="text-2xl sm:text-5xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold">{account.id}</h2>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>
        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      <TransactionsClientWrapper transactions={transactions} />
    </div>
  );
}
