/**
 * input 버튼을 누르면 나타나는 CommentInput 컴포넌트입니다.
 */

import styles from "./CommentInput.module.css";
import typography from "@styles/typography.module.css";
import { useState } from "react";
import BasicButton from "@components/Button/BasicButton";

import { PostComment } from "@core/entity/comment/post";

type CommentInputProps = {
  comment: PostComment;
};

export default function CommentInput() {
  const [content, setContent] = useState("");

  return (
    <div className={styles.container}>
      <form className={styles.form} action="">
        <textarea
          className={`${styles.textarea} ${typography.h6}`}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <BasicButton color="black" content="올리기" />
        </div>
      </form>
    </div>
  );
}
