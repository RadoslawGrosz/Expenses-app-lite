import { React } from "react";
import "../css/mainSection.css";
import ExpensesList from "./ExpensesList";

const MainSection = ({ expenses }) => {
  return (
    <section className="main-section">
      <ExpensesList expenses={expenses} />
    </section>
  );
};

export default MainSection;
