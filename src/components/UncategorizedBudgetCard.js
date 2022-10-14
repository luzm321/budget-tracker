import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsProvider";
import BudgetCard from "./BudgetCard";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  // reduce: get all expenses from array for a uncategorized budget and add all the different amounts together into 1 single value
  // and return it as the amount variable with 0 as default starting total value:
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  // don't show card if there is no amount at all/no expenses under this uncategorized budget
  if (amount === 0) return null;

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
};

export default UncategorizedBudgetCard;
