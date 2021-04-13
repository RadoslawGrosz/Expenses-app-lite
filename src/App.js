import { React, useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import firebase from "./firebase";
import "./css/reset.css";
import "./css/index.css";
import img from "./img/phone-transparent.png";
import moneyImg from "./img/money-transparent.png";
import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import SortSection from "./components/SortSection";
import MainSection from "./components/MainSection";
import Expense from "./components/Expense";
import Login from "./components/Login";
import AuthenticationService from "./security/AuthenticationService";
import ExpensesApi from "./api/ExpenseApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileUpload } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [isNewExpenseFormVisible, setIsNewExpenseFormVisible] = useState(false);
  const { id } = useParams();
  const [newExpenseImage, setNewExpenseImage] = useState({});
  const [expensesToShow, setExpensesToShow] = useState([]);
  const [sortedExpensesToShow, setSortedExpensesToShow] = useState([]);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [user, setUser] = useState({});

  const [sort, setSort] = useState({
    by: "id",
    desc: true,
  });

  const [filters, setFilters] = useState({
    minAmount: "",
    maxAmount: "",
    status: "all",
    name: "",
  });

  const [expenses, setExpenses] = useState([
    // {
    //   id: 10,
    //   name: "Zakup telefonu",
    //   date: "2019-02-19",
    //   amount: 1200,
    //   img,
    //   status: "paid",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet magna aliquet, consectetur tellus id, placerat neque. Nulla ullamcorper at leo eu lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem quam, tincidunt sit amet mauris vel, commodo interdum turpis. Mauris eget faucibus dui. Maecenas at elementum dolor. Suspendisse at tincidunt velit. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    // },
    // {
    //   id: 2,
    //   name: "Zakup samochodu",
    //   date: "2020-12-02",
    //   amount: 85000,
    //   img:
    //     "https://www.autoremo.pl/wp-content/uploads/2019/07/20190703_012.jpg",
    //   status: "partly-paid",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum leo ac posuere lacinia. Sed rutrum tempus velit, vel auctor risus tempor id. Etiam vel felis facilisis, hendrerit nunc sit amet, mattis eros. Mauris tristique, nibh nec vestibulum iaculis, turpis augue bibendum est, nec ultrices risus felis eget diam. Maecenas non scelerisque nisi, non tincidunt eros. Fusce pellentesque sit amet mauris nec aliquet. Donec leo ex, interdum ornare vulputate a, sagittis eget lorem.",
    // },
  ]);

  const [newExpense, setNewExpense] = useState({
    lp: expenses.length + 1,
    name: "",
    date: "",
    amount: 0,
    img: "",
    status: "paid",
  });

  useEffect(() => {
    const handleUserAuthentication = async () => {
      if (AuthenticationService.isUserLoggedIn()) {
        const loggedUser = await AuthenticationService.logIn();
        if (loggedUser.username) {
          setUser(loggedUser);
          const expenses = await ExpensesApi.getExpenses();
          expenses.forEach((expense, index) => (expense.lp = index + 1));
          setExpenses(expenses);
        } else {
          sessionStorage.clear("token");
        }
      } else {
        setUser({});
      }

      // setIsPending(false);
    };
    handleUserAuthentication();
  }, []);

  useEffect(() => {
    setNewExpenseImage(() => ({
      backgroundImage: `url(${newExpense.img.url})`,
    }));
  }, [newExpense]);

  useEffect(() => {
    // const sorted = [...expensesToShow].sort(
    //   (a, b) => {
    //     if (a[sort.by] - b[sort.by]) return -1;
    //     if (b[sort.by] - a[sort.by]) return 1;
    //     return 0;
    //   }
    //   // sort.desc ? a[sort.by] - b[sort.by] : b[sort.by] - a[sort.by]
    // );

    setSortedExpensesToShow(
      [...expensesToShow].sort(
        (a, b) =>
          // {
          //   if (a[sort.by] - b[sort.by]) return -1;
          //   if (b[sort.by] - a[sort.by]) return 1;
          //   return 0;
          // }
          sort.desc ? a[sort.by] - b[sort.by] : b[sort.by] - a[sort.by]
        // a[sort.by].localeCompare(b[sort.by])
      )
    );
  }, [sort, expensesToShow]);

  useEffect(() => {
    setExpensesToShow(() =>
      expenses.filter((expense) => {
        const minAmount =
          !filters.minAmount || expense.amount >= filters.minAmount;
        const maxAmount =
          !filters.maxAmount || expense.amount <= filters.maxAmount;
        const status =
          filters.status === "all" || expense.status === filters.status;
        const name = expense.name
          .toUpperCase()
          .includes(filters.name.toUpperCase());
        return minAmount && maxAmount && status && name;
      })
    );
  }, [filters, expenses]);

  const handleExpenseEdit = (id, status, description) => {
    setExpenses((prev) => {
      // const tempExpense = prev.find((expense) => expense.id === id);
      // tempExpense.status = status;
      // tempExpense.description = description;
      prev.forEach((expense) => {
        if (expense.id === id) {
          if (status) expense.status = status;
          if (description) expense.description = description;
        }
      });
      // console.log(prev);
      return prev;
    });
  };

  const handleSortProperyChange = (type) => {
    setSort((prev) => ({
      by: type,
      desc: prev.by === type ? !prev.desc : true,
    }));
  };

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
        img: {
          url: reader.result,
          name: e.target.files[0].name,
        },
      }));
    };
  };

  useEffect(() => {
    console.log(newExpense);
  }, [newExpense]);

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleAddNewExpense = async (e) => {
    e.preventDefault();

    if (newExpense.img.name) {
      const storageRef = firebase.storage().ref().child(newExpense.img.name);
      const snapshot = await storageRef.putString(
        newExpense.img.url,
        "data_url"
      );
      const downloadUrl = await snapshot.ref.getDownloadURL();

      ExpensesApi.postExpense({
        ...newExpense,
        img: {
          name: newExpense.img.name,
          url: downloadUrl,
        },
      });
    } else {
      ExpensesApi.postExpense({
        ...newExpense,
        img: {
          name: "",
          url: "",
        },
      });
    }

    setExpenses((prev) => [
      ...prev,
      {
        ...newExpense,
        lp: expenses.length + 1,
      },
    ]);

    setIsNewExpenseFormVisible(false);

    setNewExpense({
      lp: expenses.length + 1,
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
        {newExpenseImage.backgroundImage && (
          <div
            style={newExpenseImage}
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
        setIsLoginFormVisible={setIsLoginFormVisible}
        user={user}
        setUser={setUser}
      />

      <FiltersSection setFilters={setFilters} />
      {user.id ? (
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <SortSection
                  handleSortProperyChange={handleSortProperyChange}
                />
                <MainSection
                  expenses={sortedExpensesToShow}
                  handleRemoveExpense={handleRemoveExpense}
                  handleExpenseEdit={handleExpenseEdit}
                >
                  {isNewExpenseFormVisible && newExpenseForm}
                </MainSection>
              </>
            )}
          />
          <Route
            path="/:id"
            render={() => (
              <Expense
                expense={expenses.find((expense) => expense.lp == id)}
                setExpenses={setExpenses}
                handleExpenseEdit={handleExpenseEdit}
              />
            )}
          />
        </Switch>
      ) : (
        <SortSection handleSortProperyChange={handleSortProperyChange} />
      )}
      <img src={moneyImg} alt="money" className="main-content__img" />
      <img
        src={moneyImg}
        alt="money"
        className="main-content__img main-content__img--left"
      />
      {isLoginFormVisible && !user.id && (
        <Login
          setUser={setUser}
          setIsLoginFormVisible={setIsLoginFormVisible}
        />
      )}
    </main>
  );
};

export default App;
