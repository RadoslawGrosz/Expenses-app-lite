import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ExpensesListItem = ({ expense }) => {
  return (
    <li className="main-section__list__item">
      <p className="main-section__list__item__value">{expense.id}</p>
      <p className="main-section__list__item__value">{expense.name}</p>
      <p className="main-section__list__item__value">{expense.date}</p>
      <p className="main-section__list__item__value">{expense.amount}</p>
      <p className="main-section__list__item__value">{expense.img}</p>
      <div className="main-section__list__item__value">
        <select
          name="status"
          className="main-section__list__item__value__status main-section__list__item__value__status--draft"
        >
          <option value="all" selected={expense.status === "Wszystkie"}>
            Wszystkie
          </option>
          <option value="paid" selected={expense.status === "Zapłacone"}>
            Zapłacone
          </option>
          <option
            value="partly-paid"
            selected={expense.status === "Częsciowo zapłacone"}
          >
            Częsciowo zapłacone
          </option>
        </select>
      </div>
      <button className="main-section__list__item__value main-section__list__item__value--remove">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default ExpensesListItem;
