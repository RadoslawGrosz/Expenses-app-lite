import { React, useState } from "react";
import "./css/reset.css";
import "./css/index.css";
import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import SortSection from "./components/SortSection";
import MainSection from "./components/MainSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [isNewExpenseFormVisible, setIsNewExpenseFormVisible] = useState(false);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Zakup telefonu",
      date: "5.11.2019",
      amount: "1200",
      img: "img",
      status: "Częsciowo zapłacone",
    },
    {
      id: 2,
      name: "Zakup samochodu",
      date: "15.12.2020",
      amount: "85000",
      img: "img",
      status: "Wszystkie",
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    name: "",
    date: "",
    amount: 0,
    img: "",
    status: "Zapłacone",
  });

  const handleNewExpenseNameChange = (e) => {
    setNewExpense((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleNewExpenseDateChange = (e) => {
    setNewExpense((prev) => ({
      ...prev,
      date: e.target.value,
    }));
  };

  const handleNewExpenseAmountChange = (e) => {
    setNewExpense((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
  };

  const handleNewExpenseStatusChange = (e) => {
    setNewExpense((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleAddNewExpense = () => {
    setExpenses((prev) => [
      ...prev,
      {
        ...newExpense,
        id: expenses.length + 1,
      },
    ]);
    setIsNewExpenseFormVisible(false);
  };

  const newExpenseForm = (
    <form className="main-section__list__item" onSubmit={handleAddNewExpense}>
      <p className="main-section__list__item__value">{expenses.length + 1}</p>
      <input
        type="text"
        className="main-section__list__item__value"
        value={newExpense.name}
        onChange={handleNewExpenseNameChange}
      />
      <input
        type="date"
        className="main-section__list__item__value"
        value={newExpense.date}
        onChange={handleNewExpenseDateChange}
      />
      <input
        type="number"
        className="main-section__list__item__value"
        value={newExpense.amount}
        onChange={handleNewExpenseAmountChange}
      />
      <input type="file" className="main-section__list__item__value" />
      <div className="main-section__list__item__value">
        <select
          name="status"
          className="main-section__list__item__value__status main-section__list__item__value__status--draft"
          value={newExpense.status}
          onChange={handleNewExpenseStatusChange}
        >
          <option value="paid">Zapłacone</option>
          <option value="partly-paid">Częsciowo zapłacone</option>
        </select>
      </div>
      <button
        className="main-section__list__item__value main-section__list__item__value--add"
        type="submit"
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </form>
  );

  return (
    <main className="main-content">
      <Header
        isNewExpenseFormVisible={isNewExpenseFormVisible}
        setIsNewExpenseFormVisible={setIsNewExpenseFormVisible}
      />
      <FiltersSection />
      <SortSection />
      <MainSection expenses={expenses}>
        {isNewExpenseFormVisible && newExpenseForm}
      </MainSection>
    </main>
  );
};

export default App;
