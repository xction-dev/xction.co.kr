import typography from "../../../styles/typography.module.css";
import styles from "./WorkCardList.module.css";

type WorkCard = {
  title: string;
  image: string;
  createdTime: Date;
  createdUser: string;
  tag: string[];
};

type WorkCardListProps = {
  data: WorkCard[];
  title: string;
};

export default function WorkCardList({ data, title }: WorkCardListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        <div className={styles.click}>더보기</div>
      </div>
      <div className={styles.content}>
        {data.map((work, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.itemPicture}>
              {work.image ? (
                <img src={work.image} className={styles.image} />
              ) : (
                <span className={styles.placeholder}>Image goes here</span>
              )}
            </div>
            <div className={styles.itemTitle}>
              <h3>{work.title}</h3>
            </div>
            <div className={styles.itemTag}>
              {work.tag.map((tag, tagIndex) => (
                <div key={tagIndex} className={styles.tag}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
