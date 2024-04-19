/**
 * 커뮤니티에 쓰일 태그 컴포넌트입니다.
 * name을 props로 받아서 태그를 렌더링합니다.
 */

import typography from "../../styles/typography.module.css";
import styles from "./Tag.module.css";

export type TagText =
  | "정보"
  | "홍보"
  | "자유"
  | "한줄평"
  | "주간Best"
  | "월간Best"
  | "실시간🔥";

type TagProps = {
  name: TagText;
};

const tagColor = {
  정보: "purple",
  홍보: "pink",
  자유: "blue",
  한줄평: "navy",
  주간Best: "green",
  월간Best: "mint",
  "실시간🔥": "orange",
};

export default function Tag({ name }: TagProps) {
  const color = tagColor[name];
  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <div className={typography.subTitle2}>{name}</div>
    </div>
  );
}
