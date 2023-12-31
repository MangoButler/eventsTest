
import classes from './comment-list.module.css';

function CommentList(props) {
  const { list:comments } = props;

  if (!comments || comments.length === 0) {
    return <p>No Comments Yet!</p>;
  }

  return (
    <ul className={classes.comments}>
      { comments.map(comment => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
          By <address>{comment.name}</address>
        </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
