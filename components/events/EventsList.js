import EventItem from "./EventItem";
import classes from './EventsList.module.css';

const EventsList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem
          key={item.id} //Always remember the key
          id={item.id}
          image={item.image}
          title={item.title}
          location={item.location}
          date={item.date}
        />
      ))}
    </ul>
  );
};

export default EventsList;
