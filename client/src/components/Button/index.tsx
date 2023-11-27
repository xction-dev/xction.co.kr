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
        background-color: #343434;
        color: #f6f6f6;
        border-radius: 34px;
        height: 68px;
        padding: 16px 32px;
        box-shadow: 9px 9px 9px rgba(0, 0, 0, 0.2);
        ${typography.h5}
        &:hover {
          background-color: #7c7c7c;
        }
        &:active {
          background-color: #343434;
          border: 2px solid #f1f1f1;
        }
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
        background-color: #f1f1f1;
        color: #202020;
        border-radius: 34px;
        height: 68px;
        padding: 16px 32px;
        box-shadow: 9px 9px 9px rgba(0, 0, 0, 0.2);
        &:hover {
          background-color: #d3d3d3;
        }
        &:active {
          background-color: #f1f1f1;
          border: 2px solid #202020;
        }
        ${typography.h5}
      `}
      {...props}
    >
      {props.children}
    </MuiButton>
  );
}

function capsule(props: ButtonProps) {
  return (
    <MuiButton
      disableRipple
      css={css`
        background-color: #343434;
        color: #f1f1f1;
        border-radius: 8px;
        height: 57px;
        padding: 16px 24px;
        &:hover {
          background-color: #7c7c7c;
        }
        &:active {
          background-color: #343434;
          border: 2px solid #f1f1f1;
        }
        ${typography.h6}
      `}
      {...props}
    >
      {props.children}
    </MuiButton>
  );
}

function text(props: ButtonProps) {
  return (
    <MuiButton
      disableRipple
      css={css`
        background-color: none;
        color: #000000;
        height: 49px;
        padding: 12px 20px;
        text-transform: none;
        text-decoration: none;
        line-height: 1.5;
        &:hover,
        &:active {
          line-height: 1.5;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        ${typography.h6}
      `}
      {...props}
    >
      {props.children}
    </MuiButton>
  );
}

// const Button = { black, white, capsule, proceed, text };
const Button = { black, white, capsule, text };

export default Button;
