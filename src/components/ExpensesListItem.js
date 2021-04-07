import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ExpensesListItem = ({ expense, handleRemoveExpense }) => {
  const history = useHistory();
  const [stylesImage, setStylesImage] = useState();
  const { id, name, date, amount, img } = expense;

  useEffect(() => {
    setStylesImage(() => ({
      backgroundImage: `url(${
        img
          ? img
          : "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png"
      })`,
    }));
  }, [img]);

  return (
    <li className="main-section__list__item">
      <p className="main-section__list__item__value">{id}</p>
      <p className="main-section__list__item__value">{name}</p>
      <p className="main-section__list__item__value">{date}</p>
      <p className="main-section__list__item__value main-section__list__item__value--amount">
        {amount}
      </p>
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
          <option value="paid" selected={expense.status === "paid"}>
            Zapłacone
          </option>
          <option
            value="partly-paid"
            selected={expense.status === "partly-paid"}
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
