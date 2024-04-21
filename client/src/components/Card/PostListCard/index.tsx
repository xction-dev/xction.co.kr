/**
 * 커뮤니티의 Post List를 보여주는 게시판 컴포넌트입니다.
 *
 */

import { Post } from "@core/entity/post";

import typography from "../../../styles/typography.module.css";
import styles from "./PostListCard.module.css";

import Tag from "../../Tag";
import LikeIcon from "../../Icon/LikeIcon";
import CommentIcon from "../../Icon/CommentIcon";
import Line from "../../Line";

type PostListCardProps = {
  data: Post[];
};

export default function PostListCard({ data }: PostListCardProps) {
  return (
    <div className={styles.container}>
      {data.map((post, index) => (
        <>
          <div className={styles.postItemContainer} key={index}>
            {/* 상단 컨테이너: 제목, 태그 */}
            <div className={styles.upperContainer}>
              <h5 className={typography.h5}>{post.title}</h5>
              {post.tags.map((tag, index) => {
                return <Tag data={tag} key={index} />;
              })}
            </div>
            <div className={styles.contentContainer}>
              <h6 className={typography.h6}>{post.content.slice(0, 100)}</h6>
            </div>
            {/* 하단 컨테이너: 좋아요, 댓글, 작성자, 작성시간 */}
            <div className={styles.lowerContainer}>
              <div className={styles.likesContainer}>
                <LikeIcon />
                <p className={typography.subTitle1}>{post.likesCount}</p>
              </div>
              <div className={styles.commentsContainer}>
                <CommentIcon />
                <p className={typography.subTitle1}>{post.commentsCount}</p>
              </div>
              <p className={typography.subTitle1}>|</p>
              {/* 우선 날짜 그대로 넣어두고, parse는 추후 작업하겠습니다. */}
              <p className={typography.subTitle1}>
                {`${post.createdTime.getFullYear()}.${(post.createdTime.getMonth() + 1).toString().padStart(2, "0")}.${post.createdTime.getDate().toString().padStart(2, "0")}`}
              </p>
              <p className={typography.subTitle1}>{post.createdUser.name}</p>
            </div>
          </div>
          <div className={styles.lineContainer}>
            <Line />
          </div>
        </>
      ))}
    </div>
  );
}
