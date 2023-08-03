import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import ErrorAlert from "../events/error-alert";
import NotificationContext from "../../store/notification-context";
import LoadingAlert from "../UI/LoadingAlert";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch("/api/comments/" + eventId)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        })
        .then((data) => {
          setCommentsList(data.comments);
          setError(null);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    setError(null);
    setIsLoading(false);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Please wait",
      message: "Adding comment...",
      status: "pending",
    });
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Failed to add comment");
        });
      })
      .then((data) => {
        setCommentsList((prevStatus) => [data.comment, ...prevStatus]);
        notificationCtx.showNotification({
          title: "Success",
          message: "Succesfully added comment!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {isLoading && <LoadingAlert/>}
      {showComments && !isLoading && (
        <NewComment onAddComment={addCommentHandler} />
      )}
      {error && !isLoading && <ErrorAlert>{error}</ErrorAlert>}
      {showComments && !error && !isLoading && <CommentList list={commentsList} />}
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
