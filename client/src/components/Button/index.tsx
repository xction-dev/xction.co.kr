/**  @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { Button as MuiButton } from "@mui/material";

type ButtonProps = Parameters<typeof MuiButton>[0] & { content: string };

function black({ content, ...props }: ButtonProps) {
  return (
    <MuiButton
      css={css`
        background-color: black;
        color: #f6f6f6;
        border-radius: 20px;
        padding: 10px 20px;
      `}
      {...props}
    >
      {/* Heading과의 통일성을 위해 {props.children}을 쓸 수 있지만,
          Button의 경우에는 의미상 string만을 받는 content가 적절하다고 판단했습니다.
          (수정 가능)
       */}
      {content}
    </MuiButton>
  );
}

// const Button = { black, white, capsule, proceed, text };
const Button = { black };

export default Button;
