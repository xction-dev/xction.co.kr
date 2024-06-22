"use client";

import "./ArticleDetail.css";
import Header from "@components/Header";

import Footer from "@components/Footer";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";
import typography from "@styles/typography.module.css";

type ArticleDetailProps = {
  params: {
    articleId: number;
  };
};

export default function ArticleDetail(props: ArticleDetailProps) {
  const id = props.params.articleId;
  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/articles/" + id)
      .then((res) => res.json())
      .then(z.object({ content: z.string() }).parse)
      .then(({ content }) => {
        if (textBoxRef.current) {
          textBoxRef.current.innerHTML = content;
        }
      });
  }, []);

  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <div ref={textBoxRef} className={typography.h3}></div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
