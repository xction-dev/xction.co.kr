/**
 * 검정색 버튼입니다.
 * inputType을 파라미터로 받습니다.
 */

import styles from "./ButtonBlack.module.css";
import typography from "@styles/typography.module.css";

type ButtonProps = {
  content: string;
};

export default function ButtonBlack({ content }: ButtonProps) {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${typography.h5}`}>{content}</button>
    </div>
  );
}
