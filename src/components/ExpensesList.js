import { React } from "react";
import ExpensesListItem from "./ExpensesListItem";

const ExpensesList = ({
  expenses,
  handleRemoveExpense,
  handleExpenseEdit,
  children,
}) => {
  return (
    <ul className="main-section__list">
      {expenses[0] &&
        expenses.map((expense) => (
          <ExpensesListItem
            expense={expense}
            handleRemoveExpense={handleRemoveExpense}
            handleExpenseEdit={handleExpenseEdit}
            key={expense.id}
          />
        ))}
      {children}
    </ul>
  );
};

export default ExpensesList;
