import { useState } from "react";
import {
  Avatar,
  TextField,
  Button,
  Grid,
  Typography,
  linkClasses,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PropsWithChildren } from "react";
import Image from "next/image";
import button1 from "../Comments/cbutton1.png";

type CommentsProps = PropsWithChildren;

const useStyles = makeStyles({
  body: {
    backgroundColor: "grey  ",
    color: "white",
    padding: "16px",
    marginLeft: "100px",
    marginRight: "100px",
  },
  top: {
    display: "flex",
    justifyContent: "flex-start", // Align to the left
    alignItems: "center",
    marginBottom: "16px",
  },
  icons: {
    display: "flex",
    gap: "8px",
  },
  commentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  avatar: {
    width: "32px",
    height: "32px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "8px",
  },
  commentList: {
    marginTop: "16px",
  },
});

type Comment = {
  text: string;
  replies: string[];
};

export default function Comments({ children }: CommentsProps) {
  const classes = useStyles();
  const [newComment, setNewComment] = useState<string>("");
  const [newReply, setNewReply] = useState<string>("");

  const [comments, setComments] = useState<Comment[]>([
    { text: "hello", replies: [] },
    { text: "this is comment test", replies: [] },
    { text: "123", replies: [] },
  ]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        { text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  const handleReplySubmit =
    (commentIndex: number) => (event: React.FormEvent) => {
      event.preventDefault();
      const updatedComments = [...comments];
      const replyText = newReply.trim();
      if (replyText !== "") {
        updatedComments[commentIndex].replies.push(replyText);
        setComments(updatedComments);
        setNewReply("");
      }
    };

  const handleDelete = (commentIndex: number, replyIndex?: number) => {
    const updatedComments = [...comments];
    if (replyIndex !== undefined) {
      updatedComments[commentIndex].replies.splice(replyIndex, 1);
    } else {
      updatedComments.splice(commentIndex, 1);
    }
    setComments(updatedComments);
  };

  return (
    <div className={classes.body}>
      <div className={classes.top}>
        <Image src={button1} alt="button 1" width={89} height={89} />
        <Typography variant="h6">엔딩 댓글</Typography>
        <div className={classes.icons}>
          <span>Icon 3</span>
        </div>
        <Typography variant="h6">정렬 기준</Typography>
      </div>
      <form onSubmit={handleCommentSubmit} className={classes.commentContainer}>
        <Grid container spacing={0} alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar}>U</Avatar>
          </Grid>
          <Grid item xs>
            <TextField
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={newComment.trim() === ""}
          >
            댓글
          </Button>
        </div>
      </form>
      <div className={classes.commentList}>
        {comments.map((comment, commentIndex) => (
          <div key={commentIndex}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Avatar className={classes.avatar}>U</Avatar>
              </Grid>
              <Grid item xs>
                <Typography>{comment.text}</Typography>
              </Grid>
            </Grid>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(commentIndex)}
            >
              취소
            </Button>
            <form
              onSubmit={handleReplySubmit(commentIndex)}
              className={classes.commentContainer}
              style={{ marginLeft: "100px" }}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Avatar className={classes.avatar}>U</Avatar>
                </Grid>
                <Grid item xs>
                  <TextField
                    placeholder="Add a reply..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={newReply.trim() === ""}
                >
                  답글
                </Button>
              </div>
            </form>
            <div
              className={classes.commentList}
              style={{ marginLeft: "100px" }}
            >
              {comment.replies.map((reply, replyIndex) => (
                <div key={replyIndex}>
                  <Typography>{reply}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(commentIndex, replyIndex)}
                  >
                    취소
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
