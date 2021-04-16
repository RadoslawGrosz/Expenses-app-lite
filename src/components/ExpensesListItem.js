import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ExpenseApi from "../api/ExpenseApi";
import { removeExpense, editExpense } from "../actions/expense";

const ExpensesListItem = ({ expense }) => {
  const history = useHistory();
  const expenses = useSelector((state) => state.expenses);
  const [stylesImage, setStylesImage] = useState();
  const { id, lp, name, date, amount, status, img } = expense;
  const [expenseNewStatus, setExpenseNewStatus] = useState(status);
  const dispatch = useDispatch();

  useEffect(() => {
    handleExpenseEdit(id, expenseNewStatus);
  }, [expenseNewStatus]);

  useEffect(() => {
    setStylesImage(() => ({
      backgroundImage: `url(${
        img.url
          ? img.url
          : "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png"
      })`,
    }));
  }, [img]);

  const handleExpenseEdit = async (id, status, description) => {
    await dispatch(editExpense(id, status, description));
    const expenseToSend = { ...expenses.find((expense) => expense.id === id) };
    delete expenseToSend.lp;
    ExpenseApi.editExpense(id, expenseToSend);
  };

  const handleRemoveExpense = (id) => {
    ExpenseApi.delExpense(id);
    dispatch(removeExpense(id));
  };

  return (
    <li className="main-section__list__item">
      <p className="main-section__list__item__value">{lp}</p>
      <p className="main-section__list__item__value">{name}</p>
      <p className="main-section__list__item__value">{date}</p>
      <p className="main-section__list__item__value main-section__list__item__value--amount">
        {amount}
      </p>
      <div
        className="main-section__list__item__value main-section__list__item__value--image"
        onClick={() => history.push(`/${lp}`)}
        style={stylesImage}
      ></div>
      <div className="main-section__list__item__value">
        <select
          name="status"
          className="main-section__list__item__value__status main-section__list__item__value__status--draft"
          value={expenseNewStatus}
          onChange={(e) => setExpenseNewStatus(e.target.value)}
        >
          <option value="paid">Zapłacone</option>
          <option value="partly-paid">Częsciowo zapłacone</option>
        </select>
      </div>
      <button
        className="main-section__list__item__value main-section__list__item__value--remove"
        onClick={() => handleRemoveExpense(id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default ExpensesListItem;
