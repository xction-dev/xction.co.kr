import { CommentRepository } from "@/repositories/comment";
import { Db } from "mongodb";

let commentId = -999;

export const uniqueId = {
  comment: () => {
    commentId++;
    return commentId;
  },
};

export const initUniqueId = async (db: Db) => {
  // fetch last item from db
  const comment = await db
    .collection<CommentRepository>("comment")
    .findOne({}, { sort: { id: -1 } });

  // null check
  if (!comment) throw new Error("comment not found");

  // set uniqueId
  commentId = comment.id;

  // log
  console.log("uniqueId initialized");
  console.log(`comment_id: ${commentId}`);
};
