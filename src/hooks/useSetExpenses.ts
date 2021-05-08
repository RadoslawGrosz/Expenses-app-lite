import { useEffect } from "react";
import { fetchExpenses, setExpenses } from "../store/expensesSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const useSetExpenses = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user.id) dispatch(fetchExpenses());
    else dispatch(setExpenses([]));
  }, [user]);
};

export default useSetExpenses;
