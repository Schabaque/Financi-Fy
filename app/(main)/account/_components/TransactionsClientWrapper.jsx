"use client";
import React from "react";
import TransactionsTable from "./transaction-table";

const TransactionsClientWrapper = ({ transactions }) => {
  return <TransactionsTable transactions={transactions} />;
};

export default TransactionsClientWrapper;
