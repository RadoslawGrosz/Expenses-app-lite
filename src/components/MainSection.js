import { React } from "react";
import "../css/mainSection.css";
import ExpensesList from "./ExpensesList";

const MainSection = ({ expenses, children }) => {
  return (
    <section className="main-section">
      <ExpensesList expenses={expenses}>{children}</ExpensesList>
    </section>
  );
};

export default MainSection;
