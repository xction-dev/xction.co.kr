"use client";

import Heading from "@/components/Heading";
import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type DevSectionProps = PropsWithChildren & { title: string };

export default function DevSection({ title, children }: DevSectionProps) {
  return (
    <Section>
      <SectionTitle># {title}</SectionTitle>
      {children}
    </Section>
  );
}

const Section = styled("section")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "15px",
  padding: "30px",
  margin: "20px 0",
});

const SectionTitle = styled(Heading.H2)({
  color: "black",
  backgroundColor: "white",
  padding: "8px 24px",
  alignSelf: "flex-start",
});
