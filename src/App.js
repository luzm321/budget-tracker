import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";

const App = () => {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        {/* me-auto (margin end) ensures the Budget header is always on the left side of the screen */}
        {/* <h1>Budget Tracker</h1> */}
        <h1 className="me-auto">Budgets</h1>
        <Button variant="success">Add Budget</Button>
        <Button variant="outline-success">Add Expense</Button>
      </Stack>
    </Container>
  );
};

export default App;
