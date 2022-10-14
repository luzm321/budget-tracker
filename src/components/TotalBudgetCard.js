import { useBudgets } from "../contexts/BudgetsProvider";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudgets();
  // reduce: get all expenses and budgets and add all the different amounts and max together into 1 single value
  // and return it as the amount and max variable with 0 as default starting total value:
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  // don't show card if there is no max value since it means there's no budget or expenses set up
  if (max === 0) return null;

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
};

export default TotalBudgetCard;
