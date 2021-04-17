import { React } from "react";
import "../css/sortSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { sortBy, setSortDirection } from "../actions/filters";

const SortSection = () => {
  const sortByValue = useSelector((state) => state.filters.sortBy);
  const sortDirection = useSelector((state) => state.filters.sortDesc);
  const dispatch = useDispatch();

  const handleSort = (sortProp) => {
    if (sortProp === "none") return;
    dispatch(sortBy(sortProp));
    if (sortByValue === sortProp) dispatch(setSortDirection(!sortDirection));
  };

  const listItemsProperties = [
    {
      name: "Lp.",
      value: "lp",
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
      value: "none",
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
        onClick={() => handleSort(item.value)}
      >
        {item.name}{" "}
        {!(item.value === "none") && <FontAwesomeIcon icon={faSort} />}
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
