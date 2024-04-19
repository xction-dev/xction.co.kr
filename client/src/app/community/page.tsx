"use client";

import Header from "@/components/Header";
import TrendingCardLong from "@/components/Card/TrendingCardLong";
import "./Community.css";

export default function Community() {
  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <TrendingCardLong data={sampleTrendingData} />
      </div>  
    </div>
  );
}


const sampleTrendingData = [
  {
    title: "1위 포스트",
    views: 5000,
    tag: "태그",
    date: new Date("2021-08-01"),
  },
  {
    title: "2위 포스트",
    views: 4000,
    tag: "태그",
    date: new Date("2021-08-01"),
  },
  {
    title: "3위 포스트",
    views: 3000,
    tag: "태그",
    date: new Date("2021-08-01"),
  },
  {
    title: "4위 포스트",
    views: 2000,
    tag: "태그",
    date: new Date("2021-08-01"),
  },
  {
    title: "5위 포스트",
    views: 1000,
    tag: "태그",
    date: new Date("2021-08-01"),
  },
];