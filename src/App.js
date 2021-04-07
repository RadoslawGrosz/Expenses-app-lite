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
      date: "2019-02-19",
      amount: "1200",
      img:
        "https://f01.osfr.pl/foto/1/22317618657/3f2894363f71385f0253be1cf1642187/apple-iphone-x-64gb-gwiezdna-szarosc,22317618657_8.jpg",
      status: "paid",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet magna aliquet, consectetur tellus id, placerat neque. Nulla ullamcorper at leo eu lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem quam, tincidunt sit amet mauris vel, commodo interdum turpis. Mauris eget faucibus dui. Maecenas at elementum dolor. Suspendisse at tincidunt velit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      id: 2,
      name: "Zakup samochodu",
      date: "2020-12-02",
      amount: "85000",
      img:
        "https://www.autoremo.pl/wp-content/uploads/2019/07/20190703_012.jpg",
      status: "partly-paid",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum leo ac posuere lacinia. Sed rutrum tempus velit, vel auctor risus tempor id. Etiam vel felis facilisis, hendrerit nunc sit amet, mattis eros. Mauris tristique, nibh nec vestibulum iaculis, turpis augue bibendum est, nec ultrices risus felis eget diam. Maecenas non scelerisque nisi, non tincidunt eros. Fusce pellentesque sit amet mauris nec aliquet. Donec leo ex, interdum ornare vulputate a, sagittis eget lorem.",
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    name: "",
    date: "",
    amount: 0,
    img: "",
    status: "paid",
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
    console.log(e.target.value);
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
    setNewExpense({
      name: "",
      date: "",
      amount: 0,
      img: "",
      status: "paid",
    });
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
        required
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
