import { POST_TYPE } from "@core/constant/post/postType";

export const toPostType = (id: number): POST_TYPE => {
  switch (id) {
    case 1:
      return "FREE";
    case 2:
      return "INFORMATION";
    case 3:
      return "PROMOTION";
    case 4:
      return "ONE_LINE_REVIEW";
    default:
      return "FREE";
  }
};
