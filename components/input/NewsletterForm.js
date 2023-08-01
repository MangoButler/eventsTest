import classes from "./newsletter-registration.module.css";

const NewsletterForm = () => {
  const emailSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up for our Newsletter!</h2>
      <form onSubmit={emailSubmitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            aria-label="Your Email"
          />
          <button type="submit">Sign Up!</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterForm;
