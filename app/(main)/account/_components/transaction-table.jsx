"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  RefreshCw,
  Clock,
  Trash,
  Search,
  X,
} from "lucide-react";
import { categoryColors } from "@/components/data/category";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
//import { useFetch } from "@/hooks/useFetch"; // adjust if needed
import { bulkDeleteTransactions } from "@/actions/accounts"; // adjust if needed
import { BarLoader } from "react-spinners"; // optional loading bar
import useFetch  from "@/hooks/use-Fetch";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionsTable = ({ transactions = [] }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({ field: "date", direction: "desc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const router = useRouter();

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((tx) =>
        tx.description?.toLowerCase().includes(lower)
      );
    }

    if (typeFilter) {
      result = result.filter((tx) => tx.type === typeFilter);
    }

    if (recurringFilter) {
      result = result.filter((tx) =>
        recurringFilter === "recurring" ? tx.isRecurring : !tx.isRecurring
      );
    }

    result.sort((a, b) => {
      let comp = 0;
      if (sortConfig.field === "date") {
        comp = new Date(a.date) - new Date(b.date);
      } else if (sortConfig.field === "amount") {
        comp = a.amount - b.amount;
      } else if (sortConfig.field === "category") {
        comp = a.category.localeCompare(b.category);
      }
      return sortConfig.direction === "asc" ? comp : -comp;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const toggleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { field, direction: "asc" };
    });
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (
      selectedIds.length === filteredAndSortedTransactions.length &&
      filteredAndSortedTransactions.length > 0
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSortedTransactions.map((tx) => tx.id));
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} transactions?`)) return;
    await deleteFn(selectedIds);
  };

  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.success("Transactions deleted successfully");
      setSelectedIds([]);
    }
  }, [deleted, deleteLoading]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
  };

  return (
    <div className="space-y-4">
      {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#facc15" />
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INCOME">Income</SelectItem>
            <SelectItem value="EXPENSE">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={recurringFilter}
          onValueChange={(v) => setRecurringFilter(v)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Transactions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recurring">Recurring</SelectItem>
            <SelectItem value="non-recurring">Non-Recurring</SelectItem>
          </SelectContent>
        </Select>

        {selectedIds.length > 0 && (
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete ({selectedIds.length})
          </Button>
        )}

        {(searchTerm || typeFilter || recurringFilter) && (
          <Button variant="outline" size="icon" onClick={handleClearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full rounded-xl border border-yellow-500/20 shadow-yellow-500/10 shadow-lg bg-black backdrop-blur-md">
        <Table>
          <TableCaption className="text-black-400">
            A list of your recent transactions.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-yellow-500/10 border-b border-yellow-500/20">
              <TableHead className="w-[50px] text-yellow-400">
                <Checkbox
                  checked={
                    selectedIds.length === filteredAndSortedTransactions.length &&
                    filteredAndSortedTransactions.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>

              <TableHead
                className="text-yellow-400 cursor-pointer"
                onClick={() => toggleSort("date")}
              >
                <div className="flex items-center justify-end">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead className="text-yellow-400">Description</TableHead>

              <TableHead
                className="text-yellow-400 cursor-pointer"
                onClick={() => toggleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead
                className="text-yellow-400 cursor-pointer"
                onClick={() => toggleSort("amount")}
              >
                <div className="flex items-center">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead className="text-yellow-400">Recurring</TableHead>
              <TableHead className="text-yellow-400">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredAndSortedTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="text-center">
                  <Checkbox
                    checked={selectedIds.includes(tx.id)}
                    onCheckedChange={() => handleSelect(tx.id)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  {format(new Date(tx.date), "PP")}
                </TableCell>
                <TableCell className="text-center">{tx.description}</TableCell>
                <TableCell className="text-center capitalize">
                  <span
                    style={{
                      backgroundColor: categoryColors[tx.category] || "#6B7280",
                    }}
                    className="px-2 py-1 rounded text-white"
                  >
                    {tx.category}
                  </span>
                </TableCell>
                <TableCell
                  className="text-center"
                  style={{
                    color:
                      tx.type === "EXPENSE"
                        ? "rgb(239 68 68)"
                        : "rgb(34 197 94)",
                  }}
                >
                  {tx.type === "EXPENSE" ? "-" : "+"}${tx.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  {tx.isRecurring ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge className="gap-1 text-yellow-500">
                            <RefreshCw className="h-4 w-4 text-yellow-500" />
                            {RECURRING_INTERVALS[tx.recurringInterval]}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>
                            <div className="font-medium">Next Date:</div>
                            <div>
                              {format(
                                new Date(tx.nextRecurringDate),
                                "PP"
                              )}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Badge className="gap-1">
                      <Clock className="h-4 w-4" /> One-time
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button className="h-8 w-8 p-0 bg-transparent hover:bg-yellow-900">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border border-gray-700">
                      <DropdownMenuLabel
                        onClick={() =>
                          router.push(`/transaction/create?edit=${tx.id}`)
                        }
                        className="cursor-pointer hover:text-yellow-400"
                      >
                        Edit
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 hover:text-red-600 cursor-pointer">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsTable;
