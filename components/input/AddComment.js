import { useRef, useState } from "react";
import classes from "./new-comment.module.css";

const AddComment = (props) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;
    if (
      !enteredEmail.includes("@") ||
      enteredEmail.trim().length < 2 ||
      enteredName.trim().length < 1 ||
      enteredComment.trim().length < 1 ||
      enteredComment.length > 200
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      comment: enteredComment,
    });
    setIsInvalid(false);
  };

  return (
    <form className={classes.form}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="name">Enter Name</label>
          <input id="name" type="text" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Enter Email</label>
          <input id="email" type="email" ref={emailInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Enter Comment</label>
        <textarea rows="5" id="comment" ref={commentInputRef} />
      </div>
      {isInvalid && <p>Enter valid Name, Email and Comment</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddComment;
