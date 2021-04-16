const filtersReducerDefaultState = {
  minAmount: "",
  maxAmount: "",
  status: "all",
  text: "",
  sortBy: "lp",
  sortDesc: true,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_MIN_AMOUNT":
      return {
        ...state,
        minAmount: action.minAmount,
      };
    case "SET_MAX_AMOUNT":
      return {
        ...state,
        maxAmount: action.maxAmount,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_LP":
      return {
        ...state,
        sortBy: "lp",
      };
    case "SORT_BY_NAME":
      return {
        ...state,
        sortBy: "name",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_STATUS":
      return {
        ...state,
        sortBy: "status",
      };
    case "SORT_BY":
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case "SET_SORT_DIRECTION":
      return {
        ...state,
        sortDesc: action.isSortDesc,
      };
    default:
      return state;
  }
};

export default filtersReducer;
