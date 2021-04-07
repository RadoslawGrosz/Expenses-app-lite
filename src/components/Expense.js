import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Expense = ({ expense = {} }) => {
  const history = useHistory();
  const { name, date, amount, img, status, description } = expense;
  const [stylesImage, setStylesImage] = useState();

  useEffect(() => {
    setStylesImage(() => ({
      backgroundImage: `url(${
        img
          ? img
          : "https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png"
      })`,
    }));
  }, [expense]);

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
            <select name="status" className="main-section__info__status__value">
              <option value="paid" selected={status === "Zapłacone"}>
                Zapłacone
              </option>
              <option
                value="partly-paid"
                selected={status === "Częsciowo zapłacone"}
              >
                Częsciowo zapłacone
              </option>
            </select>
          </div>
          <div className="main-section__info__desc-container">
            <h3 className="main-section__info__desc-container__title">Opis:</h3>
            <p className="main-section__info__desc-container__description">
              {description}
            </p>
          </div>
        </article>
      </section>
    </>
  );
};

export default Expense;
