"use client";

import Heading from "@/components/Heading";
import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type DevSectionProps = PropsWithChildren & {
  title: string;
  isWhiteMode?: boolean;
};

export default function DevSection({
  title,
  children,
  isWhiteMode,
}: DevSectionProps) {
  return (
    <Section isWhiteMode={isWhiteMode}>
      <SectionTitle isWhiteMode={isWhiteMode}># {title}</SectionTitle>
      {children}
    </Section>
  );
}

const Section = styled("section")<{ isWhiteMode?: boolean }>(
  ({ isWhiteMode }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "15px",
    padding: "30px",
    margin: "20px 0",
    backgroundColor: isWhiteMode ? "white" : "black",
  }),
);

const SectionTitle = styled(Heading.H2)<{ isWhiteMode?: boolean }>(
  ({ isWhiteMode }) => ({
    color: isWhiteMode ? "white" : "black",
    backgroundColor: isWhiteMode ? "black" : "white",
    padding: "8px 24px",
    alignSelf: "flex-start",
  }),
);
