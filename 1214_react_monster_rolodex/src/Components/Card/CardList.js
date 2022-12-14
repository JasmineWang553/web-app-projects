import styles from "./CardList.module.css";
import Card from "./Card";

export default function CardList(props) {
  return (
    <div className={styles["card-list-container"]}>
      <ul className={styles["card-list"]}>
        {props.monsterList.map((monster) => {
          return <Card key={monster.id} monster={monster} />;
        })}
      </ul>
    </div>
  );
}
