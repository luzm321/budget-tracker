import { Card } from "react-bootstrap";

const BudgetCard = ({ name, amount, max }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <div>{name}</div>
          <div>
            {amount} / {max}
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
