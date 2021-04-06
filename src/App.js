import { React, useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import "./css/reset.css";
import "./css/index.css";
import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import SortSection from "./components/SortSection";
import MainSection from "./components/MainSection";
import Expense from "./components/Expense";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileUpload } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [isNewExpenseFormVisible, setIsNewExpenseFormVisible] = useState(false);
  const { id } = useParams();
  const [stylesImage, setStylesImage] = useState({});

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Zakup telefonu",
      date: "5.11.2019",
      amount: "1200",
      img:
        "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png",
      status: "Częsciowo zapłacone",
    },
    {
      id: 2,
      name: "Zakup samochodu",
      date: "15.12.2020",
      amount: "85000",
      img:
        "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png",
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

  useEffect(() => {
    setStylesImage(() => ({
      backgroundImage: `url(${newExpense.img})`,
    }));
  }, [newExpense]);

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

  const handleImageChoose = (e) => {
    if (!e.target.files[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    window.URL.createObjectURL(e.target.files[0]);

    reader.onload = () => {
      setNewExpense((prev) => ({
        ...prev,
        img: reader.result,
      }));
    };
  };

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
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
      <p className="main-section__list__item__value main-section__list__item__value--new">
        {expenses.length + 1}
      </p>
      <input
        type="text"
        className="main-section__list__item__value main-section__list__item__value--new"
        value={newExpense.name}
        onChange={handleNewExpenseNameChange}
        required={true}
        placeholder="Nazwa transakcji..."
        maxLength={25}
      />
      <input
        type="date"
        className="main-section__list__item__value main-section__list__item__value--new"
        value={newExpense.date}
        onChange={handleNewExpenseDateChange}
      />
      <input
        type="number"
        className="main-section__list__item__value main-section__list__item__value--new"
        value={newExpense.amount}
        onChange={handleNewExpenseAmountChange}
      />
      <div className="main-section__list__item__value main-section__list__item__value--new main-section__list__item__value--file-container">
        <input
          type="file"
          name="file"
          id="file"
          className="main-section__list__item__value__input-file"
          onChange={handleImageChoose}
        />
        {stylesImage.backgroundImage && (
          <div
            style={stylesImage}
            alt=""
            className="main-section__list__item__value__image"
          ></div>
        )}
        <label
          htmlFor="file"
          className="main-section__list__item__value__label"
        >
          <FontAwesomeIcon
            icon={faFileUpload}
            className="main-section__list__item__value__label__icon"
          />{" "}
          Wybierz obrazek...
        </label>
      </div>
      <div className="main-section__list__item__value main-section__list__item__value--new">
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
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <>
              <SortSection />
              <MainSection
                expenses={expenses}
                handleRemoveExpense={handleRemoveExpense}
              >
                {isNewExpenseFormVisible && newExpenseForm}
              </MainSection>
            </>
          )}
        />
        <Route
          path="/:id"
          render={() => (
            <Expense expense={expenses.find((expense) => expense.id == id)} />
          )}
        />
      </Switch>
    </main>
  );
};

export default App;
