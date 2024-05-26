// import { queryFromRepository } from "@/repository";
// import { PostRepository } from "@/repository/post";
import { postCommentLikes } from "@/repository/postCommentLikes";
import { postComments } from "@/repository/postComments";
import { postLikes } from "@/repository/postLikes";
import { posts } from "@/repository/posts";
import { users } from "@/repository/users";
import { groupKeys, matchById } from "@/repository/util";
import { connection } from "@/utils/db/init";
import wrap from "@/utils/wrap";
import { PostApi } from "@core/api/post";
import { Router } from "express";
import { z } from "zod";

const router = Router();

const { getPosts, getPost, getPostComments, postPost } = PostApi;

/*
 * getPosts
 */
router.get(
  getPosts.server.endpoint[1],
  wrap(async (req, res) => {
    const { query } = getPosts.server.parseRequest(req);
    const { pageNumber } = { pageNumber: 1, ...query };
    /*
     * TABLE: posts
     */
    const postsResult = await (
      await connection
    )
      .execute(
        `
        SELECT ${posts.SELECT()}, ${users.SELECT({ name: "createdUser" })}
        FROM ${posts.FROM()}
        ${users.JOIN_BY_ID("posts.createdUserId")}
        LIMIT ${(pageNumber - 1) * 20}, 20
        `,
      )
      .then(([data]) => data as any[])
      .then((data) => data.map(groupKeys("createdUser")))
      .then(z.array(posts.schema.extend({ createdUser: users.schema })).parse);

    if (postsResult.length === 0)
      res.status(404).json({ message: "Not Found" });

    /*
     * TABLE: postLikes
     */
    const postLikesResult = await (
      await connection
    )
      .execute(
        postLikes.COUNT_BY_POST_IDS(
          postsResult.map(({ id }) => id),
          "likesCount",
        ),
      )
      .then(([data]) => data as any[])
      .then(
        z.array(z.object({ id: z.number(), likesCount: z.number() })).parse,
      );

    /*
     * TABLE: postComments
     */
    const postCommentsResult = await (
      await connection
    )
      .execute(
        postComments.COUNT_BY_POST_IDS(
          postsResult.map(({ id }) => id),
          "commentsCount",
        ),
      )
      .then(([data]) => data as any[])
      .then(
        z.array(z.object({ id: z.number(), commentsCount: z.number() })).parse,
      );

    /*
     * Response
     */
    const items = matchById(
      postsResult,
      [postLikesResult, { likesCount: 0 }],
      [postCommentsResult, { commentsCount: 0 }],
    );
    const parsed = getPosts.server.parseResponse({ items });
    res.json(parsed);
  }),
);

/*
 * getPost
 */
router.get(
  getPost.server.endpoint[1],
  wrap(async (req, res) => {
    const { params } = getPost.server.parseRequest(req);

    /*
     * TABLE: posts
     */
    const postsResult = await (
      await connection
    )
      .execute(
        `
        SELECT ${posts.SELECT()}, ${users.SELECT({ name: "createdUser" })}
        FROM ${posts.FROM()}
        ${users.JOIN_BY_ID("posts.createdUserId")}
        WHERE posts.id = ${params.postId}
        `,
      )
      .then(([data]) => (data as any[])[0])
      .then(groupKeys("createdUser"))
      .then(posts.schema.extend({ createdUser: users.schema }).parse);

    const postLikesResult = await (
      await connection
    )
      .execute(postLikes.COUNT_BY_POST_ID(postsResult.id, "likesCount"))
      .then(([data]) => (data as any[])[0])
      .then(z.object({ id: z.number(), likesCount: z.number() }).parse)
      .catch(() => ({ id: postsResult.id, likesCount: 0 }));

    const postCommentsResult = await (
      await connection
    )
      .execute(postComments.COUNT_BY_POST_ID(postsResult.id, "commentsCount"))
      .then(([data]) => (data as any[])[0])
      .then(z.object({ id: z.number(), commentsCount: z.number() }).parse)
      .catch(() => ({ id: postsResult.id, commentsCount: 0 }));

    res.json({ ...postsResult, ...postLikesResult, ...postCommentsResult });
  }),
);

/*
 * getPosts
 */
router.get(
  getPostComments.server.endpoint[1],
  wrap(async (req, res) => {
    const { params } = getPostComments.server.parseRequest(req);

    /*
     * TABLE: postComments
     */
    const postCommentsResult = await (
      await connection
    )
      .execute(
        `
        SELECT ${postComments.SELECT()}, ${users.SELECT({ name: "createdUser" })}
        FROM postComments
        ${users.JOIN_BY_ID("postComments.createdUserId")}
        WHERE postComments.postId = ${params.postId}
        `,
      )
      .then(([data]) => data as any[])
      .then((data) => data.map(groupKeys("createdUser")))
      .then(
        z.array(
          postComments.schema
            .omit({ postId: true })
            .extend({ createdUser: users.schema }),
        ).parse,
      );

    /*
     * TABLE: postLikes
     */
    const postCommentLikesResult = await (
      await connection
    )
      .execute(
        postCommentLikes.COUNT_BY_POST_COMMENT_IDS(
          postCommentsResult.map(({ id }) => id),
          "likesCount",
        ),
      )
      .then(([data]) => data as any[])
      .then(
        z.array(z.object({ id: z.number(), likesCount: z.number() })).parse,
      );

    /*
     * Response
     */
    const items = matchById(postCommentsResult, [
      postCommentLikesResult,
      { likesCount: 0 },
    ]);
    const parsed = getPostComments.server.parseResponse({ items });
    res.json(parsed);
  }),
);

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
