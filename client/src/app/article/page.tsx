"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import typography from "../../../styles/typography.module.css";
import ArticleCard from "@/components/Card/ArticleCard";
import "./Article.css";

export default function Work() {
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
