/**
 * Community Post를 작성할 때 태그를 선택하는 드롭다운 컴포넌트입니다.
 */

import styles from "./TagDropdown.module.css";
import Tag from "@components/Tag";

const TagMockData = [
  {
    id: 1,
    name: "정보",
  },
  {
    id: 2,
    name: "홍보",
  },
  {
    id: 1,
    name: "자유",
  },
  {
    id: 1,
    name: "한줄평",
  },
];

export default function TagDropdown() {
  return (
    <div className={styles.container}>
      <button>
        <Tag data={TagMockData[0]} />
      </button>
      <button>
        <Tag data={TagMockData[1]} />
      </button>
      <button>
        <Tag data={TagMockData[2]} />
      </button>
      <button>
        <Tag data={TagMockData[3]} />
      </button>
    </div>
  );
}
