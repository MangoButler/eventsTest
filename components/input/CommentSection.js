import { useState } from "react";
import classes from "./comments.module.css";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

const CommentSection = (props) => {
  const [showComments, setShowComments] = useState(false);


  const toggleCommentsHandler = () => {
    setShowComments((prevState) => !prevState);
  };
  const addCommentHandler = () => {};

  return (
    <section className={classes.comments}>
      {showComments && <AddComment onAddComment={addCommentHandler}/>}
      {showComments && <CommentsList comments={[]}/>}
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
    </section>
  );
};

export default CommentSection;
