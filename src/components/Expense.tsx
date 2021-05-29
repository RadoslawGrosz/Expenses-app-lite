import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { editExpense } from "../store/expensesSlice";
import { Expense as ExpenseType, StatusEnum } from "../types/Expense";
import { useAppDispatch } from "../store/store";

interface Props {
  expense: ExpenseType;
  setExpense: React.Dispatch<React.SetStateAction<ExpenseType | undefined>>;
  setChosenExpense: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface Styles {
  backgroundImage: string;
}

const Expense: React.FC<Props> = ({
  expense,
  setExpense,
  setChosenExpense,
}) => {
  const [styles, setStyles] = useState<Styles>();
  const dispatch = useAppDispatch();

  const handleEditExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editExpense(expense));
  };

  useEffect(() => {
    const setStylesImage = () => {
      setStyles(() => ({
        backgroundImage: `url(${
          expense.img.url
            ? expense.img.url
            : "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png"
        })`,
      }));
    };

    if (expense.img) setStylesImage();
  }, [expense]);

  if (!expense.id) return null;
  return (
    <div className="expense-wrapper">
      <button
        className="expense-wrapper__button"
        onClick={() => setChosenExpense(undefined)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <section className="main-section">
        <div className="main-section__image" style={styles}></div>
        <article className="main-section__info">
          <h2 className="main-section__info__text">{expense.name}</h2>
          <h3 className="main-section__info__text">{expense.date}</h3>
          <h3 className="main-section__info__text main-section__info__text--amount">
            {expense.amount}
          </h3>
          <div className="main-section__info__status">
            <select
              name="status"
              className="main-section__info__status__value"
              value={expense.status}
              onChange={(e) =>
                setExpense(
                  (prev) =>
                    ({
                      ...prev,
                      status: e.target.value as StatusEnum,
                    } as ExpenseType)
                )
              }
            >
              <option value={StatusEnum.Paid}>Zapłacone</option>
              <option value={StatusEnum.PartlyPaid}>Częsciowo zapłacone</option>
            </select>
          </div>
          <form
            className="main-section__info__desc-container"
            onSubmit={handleEditExpense}
          >
            <h3 className="main-section__info__desc-container__title">Opis:</h3>
            <textarea
              name="text"
              rows={14}
              cols={10}
              wrap="soft"
              maxLength={500}
              placeholder="Dodaj opis..."
              value={expense.description}
              className="main-section__info__desc-container__description"
              onChange={(e) =>
                setExpense(
                  (prev) =>
                    ({ ...prev, description: e.target.value } as ExpenseType)
                )
              }
            />
            <input
              type="submit"
              value="Zapisz"
              className="main-section__info__desc-container__submit"
            />
          </form>
        </article>
      </section>
    </div>
  );
};

export default Expense;
