import React, { useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./css/reset.css";
import "./css/index.css";
import moneyImg from "./img/money-transparent.png";
import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import SortSection from "./components/SortSection";
import MainSection from "./components/MainSection";
import Expense from "./components/Expense";
import Login from "./components/Login";
import useAuthentication from "./hooks/useAuthentication";
import { setVisibility } from "./actions/newExpense";

const App = () => {
  useAuthentication();
  const { id } = useParams();
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const expenses = useSelector((state) => state.expenses);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) setIsLoginFormVisible(false);
    else dispatch(setVisibility(false));
  }, [user]);
  
  return (
    <main className="main-content">
      <Header setIsLoginFormVisible={setIsLoginFormVisible} />
      <FiltersSection />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <>
              <SortSection />
              <MainSection />
            </>
          )}
        />
        {expenses.find((expense) => expense.lp == id) && (
          <Route
            path="/:id"
            render={() => (
              <Expense expense={expenses.find((expense) => expense.lp == id)} />
            )}
          />
        )}
      </Switch>
      <img src={moneyImg} alt="money" className="main-content__img" />
      <img
        src={moneyImg}
        alt="money"
        className="main-content__img main-content__img--left"
      />
      {isLoginFormVisible && !user.id && (
        <Login setIsLoginFormVisible={setIsLoginFormVisible} />
      )}
    </main>
  );
};

export default App;
