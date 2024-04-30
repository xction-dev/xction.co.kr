/**
 * input 버튼을 누르면 나타나는 PostInput 컴포넌트입니다.
 */

import styles from "./PostInput.module.css";
import typography from "@styles/typography.module.css";
import { Post } from "@core/entity/post";
import Tag from "@components/Tag";
import { useState } from "react";
import BasicButton from "@components/Button/BasicButton";
import Line from "@components/Line";

type PostInputProps = {
  post: Post;
};

export default function PostInput() {
  return (
    <div className={styles.container}>
      <form className={styles.form} action="">
        <div className={styles.inputContainer}>
          <button className={`${styles.input} ${typography.h6}`}>
            카테고리
          </button>
          <Line />
          <input
            className={`${styles.title} ${typography.h6}`}
            placeholder="제목"
          />
          <Line />
          <textarea
            className={`${styles.textarea} ${typography.h6}`}
            placeholder="내용"
          />
        </div>
        <div className={styles.buttonContainer}>
          <BasicButton color="black" content="올리기" />
        </div>
      </form>
    </div>
  );
}
