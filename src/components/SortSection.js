import { React } from "react";
import "../css/sortSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const SortSection = () => {
  const listItemNames = [
    "Lp.",
    "Nazwa transakcji",
    "Data",
    "Kwota",
    "Obrazek",
    "Status",
  ];

  const listItems = listItemNames.map((name) => (
    <li className="sort-section__list__item">
      <p className="sort-section__list__item__button">
        {name} <FontAwesomeIcon icon={faSort} />
      </p>
    </li>
  ));

  return (
    <section className="sort-section">
      <ul className="sort-section__list">{listItems}</ul>
    </section>
  );
};

export default SortSection;
