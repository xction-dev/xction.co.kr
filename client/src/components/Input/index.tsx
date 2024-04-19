/**
 * 다양한 Input 값을 받는 Input Field 컴포넌트입니다.
 * inputType을 파라미터로 받습니다.
 */

import styles from "./Input.module.css";
import typography from "../../styles/typography.module.css";
import SearchIcon from "@/components/Icon/SearchIcon";
import WriteIcon from "@/components/Icon/WriteIcon";

type InputType = "email" | "password" | "write" | "search";

type InputProps = {
  inputType: InputType;
};

const placeholder = {
  email: "이메일",
  password: "비밀번호",
  write: "새 글을 작성해 보세요!",
  search: "검색어를 입력해주세요!",
};

export default function Input({ inputType }: InputProps) {
  return (
    <div className={styles.container}>
      <input
        className={`${styles.input} ${styles[inputType]} ${typography.h6}`}
        placeholder={placeholder[inputType]}
      />
      {inputType === ("write" || "search") && (
        <div className={styles.icon}>
          {inputType === "write" ? <WriteIcon /> : <SearchIcon />}
        </div>
      )}
    </div>
  );
}
