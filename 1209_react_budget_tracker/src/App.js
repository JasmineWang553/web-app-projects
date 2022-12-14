import Myform from "./components/form";

function App(props) {
  const getData = (data) => {
    console.log(data);
    this.t = data.title;
    this.p = data.price;
    console.log("APP");
  };

  return (
    <div>
      <h1>abc</h1>
      <Myform getData={getData} />
      {/* <button onClick={() => console.log("clicked")}>This is Button</button> */}
    </div>
  );
}

export default App;
