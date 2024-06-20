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
    // contentEditable로 인해 생기는 styles 속성들을 제거합니다.
    const cleanStyles = (htmlString: string): string => {
      const doc = new DOMParser().parseFromString(htmlString, "text/html");
      doc.body.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("style");
      });
      return doc.body.innerHTML;
    };
    const cleanedData = cleanStyles(data);

    fetch("http://localhost:8080/articles", {
      method: "POST",
      body: JSON.stringify({ content: cleanedData }),
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
          <div
            contentEditable="true"
            suppressContentEditableWarning
            onInput={(e) => {
              e.target instanceof HTMLDivElement && setData(e.target.innerHTML);
            }}
          >
            텍스트를 입력하세요. . .
          </div>
          <button onClick={onSubmit}>전송</button>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
