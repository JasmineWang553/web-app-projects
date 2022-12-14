import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no Expenses</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((exp) => (
        <ExpenseItem
          key={exp.id}
          date={exp.date}
          title={exp.title}
          amount={exp.amount}
        ></ExpenseItem>
      ))}
    </ul>
  );
};

export default ExpensesList;
