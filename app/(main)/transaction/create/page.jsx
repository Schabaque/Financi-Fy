import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/components/data/category";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";

const AddTransactionPage = async () => {
  const accounts = await getUserAccounts();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl glass-card p-8">
        <h1 className="text-4xl text-yellow-400 font-bold mb-6 text-center">
          Add Transaction
        </h1>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
        />
      </div>
    </div>
  );
};

export default AddTransactionPage;
