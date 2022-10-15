import React, { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid"; // fxn to be invoked to generate a new unique ID from uuid library
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

// Method allows you to use context:
export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addExpense = ({ description, amount, budgetId }) => {
    // set the expenses by taking current expenses (prevExpenses array), then returning them with addition of creating a new expense
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
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = ({ id }) => {
    // Deleting a budget will move the expenses from that budget to the uncategorized budget:
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        // If the expense's budgetId is not equal to the current id, just return the expense as normal as it's not the correct budget
        if (expense.budgetId !== id) return expense;
        // Otherwise, spread it out and return the entire expense and change that budgetId to the uncategorized budget id
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    // deleting budget that does not have the current id
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) => {
    // deleting expense that does not have the current id
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

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
