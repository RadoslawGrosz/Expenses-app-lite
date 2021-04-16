// const expensesReducerDefaultState = {
//   id: undefined,
//   name: "",
//   date: "",
//   amount: 0,
//   status: "paid",
//   description: "",
//   img: {
//     url: "",
//     name: "",
//   },
// };

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_EXPENSES":
      return action.expenses;
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.id);
    case "EDIT_EXPENSE":
      state.forEach((expense) => {
        if (expense.id === action.id) {
          if (action.status) expense.status = action.status;
          if (action.description) expense.description = action.description;
        }
      });
      return state;
    default:
      return state;
  }
};

export default expensesReducer;
