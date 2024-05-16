/**
 * 단일 코멘트를 출력하는 CommentSection 컴포넌트입니다.
 * Work Page의 한줄평에서 재사용하기 위해 분리했습니다.
 */

import styles from "./CommentSection.module.css";
import { PostComment } from "@core/entity/comment/post";
import ProfileIcon from "@components/Icon/ProfileIcon";
import LikeIcon from "@components/Icon/LikeIcon";
import typography from "@styles/typography.module.css";
import { buttonBaseClasses } from "@mui/material";

type CommentSectionProps = {
  comment: PostComment;
  isMine: boolean;
};

export default function CommentSection({
  comment,
  isMine,
}: CommentSectionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.profileContainer}>
          <ProfileIcon />
          <h6 className={typography.h6}>{comment.createdUser.name}</h6>
        </div>
        <div className={styles.functionContainer}>
          <div className={typography.subTitle1}>
            {isMine ? (
              <div className={styles.mineButtonContainer}>
                <button className={styles.functionButton}>수정</button>
                <button className={styles.functionButton}>삭제</button>
              </div>
            ) : (
              <button className={styles.functionButton}>신고</button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <p className={typography.h6}>{comment.content}</p>
      </div>
      <div className={styles.lowerContainer}>
        <div className={styles.timeContainer}>
          <p className={typography.subTitle2}>
            {`${comment.createdTime.getFullYear()}.${(comment.createdTime.getMonth() + 1).toString().padStart(2, "0")}.${comment.createdTime.getDate().toString().padStart(2, "0")}`}
          </p>
        </div>
        <div className={styles.likeContainer}>
          <button className={styles.likeButton}>
            <LikeIcon />
          </button>
          <p className={typography.subTitle2}>{comment.likesCount}</p>
        </div>
      </div>
    </div>
  );
}
