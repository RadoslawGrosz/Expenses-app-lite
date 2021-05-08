import { useState, useEffect } from "react";
import { useAppSelector } from "../store/store";
import { Expense } from "../types/Expense";

const useGetVisibleExpenses = () => {
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const filter = useAppSelector((state) => state.filter.filter);
  const { minAmount, maxAmount, status, text, sortBy, isSortDesc } = filter;
  const [visibleExpenses, setVisibleExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setVisibleExpenses(() =>
      expenses
        .filter((expense) => {
          const minAmountMatch = !minAmount || expense.amount >= minAmount;
          const maxAmountMatch = !maxAmount || expense.amount <= maxAmount;
          const statusMatch = status === "all" || expense.status === status;
          const textMatch = expense.name
            .toUpperCase()
            .includes(text.toUpperCase());
          return minAmountMatch && maxAmountMatch && statusMatch && textMatch;
        })
        .sort((a, b) => {
          if (isSortDesc) return a[sortBy] < b[sortBy] ? -1 : 1;
          return a[sortBy] < b[sortBy] ? 1 : -1;
        })
    );
  }, [filter, expenses]);

  return visibleExpenses;
};

export default useGetVisibleExpenses;
