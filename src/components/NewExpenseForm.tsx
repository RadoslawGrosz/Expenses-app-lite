import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { postExpense } from "../store/expensesSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Expense, StatusEnum } from "../types/Expense";

interface Props {
  setIsNewExpenseFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewExpenseImageStyles {
  backgroundImage: string;
}

const NewExpenseForm: React.FC<Props> = ({ setIsNewExpenseFormVisible }) => {
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const [newExpense, setNewExpense] = useState<Expense>({
    id: undefined,
    name: "",
    date: "",
    amount: 0,
    status: StatusEnum.Paid,
    description: "",
    img: {
      name: "",
      url: "",
    },
  });
  const [newExpenseImageStyles, setNewExpenseImageStyles] =
    useState<NewExpenseImageStyles>({ backgroundImage: "" });
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewExpenseImageStyles(() => ({
      backgroundImage: `url(${newExpense.img.url})`,
    }));
  }, [newExpense]);

  const handleImageChoose = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    window.URL.createObjectURL(image);

    reader.onload = () => {
      let url: string = "";

      if (typeof reader.result === "string") {
        url = reader.result;
      }

      setNewExpense((prev) => ({
        ...prev,
        img: { url, name: image.name },
      }));
    };
  };

  const handleAddNewExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const expenseToPost: Expense = { ...newExpense };

    if (newExpense.img.name) {
      const storageRef = firebase.storage().ref().child(newExpense.img.name);
      const snapshot = await storageRef.putString(
        newExpense.img.url,
        "data_url"
      );
      const downloadUrl = await snapshot.ref.getDownloadURL();

      expenseToPost.img = {
        name: newExpense.img.name,
        url: downloadUrl,
      };
    } else {
      expenseToPost.img = {
        name: "",
        url: "",
      };
    }
    dispatch(postExpense(expenseToPost));
    setIsNewExpenseFormVisible(false);
  };

  return (
    <form className="main-section__list__item" onSubmit={handleAddNewExpense}>
      <p className="main-section__list__item__value main-section__list__item__value--new">
        {expenses.length + 1}
      </p>
      <input
        type="text"
        className="main-section__list__item__value main-section__list__item__value--new"
        data-cy="new-expense-name"
        value={newExpense.name}
        onChange={(e) =>
          setNewExpense((prev) => ({ ...prev, name: e.target.value }))
        }
        required={true}
        placeholder="Nazwa transakcji..."
        maxLength={25}
      />
      <input
        type="date"
        className="main-section__list__item__value main-section__list__item__value--new"
        data-cy="new-expense-date"
        value={newExpense.date}
        onChange={(e) =>
          setNewExpense((prev) => ({ ...prev, date: e.target.value }))
        }
        required
      />
      <input
        type="number"
        className="main-section__list__item__value main-section__list__item__value--new"
        data-cy="new-expense-amount"
        value={newExpense.amount}
        onChange={(e) =>
          setNewExpense((prev) => ({
            ...prev,
            amount: parseInt(e.target.value),
          }))
        }
      />
      <div className="main-section__list__item__value main-section__list__item__value--new main-section__list__item__value--file-container">
        <input
          type="file"
          name="file"
          id="file"
          className="main-section__list__item__value__input-file"
          data-cy="new-expense-image"
          onChange={handleImageChoose}
        />
        {newExpenseImageStyles.backgroundImage && (
          <div
            style={newExpenseImageStyles}
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
          data-cy="new-expense-status"
          value={newExpense.status}
          onChange={(e) =>
            setNewExpense((prev) => ({
              ...prev,
              status: e.target.value as StatusEnum,
            }))
          }
        >
          <option value={StatusEnum.Paid}>Zapłacone</option>
          <option value={StatusEnum.PartlyPaid}>Częsciowo zapłacone</option>
        </select>
      </div>
      <button
        className="main-section__list__item__value main-section__list__item__value--add"
        data-cy="new-expense-submit"
        type="submit"
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </form>
  );
};

export default NewExpenseForm;
