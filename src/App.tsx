import React, { useState, useEffect } from "react";
import "./css/reset.css";
import "./css/index.css";
import "./css/mainSection.css";
import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import SortSection from "./components/SortSection";
import Expense from "./components/Expense";
import useAuthentication from "./hooks/useAuthentication";
import ExpensesList from "./components/ExpensesList";
import { useAppSelector } from "./store/store";
import { Expense as ExpenseType } from "./types/Expense";

const App: React.FC = () => {
  useAuthentication();
  const [chosenExpense, setChosenExpense] = useState<string | undefined>(
    undefined
  );
  const [isNewExpenseFormVisible, setIsNewExpenseFormVisible] = useState(false);
  const [expense, setExpense] = useState<ExpenseType | undefined>();
  const expenses = useAppSelector((state) => state.expenses.expenses);

  useEffect(() => {
    setExpense(expenses.find((expense) => expense.id === chosenExpense));
  }, [expenses, chosenExpense]);

  return (
    <main className="main-content">
      <Header
        isNewExpenseFormVisible={isNewExpenseFormVisible}
        setIsNewExpenseFormVisible={setIsNewExpenseFormVisible}
      />
      <FiltersSection />
      <SortSection />
      <section className="main-section">
        <ExpensesList
          setChosenExpense={setChosenExpense}
          isNewExpenseFormVisible={isNewExpenseFormVisible}
          setIsNewExpenseFormVisible={setIsNewExpenseFormVisible}
        />
      </section>
      {expense !== undefined && (
        <Expense
          expense={expense}
          setExpense={setExpense}
          setChosenExpense={setChosenExpense}
        />
      )}
    </main>
  );
};

export default App;
