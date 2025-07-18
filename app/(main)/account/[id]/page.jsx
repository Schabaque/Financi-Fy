import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React from "react";
import { get } from "react-hook-form";
const AccountPage= async ({params})=>{
 const accountData=await getAccountWithTransactions(params.id); 
 if(!accountData) {
   notFound();
 }
 const { transactions, ...account } = accountData;
 return <div>{params.id}</div>
};
export default AccountPage;