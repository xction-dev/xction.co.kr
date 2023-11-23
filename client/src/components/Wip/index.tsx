/**  @jsxImportSource @emotion/react */
"use client";

import { SerializedStyles, css, keyframes } from "@emotion/react";
import Heading from "../Heading";

/**
 * Wip(work in progress) 컴포넌트는 아직 구현되지 않은 컴포넌트를 대신하는 컴포넌트 입니다.
 */

type WipProps = {
  children?: never;
  css?: SerializedStyles; // css prop으로 스타일을 지정할 수 있습니다.
  width?: number; // 또는 그냥 넓이와
  height?: number; // 높이를 지정할 수도 있습니다.
};

export default function Wip({
  css: injectedCss,
  width = 100,
  height = 100,
}: WipProps) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${width}px;
        height: ${height}px;
        backgorund-color: gray;
        animation: ${blinkKeyframe} 1.5s ease-in-out infinite alternate;
        border-radius: 20px;
        ${injectedCss}
      `}
    >
      <Heading.H4
        css={css`
          color: white;
        `}
      >
        WIP
      </Heading.H4>
    </div>
  );
}

const blinkKeyframe = keyframes`
  from {
    background: rgba(35,35,70)
  } to {
    background: rgba(70,70,100)
  }
`;
