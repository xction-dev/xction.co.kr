import { css } from "@emotion/react";
const defaultPageWidth = 1728;
const defaultSidePadding = 109;

const page = css({
  [`@media (max-width: ${defaultPageWidth}px)`]: {
    padding: `0 calc(${defaultSidePadding} / ${defaultPageWidth} * 100vw)`,
  },
  [`@media (min-width: ${defaultPageWidth + 1}px)`]: {
    padding: `0 calc(${defaultSidePadding}px + (100vw - ${defaultPageWidth}px) / 2)`,
  },
});

const layout = { page };

export default layout;
