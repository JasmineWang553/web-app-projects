import "./Expenses.css";
import ExpenseFilter from "./ExpenseFilter";
// import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
  //   const [enteredYearFilter, setYearFilter] = useState("2022");

  const filteredExpensesArray = props.items.filter(
    (exp) => exp.date.getFullYear() === parseInt(props.filter_year) //enteredYearFilter)
  );

  //   const setFilteredYear = (selectedYear) => {
  //     setYearFilter(selectedYear);
  //   };
  return (
    <div className="expenses">
      <ExpenseFilter
        selected={props.filter_year}
        onChangeFilter={props.onfilter}
      ></ExpenseFilter>
      <ExpensesChart expenses={filteredExpensesArray}></ExpensesChart>
      <ExpensesList items={filteredExpensesArray}></ExpensesList>
    </div>
  );
}

export default Expenses;
