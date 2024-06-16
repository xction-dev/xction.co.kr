// router.get(
//   "/",
//   wrap(async (req, res) => {
//     const { query } = getPosts.server.parseRequest(req);
//     const { pageNumber } = { pageNumber: 1, ...query };

//     const postsResult = await (
//       await connection
//     )
//       .execute<RowDataPacket[]>(
//         `
//         SELECT ${sql.pick("posts", Object.keys(PostSchema.shape))}, ${sql.pick("users", Object.keys(UserSummary.shape), "createdUser")}
//         FROM posts
//         ${sql.joinById("users", "posts.createdUserId")}
//         LIMIT ${(pageNumber - 1) * 20}, 20
//         `,
//       )
//       .then(([data]) =>
//         data
//           .map(obj.group("createdUser"))
//           .map((row) =>
//             PostSchema.omit({ createdUserId: true })
//               .extend({ createdUser: UserSummary })
//               .parse(row),
//           ),
//       )
//       .then((data) =>
//         data.map(obj.mapKey("postTypeId", toPostType, "postType")),
//       );

//     const postLikesStatement = sql.countBy({
//       from: "postLikes",
//       key: "postId",
//       where: sql.inArray(
//         "postId",
//         postsResult.map(({ id }) => id),
//       ),
//       as: "likesCount",
//     });
//     const postLikesResult = await (
//       await connection
//     )
//       .execute(postLikesStatement)
//       .then(([data]) => data as any[])
//       .then((data) => data.map(obj.mapKey("postId", (a) => a, "id")));

//     const postCommentsStatement = sql.countBy({
//       from: "postComments",
//       key: "postId",
//       where: sql.inArray(
//         "postId",
//         postsResult.map(({ id }) => id),
//       ),
//       as: "commentsCount",
//     });
//     const postCommentsResult = await (
//       await connection
//     )
//       .execute(postCommentsStatement)
//       .then(([data]) => data as any[])
//       .then((data) => data.map(obj.mapKey("postId", (a) => a, "id")));

//     const joined = arr.joinById(
//       postsResult,
//       postLikesResult,
//       postCommentsResult,
//     );

//     res.json(joined);
//   }),
// );
