import { css } from "@emotion/react";

const fontBase = css`
  font-family: "SUIT-Regular", sans-serif;
  font-style: normal;
  line-height: normal;
`;

const h1 = css`
  ${fontBase}
  font-size: 96px;
  font-weight: 700;
  letter-spacing: -1.5px;
`;

const h2 = css`
  ${fontBase}
  font-size: 60px;
  font-weight: 700;
  letter-spacing: -1.5px;
`;

const h3 = css`
  ${fontBase}
  font-size: 48px;
  font-weight: 400;
`;

const h4 = css`
  ${fontBase}
  font-size: 34px;
  font-weight: 400;
  letter-spacing: 0.25px;
`;

const h5 = css`
  ${fontBase}
  font-size: 24px;
  font-weight: 400;
  line-height: 36px; /* 150% */
`;

const h6 = css`
  ${fontBase}
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.15px;
`;

const subTitle1 = css`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.15px;
`;

const subTitle2 = css`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.1px;
`;

const body1 = css`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const body2 = css`
  /* Body2 */
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.25px;
`;

const button = css`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

const caption = css`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.4px;
`;

const overline = css`
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 1.5px;
`;

const typography = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  subTitle1,
  subTitle2,
  body1,
  body2,
  button,
  caption,
  overline,
};

export default typography;
