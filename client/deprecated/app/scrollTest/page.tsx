// using CSS property scroll-snap

"use client";

import styled from "@emotion/styled";
import layout from "../../styles/layout";

export default function ScrollTest() {
  return (
    <Main>
      <ScrollContainer>
        <RedDiv>Red div</RedDiv>
        <BlueDiv>Blue div</BlueDiv>
      </ScrollContainer>
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

const ScrollContainer = styled("div")([
  {
    scrollSnapType: "y mandatory",
    overflowY: "auto",
    maxHeight: "100vh",
  },
  {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
]);

const RedDiv = styled("div")({
  backgroundColor: "rgba(255, 0, 0, 0.5)",
  height: "100vh",
  scrollSnapAlign: "start",
});

const BlueDiv = styled("div")({
  backgroundColor: "rgba(0, 0, 255, 0.5)",
  height: "100vh",
  scrollSnapAlign: "start",
});
