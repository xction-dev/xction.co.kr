/**
 * Post Like를 위한 좋아요 버튼입니다.
 */

import LikeIcon from "@components/Icon/LikeIcon";
import styles from "./LikeButton.module.css";

export default function LikeButton() {
  return (
    <button className={styles.button}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <circle cx="30" cy="30" r="30" fill="#343434" />
      </svg>
      <div className={styles.icon}>
        <LikeIcon />
      </div>
    </button>
  );
}
