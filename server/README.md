# server

```ts
router.get(
  "/",
  wrap(async (req, res) => {
    const { pageNumber } = Paginated.parse(req);
    const items = await db.select.page({
      from: "posts",
      schema: PostSchema,
      pageNumber,
    });
    const likes = await db.counts.byIds({
      from: "postsLikes",
      key: "postId",
      as: "likesCount",
      target: items.map(({ id }) => id),
    });
    const comments = await db.counts.byIds({
      from: "postsComments",
      key: "postId",
      as: "commentsCount",
      target: items.map(({ id }) => id),
    });

    const result = arr
      .joinById(items, likes, comments)
      .map(obj.mapKey("postTypeId", toPostType, "postType"));

    res.json(result);
  }),
);
```

```ts
router.get(
  "/:postId",
  wrap(async (req, res) => {
    const { postId } = param("postId").parse(req);
    const item = await db.select.id({
      from: "posts",
      schema: PostSchema,
      id: postId,
    });
    const likesCount = await db.count.byId({
      from: "postsLikes",
      key: "postId",
      as: "likesCount",
      target: postId,
    });
    const commentsCount = await db.count.byId({
      from: "postsComments",
      key: "postId",
      as: "commentsCount",
      target: postId,
    });

    const result = obj.mapKey(
      "postId",
      "id",
    )({ ...item, likesCount, commentsCount });

    res.json(result);
  }),
);
```
