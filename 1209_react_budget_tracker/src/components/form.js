import React, { useState } from "react";

function MyForm(props) {
  const [enteredTitle, setTitle] = useState("");
  const [enteredPrice, setPrice] = useState(0.0);

  function titleHandler(event) {
    // console.log(event.target.value);
    setTitle(event.target.value);
  }

  function priceHandler(event) {
    console.log(event.target.value);
    setPrice(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const data = {
      title: enteredTitle,
      price: enteredPrice,
    };

    props.getData(data);
    setTitle("");
    setPrice(0.0);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="title" onChange={titleHandler}>
        <label for="title">Title: </label>
        <input type="text" id="title"></input>
      </div>

      <div className="price" onChange={priceHandler}>
        <label for="price">Price: </label>
        <input type="number" min="0.00" step="0.01" id="price"></input>
      </div>

      <button type="Submit">Submit</button>
    </form>
  );
}

export default MyForm;
