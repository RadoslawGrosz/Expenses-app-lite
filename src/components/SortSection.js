import { React } from "react";
import "../css/sortSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const SortSection = ({ handleSortProperyChange }) => {
  const listItemsProperties = [
    {
      name: "Lp.",
      value: "id",
    },
    {
      name: "Nazwa transakcji",
      value: "name",
    },
    {
      name: "Data",
      value: "date",
    },
    {
      name: "Kwota",
      value: "amount",
    },
    {
      name: "Obrazek",
      value: "image",
    },
    {
      name: "Status",
      value: "status",
    },
  ];

  const listItems = listItemsProperties.map((item) => (
    <li className="sort-section__list__item" key={item.value}>
      <p
        className="sort-section__list__item__button"
        onClick={() => handleSortProperyChange(item.value)}
      >
        {item.name} <FontAwesomeIcon icon={faSort} />
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
