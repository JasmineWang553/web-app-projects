import styles from "./Card.module.css";

function Card(props) {
  const { monster } = props;

  return (
    <li className={styles.card}>
      <img
        alt={`monster ${monster.name}`}
        src={`https://robohash.org/${monster.id}?set=set2&size=180x180`}
      />
      <h2>{monster.name}</h2>
      <p>{monster.email}</p>
    </li>
  );
}

export default Card;
