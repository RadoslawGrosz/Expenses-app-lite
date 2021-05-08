import React from "react";
import "../css/sortSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { setSortBy } from "../store/filterSlice";
import { useAppDispatch } from "../store/store";
import { SortPropertiesEnum } from "../types/Filter";

const SortSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSort = (sortProp: SortPropertiesEnum) => {
    dispatch(setSortBy(sortProp));
  };

  const listItemsProperties = [
    {
      name: "Lp.",
      value: SortPropertiesEnum.Description,
    },
    {
      name: "Nazwa transakcji",
      value: SortPropertiesEnum.Name,
    },
    {
      name: "Data",
      value: SortPropertiesEnum.Date,
    },
    {
      name: "Kwota",
      value: SortPropertiesEnum.Amount,
    },
    {
      name: "Obrazek",
      value: SortPropertiesEnum.Description,
    },
    {
      name: "Status",
      value: SortPropertiesEnum.Status,
    },
  ];

  const listItems = listItemsProperties.map((item) => (
    <li className="sort-section__list__item" key={item.name}>
      <p
        className="sort-section__list__item__button"
        onClick={() => handleSort(item.value)}
      >
        {item.name}{" "}
        {!(item.value === SortPropertiesEnum.Description) && (
          <i>
            <FontAwesomeIcon icon={faSort} />
          </i>
        )}
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
