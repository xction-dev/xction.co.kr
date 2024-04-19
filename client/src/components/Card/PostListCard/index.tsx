/**
 * 커뮤니티의 Post List를 보여주는 게시판 컴포넌트입니다.
 *
 */

import typography from "../../../styles/typography.module.css";
import styles from "./PostListCard.module.css";

import Tag from "../../Tag";
import { TagText } from "../../Tag";
import LikeIcon from "../../Icon/LikeIcon";
import CommentIcon from "../../Icon/CommentIcon";
import Line from "../../Line";

type PostItem = {
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdTime: Date;
  createdUser: string;
  tag: TagText;
};

type PostListCardProps = {
  data: PostItem[];
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
              <Tag name={post.tag} />
            </div>
            <div className={styles.contentContainer}>
              <h6 className={typography.h6}>{post.content}</h6>
            </div>
            {/* 하단 컨테이너: 좋아요, 댓글, 작성자, 작성시간 */}
            <div className={styles.lowerContainer}>
              <div className={styles.likesContainer}>
                <LikeIcon />
                <p className={typography.subTitle1}>{post.likes}</p>
              </div>
              <div className={styles.commentsContainer}>
                <CommentIcon />
                <p className={typography.subTitle1}>{post.comments}</p>
              </div>
              <p className={typography.subTitle1}>|</p>
              <p className={typography.subTitle1}>
                {post.createdTime.getFullYear()}
              </p>
              <p className={typography.subTitle1}>{post.createdUser}</p>
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
