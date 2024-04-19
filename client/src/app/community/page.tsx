"use client";

import Header from "@/components/Header";
import TrendingCardLong from "@/components/Card/TrendingCardLong";
import Input from "@/components/Input";
import PostListCard from "@/components/Card/PostListCard";
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
    </div>
  );
}


const sampleTrendingData = [
  {
    title: "1위 포스트",
    views: 5000,
    tag: "정보",
    date: new Date("2021-08-01"),
  },
  {
    title: "2위 포스트",
    views: 4000,
    tag: "자유",
    date: new Date("2021-08-01"),
  },
  {
    title: "3위 포스트",
    views: 3000,
    tag: "한줄평",
    date: new Date("2021-08-01"),
  },
  {
    title: "4위 포스트",
    views: 2000,
    tag: "월간Best",
    date: new Date("2021-08-01"),
  },
  {
    title: "5위 포스트",
    views: 1000,
    tag: "실시간🔥",
    date: new Date("2021-08-01"),
  },
];

const samplePostData = [
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    likes: 20,
    comments: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: "날아오르는 고라파덕",
    tag: "정보",
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    likes: 20,
    comments: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: "날아오르는 고라파덕",
    tag: "정보",
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    likes: 20,
    comments: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: "날아오르는 고라파덕",
    tag: "정보",
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    likes: 20,
    comments: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: "날아오르는 고라파덕",
    tag: "정보",
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    likes: 20,
    comments: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: "날아오르는 고라파덕",
    tag: "정보",
  },
  {
    title: "지원 사업 관련 질문 있습니다!",
    content: "OO 지원 사업 이번에 지원하시는 분 있나요? 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 국가의 세입·세출의 결산, 국가 및 법률이 정한...",
    likes: 20,
    comments: 5,
    createdTime: new Date("2021-08-01"),
    createdUser: "날아오르는 고라파덕",
    tag: "정보",
  },
];