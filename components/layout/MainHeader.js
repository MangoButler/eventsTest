import Link from "next/link";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Next Events</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <Link href="/events">All events</Link>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
