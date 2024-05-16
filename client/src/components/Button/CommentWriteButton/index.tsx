"use client";

/**
 * Community 탭에 있는 댓글쓰기 버튼입니다.
 * 버튼을 누르면 input field가 나타납니다.
 */

import styles from "./CommentWriteButton.module.css";
import typography from "@styles/typography.module.css";
import WriteIcon from "@components/Icon/WriteIcon";
import CommentInput from "@components/Input/CommentInput";
import { useState } from "react";
// import CommentInput from "@components/Input/CommentInput";

export default function CommentWriteButton() {
  const [writeMode, setWriteMode] = useState(false);

  return (
    <>
      {!writeMode ? (
        <button
          className={`${styles.button}`}
          onClick={() => setWriteMode(true)}
        >
          <h6 className={typography.h6}>댓글을 작성해 보세요!</h6>
          <div className={styles.icon}>
            <WriteIcon />
          </div>
        </button>
      ) : (
        <CommentInput />
      )}
    </>
  );
}
