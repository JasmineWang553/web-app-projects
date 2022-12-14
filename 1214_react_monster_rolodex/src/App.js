import "./App.css";
import CardList from "./Components/Card/CardList";
import Header from "./Components/Title/Header";
import SearchBox from "./Components/SearchBox/SearchBox";
import { useEffect, useState } from "react";

function App() {
  const [monsterList, setMonsterList] = useState([]);
  const [filteredMonsterList, setFilteredMonsterList] = useState(monsterList);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((ls) => {
        setMonsterList(ls);
      });
  }, []);

  useEffect(() => {
    const f = monsterList.filter((monster) =>
      monster.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMonsterList(f);
  }, [monsterList, searchTerm]);

  const searchBoxHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <Header></Header>
      <SearchBox onSearch={searchBoxHandler}></SearchBox>
      <CardList monsterList={filteredMonsterList} />
    </div>
  );
}

export default App;
