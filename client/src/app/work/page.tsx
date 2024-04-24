"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkCardList from "@/components/Card/WorkCardList";
import typography from "../../../styles/typography.module.css";
import "./Work.css";

export default function Work() {
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
        <WorkCardList data={sampleWorkList} title={"새로운 작품"} />
        <WorkCardList data={sampleWorkList} title={"AR/VR"} />
        <WorkCardList data={sampleWorkList} title={"Xction"} />
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
