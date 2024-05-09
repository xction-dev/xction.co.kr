"use client";

/**
 * Community 탭에 있는 글쓰기 버튼입니다.
 * 버튼을 누르면 input field가 나타납니다.
 */

import styles from "./PostWriteButton.module.css";
import typography from "../../../styles/typography.module.css";
import WriteIcon from "../../Icon/WriteIcon";
import { useState } from "react";
import PostInput from "@/components/Input/PostInput";

export default function PostWriteButton() {
  const [writeMode, setWriteMode] = useState(false);

  return (
    <>
      {!writeMode ? (
        <button
          className={`${styles.button}`}
          onClick={() => setWriteMode(true)}
        >
          <h6 className={typography.h6}>새 글을 작성해 보세요!</h6>
          <div className={styles.icon}>
            <WriteIcon />
          </div>
        </button>
      ) : (
        <PostInput />
      )}
    </>
  );
}
