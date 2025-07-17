// components/account-card.jsx
"use client";
import { Card, CardHeader, CardTitle, CardContent ,CardFooter } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
const AccountCard = ({ account }) => {
  const { name, type, balance } = account;

  return (
    <Card className="hover:shadow-yellow-500/30 transition-all duration-200 bg-black border border-yellow-500/20 hover:border-yellow-400/40 hover:scale-[1.02] group cursor-pointer rounded-xl backdrop-blur-sm" >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${parseFloat(balance).toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground capitalize">
          {type} Account
        </p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
    </Card>
  );
};

export default AccountCard; // ✅ default export
