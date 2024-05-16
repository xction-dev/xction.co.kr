import { Post } from "@core/entity/post";
import { PostDto } from "./dto";
import { POST_TYPE } from "@core/constant/post/postType";
import { Tag } from "@core/entity/tag";

export const PostTagMapper = {
  toTypeTag: (postType: POST_TYPE): Tag => {
    switch (postType) {
      case "FREE":
        return { id: 1, type: "POST_TYPE", name: "자유" };
      case "INFORMATION":
        return { id: 2, type: "POST_TYPE", name: "정보" };
      case "PROMOTION":
        return { id: 3, type: "POST_TYPE", name: "홍보" };
      case "ONE_LINE_REVIEW":
        return { id: 4, type: "POST_TYPE", name: "한줄평" };
    }
  },
};

export const PostMapper = {
  toEntity: (dto: PostDto): Post => ({
    ...dto,
    tags: [PostTagMapper.toTypeTag(dto.postType)],
  }),
};
