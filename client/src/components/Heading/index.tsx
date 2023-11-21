/**  @jsxImportSource @emotion/react */
"use client";

import typography from "@/styles/typography";
import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

const heading = css`
  margin: 0;
`;

function H1(props: HeadingProps) {
  return (
    <h1
      css={css`
        ${heading}
        ${typography.h1}
      `}
      {...props}
    >
      {props.children}
    </h1>
  );
}

function H2(props: HeadingProps) {
  return (
    <h2
      css={css`
        ${heading}
        ${typography.h2}
      `}
      {...props}
    >
      {props.children}
    </h2>
  );
}

function H3(props: HeadingProps) {
  return (
    <h3
      css={css`
        ${heading}
        ${typography.h3}
      `}
      {...props}
    >
      {props.children}
    </h3>
  );
}

function H4(props: HeadingProps) {
  return (
    <h4
      css={css`
        ${heading}
        ${typography.h4}
      `}
      {...props}
    >
      {props.children}
    </h4>
  );
}

function H5(props: HeadingProps) {
  return (
    <h5
      css={css`
        ${heading}
        ${typography.h5}
      `}
      {...props}
    >
      {props.children}
    </h5>
  );
}

function H6(props: HeadingProps) {
  return (
    <h6
      css={css`
        ${heading}
        ${typography.h6}
      `}
      {...props}
    >
      {props.children}
    </h6>
  );
}

const Heading = { H1, H2, H3, H4, H5, H6 };

export default Heading;
