import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { getUserAccounts } from "@/actions/dashboard";
import AccountCard from "./_components/account-card";
 

export default async function DashboardPage() {
  const accounts= await getUserAccounts();
  console.log(accounts);
  return (
    <div className="min-h-screen  bg-black/95 text-white">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 tracking-tight mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Monitor your financial accounts and budget in one place.
        </p>
      </div>

      {/* Account Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Account CTA */}
        <CreateAccountDrawer>
          <Card className="hover:shadow-yellow-500/30 transition-all duration-200 bg-black border border-yellow-500/20 hover:border-yellow-400/40 hover:scale-[1.02] group cursor-pointer rounded-xl backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center text-yellow-400 h-40">
              <Plus className="h-10 w-10 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium group-hover:text-yellow-300">
                Add New Account
              </p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {/* Future dynamic account cards will go here */}
        {/* accounts.map(account => (
            <AccountCard key={account.id} data={account} />
        )) */}
       {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}
