/**
 * 커뮤니티에 쓰일 태그 컴포넌트입니다.
 * name을 props로 받아서 태그를 렌더링합니다.
 */

import { Tag as TagType } from "@core/entity/tag";

import typography from "../../styles/typography.module.css";
import styles from "./Tag.module.css";

type TagProps = {
  data: TagType;
};

type TagColor = {
  [key: string]: string;
};

const tagColor: TagColor = {
  정보: "purple",
  홍보: "pink",
  자유: "blue",
  한줄평: "navy",
  주간Best: "green",
  월간Best: "mint",
  "실시간🔥": "orange",
};

export default function Tag({ data }: TagProps) {
  const color = tagColor[data.name];
  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <div className={typography.subTitle2}>{data.name}</div>
    </div>
  );
}
