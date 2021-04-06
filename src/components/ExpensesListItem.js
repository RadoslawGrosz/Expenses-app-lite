import { React } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ExpensesListItem = ({ expense, handleRemoveExpense }) => {
  const history = useHistory();
  const { id, name, date, amount, img } = expense;

  const stylesImage = {
    backgroundImage: `url(${img})`,
  };

  return (
    <li className="main-section__list__item">
      <p className="main-section__list__item__value">{id}</p>
      <p className="main-section__list__item__value">{name}</p>
      <p className="main-section__list__item__value">{date}</p>
      <p className="main-section__list__item__value">{amount}</p>
      <div
        className="main-section__list__item__value main-section__list__item__value--image"
        onClick={() => history.push(`/${id}`)}
        style={stylesImage}
      ></div>
      <div className="main-section__list__item__value">
        <select
          name="status"
          className="main-section__list__item__value__status main-section__list__item__value__status--draft"
        >
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
