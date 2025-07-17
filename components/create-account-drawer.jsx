"use client";
import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { accountsSchema } from "@/app/lib/schema";
import { handleCreateAccount as createAccount } from "@/actions/dashboard";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-Fetch";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
//import { Input } from "@/components/ui/input";
//import { useState } from "react";
const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountsSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });
  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
     <DrawerContent className="bg-black/90 backdrop-blur-md border border-yellow-500/20 rounded-t-2xl text-white">
  <DrawerHeader>
    <DrawerTitle className="text-yellow-400 text-xl font-bold">
      Create New Account
    </DrawerTitle>
  </DrawerHeader>

  <div className="px-6 pb-6">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Account Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-semibold text-yellow-400">
          Account Name
        </label>
        <Input
          id="name"
          placeholder="e.g., Main Checking"
          className="bg-black border border-yellow-500/30 placeholder-gray-500 text-white focus:ring-yellow-500"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Account Type */}
      <div className="space-y-1">
        <label htmlFor="type" className="text-sm font-semibold text-yellow-400">
          Account Type
        </label>
        <Select
          onValueChange={(value) => setValue("type", value)}
          defaultValue={watch("type")}
        >
          <SelectTrigger
            id="type"
            className="bg-black border border-yellow-500/30 text-white"
          >
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-black border border-yellow-500/30 text-white">
            <SelectItem value="CURRENT">Current</SelectItem>
            <SelectItem value="SAVINGS">Savings</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-xs text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Balance */}
      <div className="space-y-1">
        <label
          htmlFor="balance"
          className="text-sm font-semibold text-yellow-400"
        >
          Initial Balance
        </label>
        <Input
          id="balance"
          type="number"
          step="0.01"
          placeholder="0.00"
          className="bg-black border border-yellow-500/30 placeholder-gray-500 text-white focus:ring-yellow-500"
          {...register("balance")}
        />
        {errors.balance && (
          <p className="text-xs text-red-500">{errors.balance.message}</p>
        )}
      </div>

      {/* Set as Default */}
      <div className="flex items-center justify-between rounded-xl border border-yellow-500/20 bg-black/50 p-4">
        <div>
          <p className="text-base font-medium text-yellow-400">
            Set as Default
          </p>
          <p className="text-sm text-gray-400">
            This account will be selected by default for transactions.
          </p>
        </div>
        <Switch
          id="isDefault"
          checked={watch("isDefault")}
          onCheckedChange={(checked) => setValue("isDefault", checked)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <DrawerClose asChild>
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
          >
            Cancel
          </Button>
        </DrawerClose>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-500 hover:to-yellow-700"
          disabled={createAccountLoading}
        >
          {createAccountLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  </div>
</DrawerContent>

    </Drawer>
  );
};

export default CreateAccountDrawer;
