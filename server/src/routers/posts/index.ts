import { toPostType } from "@/schema/posts/enum";
import { PostSchema } from "@/schema/posts";
import { connection } from "@/utils/db/init";
import { obj } from "@/utils/operator/obj";
import { sql } from "@/utils/db/sql";
import wrap from "@/utils/wrap";
import { PostApi } from "@core/api/post";
import { UserSummary } from "@core/entity/user/summary";
import { Router } from "express";
import { arr } from "@/utils/operator/arr";
import { RowDataPacket } from "mysql2";
import db from "@/utils/db/manipulate";

const router = Router();

const { getPosts, getPost, getPostComments, postPost } = PostApi;

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

    const ids = posts.map(({ id }) => id);

    const postLikesCounts = await db.count.byIds({
      from: "postLikes",
      key: "postId",
      as: "likesCount",
      targets: ids,
    });

    const postCommentsCounts = await db.count.byIds({
      from: "postComments",
      key: "postId",
      as: "commentsCount",
      targets: ids,
    });

    const joined = arr.joinById(posts, postLikesCounts, postCommentsCounts);

    res.json(joined);
  }),
);

/*
 * getPost
 */
router.get(
  "/:postId",
  wrap(async (req, res) => {
    const { params } = getPost.server.parseRequest(req);

    /*
     * TABLE: posts
     */
    const postsResult = await (
      await connection
    )
      .execute<RowDataPacket[]>(
        `
        SELECT ${sql.pick("posts", Object.keys(PostSchema.shape))}, ${sql.pick("users", Object.keys(UserSummary.shape), "createdUser")}
        FROM posts
        ${sql.joinById("users", "posts.createdUserId")}
        WHERE posts.id = ${params.postId}
        `,
      )
      .then(([data]) =>
        data
          .map(obj.group("createdUser"))
          .map((row) =>
            PostSchema.omit({ createdUserId: true })
              .extend({ createdUser: UserSummary })
              .parse(row),
          ),
      )
      .then((data) =>
        data.map(obj.mapKey("postTypeId", toPostType, "postType")),
      );

    if (postsResult.length === 0) {
      throw new Error("Post not found");
    }

    res.json({ ...postsResult });
  }),
);

/*
 * getPosts
 */
router.get(
  getPostComments.server.endpoint[1],
  wrap(async (req, res) => {
    const postId = Number(req.params.postId);

    const post = await db.select.byId<PostSchema>({
      from: "postComments",
      schema: PostSchema,
      id: postId,
    });

    res.json(post);
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
