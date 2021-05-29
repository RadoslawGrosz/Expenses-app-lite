import React from "react";
import "../css/filtersSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  setMinAmount,
  setMaxAmount,
  setStatus,
  setText,
} from "../store/filterSlice";
import { useAppDispatch } from "../store/store";
import { StatusEnum } from "../types/Expense";

const FiltersSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value as StatusEnum));
  };

  return (
    <section className="filters-section">
      <h2 className="filters-section__title">Filtry</h2>
      <ul className="filters-section__filters-list">
        <li className="filters-section__filters-list__item">
          <label className="filters-section__filters-list__item__name">
            Mnimalna kwota
          </label>
          <div className="filters-section__filters-list__item__value">
            <input
              type="number"
              className="filters-section__filters-list__item__value__input"
              data-cy="filter-min-amount"
              onChange={(e) => dispatch(setMinAmount(parseInt(e.target.value)))}
            />
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
        </li>
        <li className="filters-section__filters-list__item">
          <label className="filters-section__filters-list__item__name">
            Maksymalna kwota
          </label>
          <div className="filters-section__filters-list__item__value">
            <input
              type="number"
              className="filters-section__filters-list__item__value__input"
              data-cy="filter-max-amount"
              onChange={(e) => dispatch(setMaxAmount(parseInt(e.target.value)))}
            />
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
        </li>
        <li className="filters-section__filters-list__item">
          <label
            htmlFor="status"
            className="filters-section__filters-list__item__name"
          >
            Status
          </label>
          <div className="filters-section__filters-list__item__value">
            <select
              name="status"
              className="filters-section__filters-list__item__value__input"
              data-cy="filter-status"
              onChange={handleStatusChange}
            >
              <option value={StatusEnum.All}>Wszystkie</option>
              <option value={StatusEnum.Paid}>Zapłacone</option>
              <option value={StatusEnum.PartlyPaid}>Częsciowo zapłacone</option>
            </select>
          </div>
        </li>
        <li className="filters-section__filters-list__item">
          <label className="filters-section__filters-list__item__name">
            Nazwa
          </label>
          <div className="filters-section__filters-list__item__value">
            <input
              type="text"
              className="filters-section__filters-list__item__value__input"
              data-cy="filter-name"
              onChange={(e) => dispatch(setText(e.target.value))}
              maxLength={25}
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </li>
      </ul>
      <img
        src="https://www.speedymentors.com/img/newhome/Group91.png"
        alt=""
        className="filters-section__image"
      />
    </section>
  );
};

export default FiltersSection;
