/**
 * Community Post 상세보기에 있는 코멘트 리스트 컴포넌트 입니다.
 */

import styles from "./CommentListCard.module.css";
import CommentSection from "@components/Section/CommentSection";
import Line from "@components/Line";
import { PostComment } from "@core/entity/comment/post";

type CommentListCardProps = {
  data: PostComment[];
};

export default function CommentListCard({ data }: CommentListCardProps) {
  return (
    <div className={styles.container}>
      {data.map((comment, index) => (
        <>
          <div className={styles.commentItemContainer} key={index}>
            <CommentSection comment={comment} isMine={false} />
          </div>
          <div className={styles.lineContainer}>
            <Line />
          </div>
        </>
      ))}
    </div>
  );
}
