/**  @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { Button as MuiButton } from "@mui/material";
import typography from "@/styles/typography";

type ButtonProps = Parameters<typeof MuiButton>[0];

function black(props: ButtonProps) {
  return (
    <MuiButton
      /** MUI의 기본 Ripple Effect 비활성화 시켰습니다. 활성화할지 논의 필요합니다. */
      disableRipple
      css={css`
        background-color: black;
        color: #f6f6f6;
        border-radius: 34px;
        height: 68px;
        padding: 16px 32px;
        box-shadow: 9px 9px 9px rgba(0, 0, 0, 0.2);
        ${typography.h5}
      `}
      {...props}
    >
      {props.children}
    </MuiButton>
  );
}

function white(props: ButtonProps) {
  return (
    <MuiButton
      disableRipple
      css={css`
        background-color: white;
        color: black;
        border-radius: 34px;
        height: 68px;
        padding: 16px 32px;
        box-shadow: 9px 9px 9px rgba(0, 0, 0, 0.2);
        &:hover {
          background-color: gray;
        }
        &:active {
          background-color: white;
          border: 1px solid black;
        }
        ${typography.h5}
      `}
      {...props}
    >
      {props.children}
    </MuiButton>
  );
}

// const Button = { black, white, capsule, proceed, text };
const Button = { black, white };

export default Button;
