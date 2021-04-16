const newExpensesReducerDefaultState = {
  expense: {
    lp: 0,
    name: "",
    date: "",
    amount: 0,
    img: {
      url: "",
      name: "",
    },
    status: "paid",
    description: "",
  },
  isVisible: false,
};

const expensesReducer = (state = newExpensesReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        expense: {
          ...state.expense,
          name: action.name,
        },
      };
    case "SET_DATE":
      return {
        ...state,
        expense: {
          ...state.expense,
          date: action.date,
        },
      };
    case "SET_AMOUNT":
      return {
        ...state,
        expense: {
          ...state.expense,
          amount: action.amount,
        },
      };
    case "SET_IMG":
      return {
        ...state,
        expense: {
          ...state.expense,
          img: {
            url: action.img.url,
            name: action.img.name,
          },
        },
      };
    case "SET_NEW_EXPENSE_STATUS":
      return {
        ...state,
        expense: {
          ...state.expense,
          status: action.status,
        },
      };
    case "SET_VISIBILITY":
      return {
        ...state,
        isVisible: action.isVisible,
      };
    case "SET_EXPENSE_TO_DEFAULT":
      return newExpensesReducerDefaultState;
    default:
      return state;
  }
};

export default expensesReducer;
