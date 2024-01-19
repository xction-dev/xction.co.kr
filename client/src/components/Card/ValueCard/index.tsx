/**  @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { Card as MuiCard } from "@mui/material";
import Heading from "@/components/Heading";

type CardProps = Parameters<typeof MuiCard>[0];

/**
 * ValueCard는 제목과 본문으로 이루어진 카드 컴포넌트입니다.
 */

export default function ValueCard({ title, content, ...props }: CardProps) {
  return (
    <MuiCard
      css={css`
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0)
        );
        color: white;
        border: 1px solid white;
        border-radius: 8px;
        width: 784px;
        height: 442px;
        padding: 24px 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      `}
      {...props}
    >
      <Heading.H4
        css={css`
          flex: 20%;
          display: flex;
          margin: 24px;
          align-items: center;
        `}
      >
        {title}
      </Heading.H4>
      <Heading.H6
        css={css`
          flex: 80%;
          display: flex;
          margin: 24px;
          align-items: center;
        `}
      >
        {content}
      </Heading.H6>
    </MuiCard>
  );
}
