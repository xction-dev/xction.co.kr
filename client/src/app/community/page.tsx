"use client";

import Header from "@/components/Header";
import TrendingCardLong from "@/components/Card/TrendingCardLong";
import Input from "@/components/Input";
import PostListCard from "@/components/Card/PostListCard";
import Footer from "@/components/Footer";
import "./Community.css";

export default function Community() {
  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <div className="TrendingCardContainer">
          <TrendingCardLong data={sampleTrendingData} />
        </div>
        <div className="InputFieldContainer">
          <Input inputType="write" />
        </div>
        <div className="PostListCardContainer">
          <PostListCard data={samplePostData} />
        </div>
      </div>  
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

// 서버 데이터로 대체 예정입니다.
const sampleTrendingData = [
  {
    title: "지원 사업 관련 질문 있습니다!",
    tags: [{
      name: "정보",
    },],
    viewsCount: 5000,
    createdTime: new Date("2021-08-01"),
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    tags: [{
      name: "정보",
    },],
    viewsCount: 5000,
    createdTime: new Date("2021-08-01"),
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    tags: [{
      name: "정보",
    },],
    viewsCount: 5000,
    createdTime: new Date("2021-08-01"),
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    tags: [{
      name: "정보",
    },],
    viewsCount: 5000,
    createdTime: new Date("2021-08-01"),
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    tags: [{
      name: "정보",
    },],
    viewsCount: 5000,
    createdTime: new Date("2021-08-01"),
  },
];

// 서버 데이터로 대체 예정입니다.
const samplePostData = [
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    postType: "Information",
    likesCount: 20,
    viewsCount: 100,
    commentsCount: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: {
      name: "날아오르는 고라파덕",
    },
    tags: [{
      name: "정보",
    },
  {
    name: "월간Best",
  }],
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    postType: "Information",
    likesCount: 20,
    viewsCount: 100,
    commentsCount: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: {
      name: "날아오르는 고라파덕",
    },
    tags: [{
      name: "정보",
    },],
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    postType: "Information",
    likesCount: 20,
    viewsCount: 100,
    commentsCount: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: {
      name: "날아오르는 고라파덕",
    },
    tags: [{
      name: "정보",
    },],
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    postType: "Information",
    likesCount: 20,
    viewsCount: 100,
    commentsCount: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: {
      name: "날아오르는 고라파덕",
    },
    tags: [{
      name: "정보",
    },],
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    postType: "Information",
    likesCount: 20,
    viewsCount: 100,
    commentsCount: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: {
      name: "날아오르는 고라파덕",
    },
    tags: [{
      name: "정보",
    },],
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    postType: "Information",
    likesCount: 20,
    viewsCount: 100,
    commentsCount: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: {
      name: "날아오르는 고라파덕",
    },
    tags: [{
      name: "정보",
    },],
  },
  
];