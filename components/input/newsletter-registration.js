import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const newMail = emailInputRef.current.value;
    if (!newMail.includes("@") || !newMail.includes(".")) {
      setIsInvalid(true);
      return;
    }
    const reqBody = { email: newMail };
    setIsInvalid(false);

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
          {isInvalid && <p>Enter valid email</p>}
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
