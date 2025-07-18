// components/account-card.jsx
"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import useFetch from "@/hooks/use-Fetch";
import { updateUpdateDefault } from "@/actions/accounts";

const AccountCard = ({ account }) => {
  const { id, name, type, balance, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateUpdateDefault);

  const handleDefaultChange = async (e) => {
    e.preventDefault();
    if (isDefault) {
      alert("You need at least 1 default account");
      return;
    }
    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      alert("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      alert(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="relative hover:shadow-yellow-500/30 transition-all duration-200 bg-black border border-yellow-500/20 hover:border-yellow-400/40 hover:scale-[1.02] group cursor-pointer rounded-xl backdrop-blur-sm">
      <CardHeader className="flex justify-between items-start">
        <CardTitle>{name}</CardTitle>

        {/* Toggle Switch */}
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              disabled={updateDefaultLoading}
              onChange={handleDefaultChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-yellow-900 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer dark:bg-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-yellow-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-yellow-400 after:border-yellow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-white">
          ${parseFloat(balance).toFixed(2)}
        </div>
        <p className="text-xs text-yellow-200 capitalize">{type} Account</p>
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-yellow-200">
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-400" />
          Income
        </div>
        <div className="flex items-center">
          <ArrowDownRight className="mr-1 h-4 w-4 text-red-400" />
          Expense
        </div>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
