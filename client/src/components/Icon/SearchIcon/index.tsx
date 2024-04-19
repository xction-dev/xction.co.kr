import styles from "./SearchIcon.module.css";

export default function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="41"
      viewBox="0 0 42 41"
      fill="none"
      className={styles.searchIcon}
    >
      <path
        d="M33.0877 16.9492C33.0877 25.1409 26.1941 31.8983 17.5439 31.8983C8.89365 31.8983 2 25.1409 2 16.9492C2 8.75741 8.89365 2 17.5439 2C26.1941 2 33.0877 8.75741 33.0877 16.9492Z"
        stroke="#F1F1F1"
        strokeWidth="4"
      />
      <path
        d="M38.13 39.5866L27.317 29.2496L29.0785 27.3336L39.9999 37.5996L38.13 39.5866Z"
        fill="#F1F1F1"
        stroke="#F1F1F1"
        strokeWidth="2"
      />
    </svg>
  );
}
