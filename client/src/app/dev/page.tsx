"use client";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Wip from "@/components/Wip";
import DevSection from "@/modules/dev/DevSection";
import styled from "@emotion/styled";
import Lottie from "lottie-react";
import logoAnimation from "../../../public/logo_animation.json";

export default function Dev() {
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
      <DevSection title="Button">
        <Button.black>업적 확인하기</Button.black>
        <Button.white>보러가기</Button.white>
      </DevSection>
      <DevSection title="Text Input"></DevSection>
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

const Main = styled("main")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "black",
  color: "white",
  minHeight: "100vh",
});

const Title = styled(Heading.H1)({
  textAlign: "center",
  margin: "40px 0",
});
