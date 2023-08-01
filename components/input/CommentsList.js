import classes from './comment-list.module.css';

const CommentsList = (props) => {
//   const allComments = getAllComments();
    const allComments = props.comments;

  if (allComments.length === 0) {
    return <p>No Comments Yet!</p>;
  }

  return (
    <ul className={classes.comments}>
      {allComments.map((item) => (
        <li key={item.id}>
          <p>{item.text}</p>
          <div>
            By: <address>{item.email}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
