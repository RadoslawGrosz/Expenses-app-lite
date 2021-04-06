import { React } from "react";
import "../css/mainSection.css";
import ExpensesList from "./ExpensesList";

const MainSection = ({ expenses, handleRemoveExpense, children }) => {
  return (
    <section className="main-section">
      <ExpensesList
        expenses={expenses}
        handleRemoveExpense={handleRemoveExpense}
      >
        {children}
      </ExpensesList>
    </section>
  );
};

export default MainSection;
