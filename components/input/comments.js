import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import ErrorAlert from "../events/error-alert";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 500) {
            setError(data.message);
            setIsLoading(false);
            return;
          }
          setCommentsList(data.comments);
          setError(null);
          setIsLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    setError(null);
    setIsLoading(false);
  }

  function addCommentHandler(commentData) {
    setIsLoading(true);
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.status === 201){
          setCommentsList(prevStatus => [data.comment, ...prevStatus]);
          setIsLoading(false);
          return;
        }
        setError(data.message);
        setIsLoading(false);
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {isLoading && <ErrorAlert>Loading</ErrorAlert>}
      {showComments && !isLoading && (
        <NewComment onAddComment={addCommentHandler} />
      )}
      {error && !isLoading && <ErrorAlert>{error}</ErrorAlert>}
      {showComments && !isLoading && <CommentList list={commentsList} />}
    </section>
  );
}

export default Comments;

// useEffect(() => {
//   const fetchComments = async () => {
//     const response = await fetch('/api/events/' + eventId);
//     const data = await response.json();
//     const loadedComments = data.body;
//     setCommentsList(loadedComments);
//   }
//   fetchComments();
// }, [setCommentsList]);

// const reqBody = JSON.stringify(commentData);
// fetch(`/api/events/${eventId}`, {
//   method: "POST",
//   body: reqBody,
//   headers: {
//     "Content-type": "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     setCommentsList(data.body);

//   });
