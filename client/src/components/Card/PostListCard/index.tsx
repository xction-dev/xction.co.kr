/**
 * 커뮤니티의 Post List를 보여주는 게시판 컴포넌트입니다.
 *
 */

import styles from "./PostListCard.module.css";

import Tag from "../../Tag";
import { TagText } from "../../Tag";

type PostItem = {
  title: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  createdTime: Date;
  createdUser: string;
  tag: TagText;
};

export default function PostListCard({ data }: PostListCardProps) {
  return (
    <div className={styles.container}>
      {data.map((post, index) => (
        <div className={styles.postItemContainer} key={index}></div>
      ))}
    </div>
  );
}
