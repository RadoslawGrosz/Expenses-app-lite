import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { editExpense } from "../actions/expense";
import ExpenseApi from "../api/ExpenseApi";

const Expense = ({ expense = {} }) => {
  const history = useHistory();
  const { id, name, date, amount, img, status, description } = expense;
  const [stylesImage, setStylesImage] = useState();
  const [expenseNewStatus, setExpenseNewStatus] = useState(status);
  const [expenseNewDescription, setExpensesNewDescription] = useState(
    description
  );
  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const handleEditExpenseFormSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editExpense(id, expenseNewStatus, expenseNewDescription));
    const expenseToSend = { ...expenses.find((expense) => expense.id === id) };
    delete expenseToSend.lp;
    ExpenseApi.editExpense(id, expenseToSend);
  };

  useEffect(() => {
    // if (img) {
    //   setStylesImage(() => ({
    //     backgroundImage: `url(${img.url})`,
    //   }));
    // }
    setStylesImage(() => ({
      backgroundImage: `url(${
        img.url
          ? img.url
          : "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png"
      })`,
    }));
  }, [img]);

  return (
    <>
      <section className="sort-section">
        <button
          className="sort-section__button"
          onClick={() => history.push(`/`)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </section>
      <section className="main-section">
        <div className="main-section__image" style={stylesImage}></div>
        <article className="main-section__info">
          <h2 className="main-section__info__text">{name}</h2>
          <h3 className="main-section__info__text">{date}</h3>
          <h3 className="main-section__info__text main-section__info__text--amount">
            {amount}
          </h3>
          <div className="main-section__info__status">
            <select
              name="status"
              className="main-section__info__status__value"
              value={expenseNewStatus}
              onChange={(e) => setExpenseNewStatus(e.target.value)}
            >
              <option value="paid">Zapłacone</option>
              <option value="partly-paid">Częsciowo zapłacone</option>
            </select>
          </div>
          <form
            className="main-section__info__desc-container"
            onSubmit={handleEditExpenseFormSubmit}
          >
            <h3 className="main-section__info__desc-container__title">Opis:</h3>
            <textarea
              name="text"
              rows="14"
              cols="10"
              wrap="soft"
              maxLength="500"
              placeholder="Dodaj opis..."
              value={expenseNewDescription}
              className="main-section__info__desc-container__description"
              onChange={(e) => setExpensesNewDescription(e.target.value)}
            />
            <input
              type="submit"
              value="Zapisz"
              className="main-section__info__desc-container__submit"
            />
          </form>
        </article>
      </section>
    </>
  );
};

export default Expense;
