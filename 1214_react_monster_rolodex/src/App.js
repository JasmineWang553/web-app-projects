import "./App.css";
import CardList from "./Components/Card/CardList";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";

function App() {
  const [monsterList, setMonsterList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((ls) => setMonsterList(ls));
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <CardList monsterList={monsterList} />
    </div>
  );
}

export default App;
