import { Modal, Button, Stack } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsProvider";
import { currencyFormatter } from "../utils";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    // If we have the uncategorized budget, create a new budget so it can be used; otherwise, find the budget that matches the
    // id of the budgetId passed as prop to component:
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);

  return (
    // If there's a budgetId passed into component as prop, then modal will be shown
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            {/* Optional chaining (?) - If budget is defined, access and get the name; else just ignore it and don't error: */}
            <div>Expenses - {budget?.name}</div>
            {/* Can't delete the Uncategorized budget, so if budget selected is not the Uncategorized one, then run code after 
            the operator: */}
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack key={expense.id} direction="horizontal" gap="2">
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
