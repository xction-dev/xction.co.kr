import { PostCommentSchema, PostSchema } from "@/schema/posts";
import wrap from "@/utils/wrap";
import { PostApi } from "@core/api/post";
import { Router } from "express";
import { arr } from "@/utils/operator/arr";
import db from "@/utils/db/manipulate";
import { obj } from "@/utils/operator/obj";
import { toPostType } from "@/schema/posts/enum";

const router = Router();

const { getPosts, postPost } = PostApi;

/*
 * GET "/posts"
 */

router.get(
  "/",
  wrap(async (req, res) => {
    const { query } = getPosts.server.parseRequest(req);
    const { pageNumber } = { pageNumber: 1, ...query };

    const posts = await db.select.page<PostSchema>({
      from: "posts",
      schema: PostSchema,
      pageNumber,
    });

    if (posts.length === 0) {
      res.json([]);
      return;
    }

    const ids = posts.map(({ id }) => id);

    const postLikesCounts = await db.count.byIds({
      from: "postLikes",
      key: "postId",
      as: "likesCount",
      ids,
    });

    const postCommentsCounts = await db.count.byIds({
      from: "postComments",
      key: "postId",
      as: "commentsCount",
      ids,
    });

    const joined = arr
      .joinById(posts, postLikesCounts, postCommentsCounts)
      .map(obj.mapKey("postTypeId", toPostType, "postType"));

    res.json(joined);
  }),
);

/*
 * GET "/posts/:postId"
 */
router.get(
  "/:postId",
  wrap(async (req, res) => {
    const postId = Number(req.params.postId);

    const post = await db.select
      .byId<PostSchema>({
        from: "posts",
        schema: PostSchema,
        id: postId,
      })
      .then(obj.mapKey("postTypeId", toPostType, "postType"));

    const likesCount = await db.count.byId({
      from: "postLikes",
      key: "postId",
      id: postId,
    });

    const commentsCount = await db.count.byId({
      from: "postComments",
      key: "postId",
      id: postId,
    });

    res.json({ ...post, likesCount, commentsCount });
  }),
);

/*
 * GET "/posts/:postId/comments"
 */
router.get(
  "/:postId/comments",
  wrap(async (req, res) => {
    const postId = Number(req.params.postId);

    const comments = await db.select.page<PostCommentSchema>({
      from: "postComments",
      schema: PostCommentSchema,
      pageNumber: 1,
      where: `postId = ${postId}`,
    });

    if (comments.length === 0) {
      res.json([]);
      return;
    }

    const ids = comments.map(({ id }) => id);

    const commentLikesCounts = await db.count.byIds({
      from: "postCommentLikes",
      key: "postCommentId",
      as: "likesCount",
      ids,
    });

    const joined = arr.joinById(comments, commentLikesCounts);

    res.json(joined);
  }),
),
  /*
   * postPost
   */
  router.post(
    postPost.server.endpoint[1],
    wrap(async (req, res) => {
      const { body } = postPost.server.parseRequest(req);
      if (!body) throw new Error("Invalid body");

      res.json({ body });
    }),
  );

export default router;
