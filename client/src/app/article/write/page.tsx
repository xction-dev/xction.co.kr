"use client";

import "./ArticleWrite.css";
import Header from "@components/Header";

import Footer from "@components/Footer";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import typography from "@styles/typography.module.css";

export default function ArticleWrite() {
  const [data, setData] = useState("");
  const router = useRouter();

  const onSubmit = useCallback(() => {
    fetch("http://localhost:8080/articles", {
      method: "POST",
      body: JSON.stringify({ content: data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        z.object({
          insertedId: z.number(),
        }).parse,
      )
      .then(({ insertedId }) => router.push(`/article/${insertedId}`));
  }, [data, router]);

  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <div className={typography.h4}>
          <input value={data} onChange={(e) => setData(e.target.value)} />
          <button onClick={onSubmit}>전송</button>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
