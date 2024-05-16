/* eslint-disable @next/next/no-img-element */
import styles from "./ArticleCard.module.css";
// import { Article } from "@core/entity/article";
import typography from "../../../styles/typography.module.css";

type ArticleProps = {
  // data: Article[];
  // entity에 필요한 필드가 아직 없어서 우선 임시로 만들었습니다
  data: {
    photoUrl: string;
    description: string;
    createdAt: string;
  };
};

export default function ArticleCard({ data }: ArticleProps) {
  const { photoUrl, description, createdAt } = data;
  return (
    <div className={styles.articleContainer}>
      <div className={styles.photoContainer}>
        {photoUrl ? <img src={photoUrl} alt="photo" /> : <p>Image Url</p>}
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionContent}>
          <h5 className={`${typography.h5} ${styles.descriptionText}`}>
            {description}
          </h5>
          <h6 className={typography.h6}>{createdAt}</h6>
        </div>
      </div>
    </div>
  );
}
