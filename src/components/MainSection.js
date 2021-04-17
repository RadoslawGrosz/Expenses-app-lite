import { React } from "react";
import "../css/mainSection.css";
import ExpensesList from "./ExpensesList";

const MainSection = () => {
  return (
    <section className="main-section">
      <ExpensesList />
    </section>
  );
};

export default MainSection;
