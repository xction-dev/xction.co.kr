/**
 * 헤더에 포함되는 로그인 버튼입니다. (디자인팀과 협의 후 보완 예정, 아직 사용 불가)
 */

import styles from "./ButtonLogin.module.css";
import typography from "@/styles/typography.module.css";

type ButtonProps = {
  content: string;
};

export default function ButtonLogin({ content }: ButtonProps) {
  return (
    <button className={`${styles.button} ${typography.h5}`}>{content}</button>
  );
}
