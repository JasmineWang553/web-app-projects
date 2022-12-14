import React from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";

const NewExpense = (props) => {
  const [renderForm, setRenderForm] = useState(false);

  const onCancel = () => {
    setRenderForm(false);
  };

  const onAddExpense = () => {
    setRenderForm(true);
  };

  if (!renderForm) {
    return (
      <div className="new-expense">
        <button onClick={onAddExpense}>Add New Expense</button>
      </div>
    );
  }

  return (
    <div className="new-expense">
      <ExpenseForm
        onCancel={onCancel}
        onSaveExpenseData={props.onSaveExpenseData}
      ></ExpenseForm>
    </div>
  );
};

export default NewExpense;
