import { React } from "react";
import "../css/mainSection.css";
import ExpensesList from "./ExpensesList";

const MainSection = ({
  expenses,
  handleRemoveExpense,
  handleExpenseEdit,
  children,
}) => {
  return (
    <section className="main-section">
      <ExpensesList
        expenses={expenses}
        handleRemoveExpense={handleRemoveExpense}
        handleExpenseEdit={handleExpenseEdit}
      >
        {children}
      </ExpensesList>
    </section>
  );
};

export default MainSection;
