import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import ExpenseApi from "../api/ExpenseApi";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { setExpenses } from "../actions/expense";
import {
  setName,
  setDate,
  setAmount,
  setStatus,
  setImg,
  setExpenseToDefault,
} from "../actions/newExpense";

const NewExpenseForm = () => {
  const expenses = useSelector((state) => state.expenses);
  const [newExpenseImage, setNewExpenseImage] = useState({});
  const newExpense = useSelector((state) => state.newExpense);
  const [newExpenseUploaded, setNewExpenseUploaded] = useState(null);
  const { expense } = newExpense;
  const dispatch = useDispatch();

  useEffect(() => {
    setNewExpenseImage(() => ({
      backgroundImage: `url(${expense.img.url})`,
    }));
  }, [newExpense]);

  const handleImageChoose = (e) => {
    if (!e.target.files[0]) return;
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    window.URL.createObjectURL(image);

    reader.onload = () => {
      dispatch(
        setImg({
          url: reader.result,
          name: image.name,
        })
      );
    };
  };

  const handleAddNewExpense = async (e) => {
    e.preventDefault();

    const expenseToSend = { ...expense };
    delete expenseToSend.lp;

    if (expense.img.name) {
      const storageRef = firebase.storage().ref().child(expense.img.name);
      const snapshot = await storageRef.putString(expense.img.url, "data_url");
      const downloadUrl = await snapshot.ref.getDownloadURL();

      expenseToSend.img = {
        name: expense.img.name,
        url: downloadUrl,
      };

      setNewExpenseUploaded(ExpenseApi.postExpense(expenseToSend));
    } else {
      expenseToSend.img = {
        name: "",
        url: "",
      };

      setNewExpenseUploaded(
        ExpenseApi.postExpense({
          ...expense,
          img: {
            name: "",
            url: "",
          },
        })
      );
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      const expensesFromApi = await ExpenseApi.getExpenses();
      expensesFromApi.forEach((expense, index) => (expense.lp = index + 1));
      await dispatch(setExpenses(expensesFromApi));
      dispatch(setExpenseToDefault());
    };

    if (newExpenseUploaded) getExpenses();
  }, [newExpenseUploaded]);

  return (
    <form className="main-section__list__item" onSubmit={handleAddNewExpense}>
      <p className="main-section__list__item__value main-section__list__item__value--new">
        {expenses.length + 1}
      </p>
      <input
        type="text"
        className="main-section__list__item__value main-section__list__item__value--new"
        value={expense.name}
        onChange={(e) => dispatch(setName(e.target.value))}
        required={true}
        placeholder="Nazwa transakcji..."
        maxLength={25}
      />
      <input
        type="date"
        className="main-section__list__item__value main-section__list__item__value--new"
        value={expense.date}
        onChange={(e) => dispatch(setDate(e.target.value))}
        required
      />
      <input
        type="number"
        className="main-section__list__item__value main-section__list__item__value--new"
        value={expense.amount}
        onChange={(e) => dispatch(setAmount(e.target.value))}
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
          value={expense.status}
          onChange={(e) => dispatch(setStatus(e.target.value))}
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
};

export default NewExpenseForm;
