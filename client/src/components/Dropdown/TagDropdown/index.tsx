/**
 * Community Post를 작성할 때 태그를 선택하는 드롭다운 컴포넌트입니다.
 */

import styles from "./TagDropdown.module.css";
import Tag from "@components/Tag";
import { Tag as TagType } from "@core/entity/tag";

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
    id: 3,
    name: "자유",
  },
  {
    id: 4,
    name: "한줄평",
  },
];

type TagDropdownProps = {
  setIsDropDownOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<TagType>>;
};

export default function TagDropdown({
  setIsDropDownOpened,
  setSelectedTag,
}: TagDropdownProps) {
  const handleClick = (index: number) => {
    setSelectedTag(TagMockData[index]);
    setIsDropDownOpened(false);
  };

  return (
    <div className={styles.container}>
      {TagMockData.map((tag, index) => (
        <button type="button" key={tag.id} onClick={() => handleClick(index)}>
          <Tag data={tag} />
        </button>
      ))}
    </div>
  );
}
