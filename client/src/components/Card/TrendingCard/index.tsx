import typography from "../../../styles/typography.module.css";
import styles from "./TrendingCard.module.css";

type TrendingPost = {
  title: string;
  views: number;
};

type TrendingCardProps = {
  data: TrendingPost[];
};

export default function TrendingCard({ data }: TrendingCardProps) {
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
            </div>
            <div className={styles.postViewsContainer}>
              <h6 className={typography.h6}>{`${post.views}회`}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
