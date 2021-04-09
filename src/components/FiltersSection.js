import { React } from "react";
import "../css/filtersSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faSearch } from "@fortawesome/free-solid-svg-icons";

const FiltersSection = ({ setFilters }) => {
  const handleMinAmountFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      minAmount: e.target.value,
    }));
  };

  const handleMaxAmountFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      maxAmount: e.target.value,
    }));
  };

  const handleStatusFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleNameFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      name: e.target.value,
    }));
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
              onChange={handleMinAmountFilterChange}
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
              onChange={handleMaxAmountFilterChange}
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
              onChange={handleStatusFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="paid">Zapłacone</option>
              <option value="partly-paid">Częsciowo zapłacone</option>
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
              onChange={handleNameFilterChange}
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
