"use client";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Wip from "@/components/Wip";
import TrendingCard from "@/components/Card/TrendingCard";
import ValueCard from "@/components/Card/ValueCard";
import DevSection from "@/modules/dev/DevSection";
import styled from "@emotion/styled";
import Lottie from "lottie-react";
import logoAnimation from "../../../public/logo_animation.json";
import { useEffect } from "react";
import layout from "../../styles/layout";

export default function Dev() {
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.text())
      .then(console.log);
  }, []);

  return (
    <Main>
      <Title>COMPONENTS</Title>
      <DevSection title="Heading">
        <Heading.H1>H1: 가장 큰 제목입니다</Heading.H1>
        <Heading.H2>H2: 큰 제목입니다</Heading.H2>
        <Heading.H3>H3: 중간 제목입니다</Heading.H3>
        <Heading.H4>H4: 작은 제목입니다</Heading.H4>
        <Heading.H5>H5: 아주 작은 제목입니다</Heading.H5>
        <Heading.H6>H6: 가장 작은 제목입니다</Heading.H6>
      </DevSection>
      <DevSection title="Button" isWhiteMode>
        <Button.Black>업적 확인하기</Button.Black>
        <Button.White>보러가기</Button.White>
        <Button.Capsule>마이페이지</Button.Capsule>
        <Button.Text>Text</Button.Text>
      </DevSection>
      <DevSection title="Text Input"></DevSection>
      <DevSection title="TrendingCard">
        <TrendingCard data={sampleTrendingData}></TrendingCard>
      </DevSection>
      <DevSection title="ValueCard">
        <ValueCard title="카드 제목" content="카드 본문"></ValueCard>
      </DevSection>
      <DevSection title="Slider"></DevSection>
      <DevSection title="Wip">
        <Wip width={500} height={200} />
      </DevSection>
      <DevSection title="Logo Animation">
        <Lottie animationData={logoAnimation} loop={false} reversed={true} />
      </DevSection>
    </Main>
  );
}

const Main = styled("main")([
  layout.page,
  {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
  },
]);

const Title = styled(Heading.H1)({
  textAlign: "center",
  margin: "40px 0",
});

const sampleTrendingData = [
  {
    title: "1위 포스트",
    views: 5000,
  },
  {
    title: "2위 포스트",
    views: 4000,
  },
  {
    title: "3위 포스트",
    views: 3000,
  },
  {
    title: "4위 포스트",
    views: 2000,
  },
  {
    title: "5위 포스트",
    views: 1000,
  },
];
