import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeExpense, editExpense } from "../store/expensesSlice";
import { Expense } from "../types/Expense";
import { useAppDispatch } from "../store/store";
import { StatusEnum } from "../types/Expense";

interface Props {
  expense: Expense;
  index: number;
  setChosenExpense: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface expenseStyle {
  backgroundImage: string;
}

const ExpensesListItem: React.FC<Props> = ({
  expense,
  index,
  setChosenExpense,
}) => {
  const [styles, setStyles] = useState<expenseStyle>();
  const { id, name, date, amount, status, img } = expense;
  const dispatch = useAppDispatch();

  const handleEditExpense = async (status: StatusEnum) => {
    dispatch(
      editExpense({
        ...expense,
        status,
      })
    );
  };

  useEffect(() => {
    setStyles(() => ({
      backgroundImage: `url(${
        img.url
          ? img.url
          : "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png"
      })`,
    }));
  }, [img]);

  return (
    <li className="main-section__list__item">
      <p className="main-section__list__item__value">{index + 1}</p>
      <p className="main-section__list__item__value">{name}</p>
      <p className="main-section__list__item__value">{date}</p>
      <p className="main-section__list__item__value main-section__list__item__value--amount">
        {amount}
      </p>
      <div
        className="main-section__list__item__value main-section__list__item__value--image"
        onClick={() => setChosenExpense(id)}
        style={styles}
      ></div>
      <div className="main-section__list__item__value">
        <select
          name="status"
          className="main-section__list__item__value__status main-section__list__item__value__status--draft"
          value={status}
          onChange={(e) => handleEditExpense(e.target.value as StatusEnum)}
        >
          <option value={StatusEnum.Paid}>Zapłacone</option>
          <option value={StatusEnum.PartlyPaid}>Częsciowo zapłacone</option>
        </select>
      </div>
      <button
        className="main-section__list__item__value main-section__list__item__value--remove"
        onClick={() => dispatch(removeExpense(id))}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default ExpensesListItem;
