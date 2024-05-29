"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import typography from "../../../styles/typography.module.css";
import ArticleCard from "@/components/Card/ArticleCard";
import "./Collection.css";

export default function Collection() {
  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>

      <div className="first-container">
        <div className="first-title">아티클 모아보기</div>
        <div className="first-article-container">
          {articleList.map((article, index) => (
            <div className="article-small">
              <ArticleCard key={index} data={article} />
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

const articleList = [
  { photoUrl: "", description: "Article 1", createdAt: "2024.01.02" },
  { photoUrl: "", description: "Article 2", createdAt: "2024.01.03" },
  { photoUrl: "", description: "Article 3", createdAt: "2024.01.04" },
  { photoUrl: "", description: "Article 1", createdAt: "2024.01.02" },
  { photoUrl: "", description: "Article 2", createdAt: "2024.01.03" },
  { photoUrl: "", description: "Article 3", createdAt: "2024.01.04" },
  { photoUrl: "", description: "Article 1", createdAt: "2024.01.02" },
  { photoUrl: "", description: "Article 2", createdAt: "2024.01.03" },
  { photoUrl: "", description: "Article 3", createdAt: "2024.01.04" },
  { photoUrl: "", description: "Article 1", createdAt: "2024.01.02" },
  { photoUrl: "", description: "Article 2", createdAt: "2024.01.03" },
  { photoUrl: "", description: "Article 3", createdAt: "2024.01.04" },
];
