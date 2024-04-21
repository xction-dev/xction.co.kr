/**
 * 실시간 인기글을 보여주는 카드 컴포넌트입니다.
 * 추후 고정된 전체 width 값을 반응형으로 구현하며, 태그 작업이 필요합니다.
 */

import { PostTrending } from "@core/entity/post/trending";

import typography from "../../../styles/typography.module.css";
import styles from "./TrendingCardLong.module.css";

import Tag from "../../Tag";

type TrendingCardProps = {
  data: PostTrending[];
};

export default function TrendingCardLong({ data }: TrendingCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h4 className={typography.h4}>실시간 인기글</h4>
      </div>
      <div className={styles.postContainer}>
        {data.map((post, index) => (
          <div className={styles.postItemContainer} key={index}>
            <div className={styles.postInfoContainer}>
              <h5 className={typography.h5}>{index + 1}</h5>
              <a href="">
                <h5 className={typography.h5}>{post.title}</h5>
              </a>
              {post.tags.map((tag, index) => {
                return <Tag data={tag} key={index} />;
              })}
            </div>
            <div className={styles.postViewsDateContainer}>
              <h6 className={typography.h6}>{`${
                post.viewsCount
              }회 | ${post.createdTime.getFullYear()}.${(
                post.createdTime.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}.${post.createdTime
                .getDate()
                .toString()
                .padStart(2, "0")}`}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
