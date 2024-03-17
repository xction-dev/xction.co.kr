import { Router } from "express";
import { z } from "zod";
import wrapAsync from "../../utils/wrapAsync";
import {
  CommentNormalRepository,
  CommentRepository,
} from "../../repositories/comment";
import { mockWriter } from "../../utils/mock";
import {
  GetCommentResponseDto,
  PostCommentRequestDto,
} from "../../../../core/dto/CommentService";
import { uniqueId } from "../../utils/db/uniqueId";

const router = Router();

/**
 * GET: "comment/:projectId/:timeNodeId"
 */
const GetCommentParams = z.object({
  projectId: z.coerce.number(),
  parentTimeNodeId: z.coerce.number(),
});

router.get(
  "/:projectId/:parentTimeNodeId",
  wrapAsync(async (req, res, db) => {
    // parse request params
    const parsedParams = GetCommentParams.parse(req.params);

    // fetch repository from db
    const repository = await db
      .collection<CommentRepository>("comment")
      .find({
        projectId: parsedParams.projectId,
        parentTimeNodeId: parsedParams.parentTimeNodeId,
      })
      .toArray();

    // parse repository
    const parsedRepository = repository.map((item) =>
      CommentRepository.parse(item),
    );

    // add mock writer
    const body = parsedRepository.map((comment) => ({
      ...comment,
      writer: mockWriter(comment.writerId),
      createTime: comment.createTime.toISOString(),
    }));

    // parse response
    const parsedBody = GetCommentResponseDto.parse({ items: body });

    // send response
    res.json(parsedBody);
  }),
);

/**
 * POST "comment/:projectId/:timeNodeId"
 */
const PostCommentParams = z.object({
  projectId: z.coerce.number(),
  parentTimeNodeId: z.coerce.number(),
});

router.post(
  "/:projectId/:parentTimeNodeId",
  wrapAsync(async (req, res, db) => {
    // parse request params
    const parsedRequestParams = PostCommentParams.parse(req.params);

    // parse body
    const parsedRequestBody = PostCommentRequestDto.parse(req.body);

    // create item
    const commentId = uniqueId.comment();
    const comment: Omit<CommentNormalRepository, "_id"> = {
      type: "COMMENT",
      id: commentId,
      projectId: parsedRequestParams.projectId,
      writerId: commentId % 4,
      content: parsedRequestBody.content,
      isSpoiler: parsedRequestBody.isSpoiler,
      parentTimeNodeId: parsedRequestParams.parentTimeNodeId,
      createTime: new Date(),
    };

    // fetch repository from db
    const result = await db
      .collection<CommentRepository>("comment")
      .insertOne(comment);

    // send response
    if (result.acknowledged) {
      res.status(200);
    } else {
      res.status(500);
    }
  }),
);

export default router;
