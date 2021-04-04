import { React } from "react";
import ExpensesListItem from "./ExpensesListItem";

const ExpensesList = ({ expenses, children }) => {
  return (
    <ul className="main-section__list">
      {expenses.map((expense) => (
        <ExpensesListItem expense={expense} />
      ))}
      {children}
    </ul>
  );
};

export default ExpensesList;
