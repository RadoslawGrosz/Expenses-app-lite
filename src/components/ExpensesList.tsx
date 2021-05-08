import React from "react";
import ExpensesListItem from "./ExpensesListItem";
import NewExpenseForm from "./NewExpenseForm";
import useSetExpenses from "../hooks/useSetExpenses";
import useGetVisibleExpenses from "../hooks/useGetVisibleExpenses";

interface Props {
  setChosenExpense: React.Dispatch<React.SetStateAction<string | undefined>>;
  isNewExpenseFormVisible: boolean;
  setIsNewExpenseFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpensesList: React.FC<Props> = ({
  setChosenExpense,
  isNewExpenseFormVisible,
  setIsNewExpenseFormVisible,
}) => {
  useSetExpenses();
  const visibleExpenses = useGetVisibleExpenses();

  return (
    <ul className="main-section__list">
      {visibleExpenses[0] &&
        visibleExpenses.map((expense, index) => (
          <ExpensesListItem
            expense={expense}
            key={expense.id}
            index={index}
            setChosenExpense={setChosenExpense}
          />
        ))}
      {isNewExpenseFormVisible && (
        <NewExpenseForm
          setIsNewExpenseFormVisible={setIsNewExpenseFormVisible}
        />
      )}
    </ul>
  );
};

export default ExpensesList;
