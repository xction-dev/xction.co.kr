/**
 * 검정색 버튼입니다.
 * inputType을 파라미터로 받습니다.
 */

import styles from "./BasicButton.module.css";
import typography from "../../../styles/typography.module.css";

type ButtonProps = {
  color: "black" | "white";
  content: string;
};

export default function BasicButton({ color, content }: ButtonProps) {
  return (
    <div className={styles[color]}>
      <button className={`${styles.button} ${typography.h5}`}>{content}</button>
    </div>
  );
}
