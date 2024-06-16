"use client";

import "./ArticleDetail.css";
import Header from "@components/Header";

import Footer from "@components/Footer";
import { useEffect, useState } from "react";
import { z } from "zod";

type ArticleDetailProps = {
  params: {
    articleId: number;
  };
};

export default function ArticleDetail(props: ArticleDetailProps) {
  const id = props.params.articleId;
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/articles/" + id)
      .then((res) => res.json())
      .then(z.object({ content: z.string() }).parse)
      .then(({ content }) => setResult(content));
  }, []);

  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>
      <div className="body">{result}</div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

// 서버 데이터로 대체 예정입니다.
const samplePostData = {
  id: 1,
  title: "지원 사업 관련 질문 있습니다!",
  content:
    "나무들이 서로 속삭이는 듯한 소리가 숲속을 가득 채우고 있었다. 간간히 부는 바람이 나뭇잎을 흔들며, 그 소리는 마치 오래된 이야기를 들려주는 것 같았다. 이 숲의 한가운데서, 한 소년이 고개를 들어 하늘을 바라보았다. 햇빛이 나뭇가지 사이로 비치며, 그의 얼굴에 따스한 빛을 더했다. 소년은 숲이 주는 평화로움 속에서 잠시의 여유를 즐기며, 모험을 꿈꾸었다. 이 순간, 그는 어떠한 걱정도, 두려움도 잊고 오직 순수한 기쁨을 느끼며, 자연과 하나가 되었다.",
  postType: "INFORMATION" as const,
  likesCount: 20,
  viewsCount: 100,
  commentsCount: 5,
  createdTime: new Date("2021-08-01"),
  lastModifiedTime: new Date("2021-08-01"),
  createdUser: {
    id: 1,
    name: "날아오르는 고라파덕",
    thumbnailImage: null,
  },
  tags: [
    {
      id: 1,
      name: "정보",
    },
    {
      id: 2,
      name: "월간Best",
    },
  ],
};

const sampleCommentData = [
  {
    id: 1,
    content: "너무 좋은 글이네요! 감사합니다.",
    likesCount: 20,
    createdTime: new Date("2021-08-01"),
    lastModifiedTime: new Date("2021-08-01"),
    createdUser: {
      id: 1,
      name: "날아오르는 고라파덕",
      thumbnailImage: null,
    },
  },
  {
    id: 2,
    content: "너무 좋은 글이네요! 감사합니다.",
    likesCount: 20,
    createdTime: new Date("2021-08-01"),
    lastModifiedTime: new Date("2021-08-01"),
    createdUser: {
      id: 1,
      name: "날아오르는 고라파덕",
      thumbnailImage: null,
    },
  },
  {
    id: 3,
    content: "너무 좋은 글이네요! 감사합니다.",
    likesCount: 20,
    createdTime: new Date("2021-08-01"),
    lastModifiedTime: new Date("2021-08-01"),
    createdUser: {
      id: 1,
      name: "날아오르는 고라파덕",
      thumbnailImage: null,
    },
  },
];
