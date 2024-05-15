"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkCardList from "@/components/Card/WorkCardList";
import typography from "../../../styles/typography.module.css";
import "./WorkDetail.css";

export default function WorkDetail() {
  return (
    <div className="page">
      <div className="header">
        <Header />
      </div>

      <div className="first-container">
        <img src="" className="image" />
        <span className="placeholder">Image goes Here</span>
      </div>
      <div className="second-container">
        <span className={typography.h5}>
          조소과 졸업전시 마지막 크리틱날 아침, 과 수석 기현의 조각이 처참히
          부서진 채 발견된다.
          <br />
          피를 흘리듯 페인트 칠갑이 되어있는 조각. 범인의 손자국이 선명하게 남은
          조각의 얼굴은 어디론가 사라졌다.
          <br />이 작업실에 들어 올 수 있는 사람은 여기 모인 학생들 뿐. 이 안에
          범인이 있다.
        </span>
        <span className={typography.h5}>
          {"<"}졸업전시회{">"}는 인터랙티브 영화로, PC와 모바일에서 모두
          감상하실 수 있습니다.
          <br />
          작품을 온전하게 즐기기 위해 감상 시 핸드폰을 준비해주시기 바랍니다.
        </span>
      </div>
      <div className="third-container">
        <span className="third-title">크레딧</span>
        <div className="third-credit"></div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

const sampleWorkList = [
  {
    title: "졸업전시회",
    image: "",
    tag: ["Xction 오리지널", "Xction 오리지널"],
    createdTime: new Date("2022-02-02"),
    createdUser: "xction",
  },
  {
    title: "졸업전시회",
    image: "",
    tag: ["Xction 오리지널", "Xction 오리지널"],
    createdTime: new Date("2022널02-02"),
    createdUser: "xction",
  },
  {
    title: "졸업전시회",
    image: "",
    tag: ["Xction 오리지널", "Xction 오리지널"],
    createdTime: new Date("2022-02-02"),
    createdUser: "xction",
  },
  {
    title: "졸업전시회",
    image: "",
    tag: ["Xction 오리지널", "Xction 오리지널"],
    createdTime: new Date("2022-02-02"),
    createdUser: "xction",
  },
];
