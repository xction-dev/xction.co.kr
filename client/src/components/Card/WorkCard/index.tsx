/* eslint-disable @next/next/no-img-element */
import styles from "./WorkCard.module.css";
import typography from "../../../styles/typography.module.css";
import { Work } from "@core/entity/work";

type WorkProps = {
  //data: Work;
  data: {
    thumbnailImage: string;
    title: string;
    tags: string[];
  };
};

export default function WorkCard({ data }: WorkProps) {
  return (
    <div className={styles.workCard}>
      <div className={styles.workThumbnail}>
        {data.thumbnailImage ? (
          <img src={data.thumbnailImage} alt="photo" />
        ) : (
          <p>Image Url</p>
        )}
      </div>
      <div className={styles.workTitle}>
        <h3 className={typography.h3}>{data.title}</h3>
      </div>
      <div className={styles.workTags}>
        {data.tags.map((tag, tagIndex) => (
          <div key={tagIndex} className={styles.tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
