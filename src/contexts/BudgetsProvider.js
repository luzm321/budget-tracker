import React, { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid"; // fxn to be invoked to generate a new unique ID from uuid library

const BudgetsContext = createContext();

// Method allows you to use context:
export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addExpense = ({ description, amount, budgetId}) => {
    // set the expensess by taking current expenses (prevExpenses array), then returning them with addition of creating a new expense
    // with a new id that comes from the universal unique identifier library, along with its desc, amount, and budgetId value passed to fxn:
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  };

  const addBudget = ({ name, max }) => {
    // set the budgets by taking current budgets (prevBudgets array), then returning them with addition of creating a new budget
    // with a new id that comes from the universal unique identifier library, along with its name and max value passed to fxn:
    setBudgets((prevBudgets) => {
      // check to prevent duplicate budgets
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets;
      };
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = () => {};

  const deleteExpense = () => {};

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
