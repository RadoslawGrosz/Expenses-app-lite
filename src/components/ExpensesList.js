import { React } from "react";
import ExpensesListItem from "./ExpensesListItem";
import NewExpenseForm from "./NewExpenseForm";
import useExpenses from "../hooks/useExpenses";
import useVisibleExpenses from "../hooks/useVisibleExpenses";
import { useSelector } from "react-redux";

const ExpensesList = () => {
  useExpenses();
  const visibleExpenses = useVisibleExpenses();
  const isNewExpenseFormVisible = useSelector(
    (state) => state.newExpense.isVisible
  );

  return (
    <ul className="main-section__list">
      {visibleExpenses[0] &&
        visibleExpenses.map((expense) => (
          <ExpensesListItem expense={expense} key={expense.lp} />
        ))}
      {isNewExpenseFormVisible && <NewExpenseForm />}
    </ul>
  );
};

export default ExpensesList;
