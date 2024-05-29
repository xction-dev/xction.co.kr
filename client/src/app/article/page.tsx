"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import typography from "../../../styles/typography.module.css";
import ArticleCard from "@/components/Card/ArticleCard";
import "./Article.css";

export default function Article() {
  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>

      <div className="first-container">
        <div className="first-title">액티클</div>
        <div className="first-article-container">
          <ArticleCard data={sampleData} />
        </div>
      </div>

      <div className="second-container">
        <div className="second-title">새로운 아티클</div>
        <div className="second-article-container">
          {articleList.map((article, index) => (
            <div className="article-small">
              <ArticleCard key={index} data={article} />
            </div>
          ))}
        </div>
      </div>

      <div className="second-container">
        <div className="second-title">액션's Pick</div>
        <div className="second-article-container">
          {articleList.map((article, index) => (
            <div className="article-small">
              <ArticleCard key={index} data={article} />
            </div>
          ))}
        </div>
      </div>

      <div className="second-container">
        <div className="second-title">인기 아티클</div>
        <div className="second-article-container">
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

const sampleData = {
  photoUrl: "",
  description: "아티클 제목 두 줄 고정 아티클 제목 두 줄 고정...",
  createdAt: "2024.01.01",
};

const articleList = [
  { photoUrl: "", description: "Article 1", createdAt: "2024.01.02" },
  { photoUrl: "", description: "Article 2", createdAt: "2024.01.03" },
  { photoUrl: "", description: "Article 3", createdAt: "2024.01.04" },
];
