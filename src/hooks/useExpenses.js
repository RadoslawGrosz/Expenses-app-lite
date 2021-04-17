import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../actions/expense";
import ExpenseApi from "../api/ExpenseApi";

const useExpenses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getExpenses = async () => {
      const expensesFromApi = await ExpenseApi.getExpenses();
      // expensesFromApi.forEach((expense, index) => (expense.lp = index + 1));
      // console.log(expensesFromApi);
      dispatch(setExpenses(expensesFromApi));
    };
    if (user.id) getExpenses();
    else dispatch(setExpenses([]));
  }, [user]);
};

export default useExpenses;
