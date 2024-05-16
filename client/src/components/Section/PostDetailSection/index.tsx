/**
 * Community Detail 페이지에 들어가는 PostDetailSection 컴포넌트입니다.
 */

import { Post } from "@core/entity/post";

import typography from "@styles/typography.module.css";
import styles from "./PostDetailSection.module.css";

import Tag from "@components/Tag";
import LikeButton from "@components/Button/LikeButton";
import Line from "@components/Line";

type PostDetailSectionProps = {
  data: Post;
};

export default function PostDetailSection({ data }: PostDetailSectionProps) {
  const parsedTime = `${data.createdTime.getFullYear()}.${(data.createdTime.getMonth() + 1).toString().padStart(2, "0")}.${data.createdTime.getDate().toString().padStart(2, "0")}`;
  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.titleUpperContainer}>
            <h4 className={typography.h4}>{data.title}</h4>
            {data.tags.map((tag, index) => {
              return <Tag data={tag} key={index} />;
            })}
          </div>
          <div className={styles.titleLowerContainer}>
            <p className={typography.subTitle1}>조회수 {data.viewsCount}</p>
            <p className={typography.subTitle1}>{parsedTime}</p>
            <p className={typography.subTitle1}>{data.createdUser.name}</p>
          </div>
        </div>
        <div className={styles.lineContainer}>
          <Line />
        </div>
        <div className={styles.contentContainer}>
          <h6 className={typography.h6}>{data.content}</h6>
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div className={styles.likeContainer}>
          <LikeButton />
          <h5 className={typography.h5}>{data.likesCount}</h5>
        </div>
      </div>
    </div>
  );
}
