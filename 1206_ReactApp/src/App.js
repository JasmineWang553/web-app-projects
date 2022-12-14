import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState } from "react";

const Dummy_exp = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2022, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2022, 5, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(Dummy_exp);
  const [selectedYear, setYear] = useState("2022");

  const addExpenseHandler = (expense) => {
    setExpenses((prev) => {
      return [expense, ...prev];
    });

    setYear("" + expense.date.getFullYear());
  };

  return (
    <div>
      <NewExpense onSaveExpenseData={addExpenseHandler}></NewExpense>
      <Expenses
        filter_year={selectedYear}
        onfilter={setYear}
        items={expenses}
      ></Expenses>
    </div>
  );
}

export default App;
