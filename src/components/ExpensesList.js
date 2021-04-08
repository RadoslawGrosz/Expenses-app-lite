import { React } from "react";
import ExpensesListItem from "./ExpensesListItem";

const ExpensesList = ({ expenses, handleRemoveExpense, children }) => {
  return (
    <ul className="main-section__list">
      {expenses[0] &&
        expenses.map((expense) => (
          <ExpensesListItem
            expense={expense}
            handleRemoveExpense={handleRemoveExpense}
          />
        ))}
      {children}
    </ul>
  );
};

export default ExpensesList;
