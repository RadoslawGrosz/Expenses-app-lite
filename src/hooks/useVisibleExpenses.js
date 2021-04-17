import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useVisibleExpenses = () => {
  const expenses = useSelector((state) => state.expenses);
  const filters = useSelector((state) => state.filters);
  const { minAmount, maxAmount, status, text, sortBy, sortDesc } = filters;
  const [visibleExpenses, setVisibleExpenses] = useState([]);

  useEffect(() => {
    setVisibleExpenses(() =>
      [...expenses]
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
          if (sortDesc) return a[sortBy] < b[sortBy] ? -1 : 1;
          return a[sortBy] < b[sortBy] ? 1 : -1;
        })
    );
  }, [filters, expenses]);

  useEffect(() => {
    setVisibleExpenses(() => {
      const tempArray = [...expenses];
      tempArray.forEach((expense, index) => (expense.lp = index + 1));
      console.log("1", tempArray);
      return tempArray;
    });
  }, [expenses]);

  return visibleExpenses;
};

export default useVisibleExpenses;
