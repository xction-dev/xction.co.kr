/**
 * input 버튼을 누르면 나타나는 PostInput 컴포넌트입니다.
 */

import styles from "./PostInput.module.css";
import typography from "@styles/typography.module.css";
import { Post } from "@core/entity/post";
import Tag from "@components/Tag";
import { Tag as TagType } from "@core/entity/tag";
import { useState } from "react";
import BasicButton from "@components/Button/BasicButton";
import Line from "@components/Line";
import TagDropdown from "@components/Dropdown/TagDropdown";

type PostInputProps = {
  post: Post;
};

export default function PostInput() {
  const [body, setBody] = useState(true);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className={styles.container}>
      <form className={styles.form} action="">
        <div className={styles.inputContainer}>
          <button
            type="button"
            className={`${styles.input} ${typography.h6}`}
            onClick={() => {
              setIsDropdownOpened(!isDropdownOpened);
            }}
          >
            {selectedTag ? <Tag data={selectedTag} /> : "카테고리"}
          </button>
          {isDropdownOpened && (
            <div className={styles.dropdown}>
              <TagDropdown
                setIsDropDownOpened={setIsDropdownOpened}
                setSelectedTag={setSelectedTag}
              />
            </div>
          )}
          <Line />
          <input
            className={`${styles.title} ${typography.h6}`}
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Line />
          <textarea
            className={`${styles.textarea} ${typography.h6}`}
            placeholder="내용"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <BasicButton color="black" content="올리기" />
        </div>
      </form>
    </div>
  );
}
