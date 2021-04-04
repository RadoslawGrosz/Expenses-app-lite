import { React } from "react";
import ExpensesListItem from "./ExpensesListItem";

const ExpensesList = ({ expenses }) => {
  return (
    <ul className="main-section__list">
      {expenses.map((expense) => (
        <ExpensesListItem expense={expense} />
      ))}
    </ul>
  );
};

export default ExpensesList;
