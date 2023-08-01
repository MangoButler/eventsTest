import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/events/' + eventId);
      const data = await response.json();
      const loadedComments = data.body;
      setCommentsList(loadedComments);
    }
    fetchComments();
  }, [setCommentsList]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const reqBody = JSON.stringify(commentData);
    fetch(`/api/events/${eventId}`, {
      method: "POST",
      body: reqBody,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCommentsList(data.body);

      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList list={commentsList}/>}
    </section>
  );
}

export default Comments;
