import styles from "./SearchBox.module.css";

export default function SearchBox(props) {
  return (
    <div className={styles["search-box-container"]}>
      <input
        className={styles["search-box"]}
        type="search"
        placeholder="Search Name"
        onChange={props.onSearch}
      />
    </div>
  );
}
