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

export default function Tag({ data }: TagProps) {
  return (
    <div className={`${styles.container} ${styles[data.color]}`}>
      <div className={typography.subTitle2}>{data.name}</div>
    </div>
  );
}
