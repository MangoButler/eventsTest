import { Fragment } from "react";
import EventSearch from "../../components/events/EventSearch";
import EventsList from "../../components/events/EventsList";
import { getAllEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";
import { fetchEvents } from "../../helpers/fetchEvents";


function AllEvents(props) {
  // const events = getAllEvents();
  const events = props.events;
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </Fragment>
  );
};

export async function getStaticProps(){
  const allEvents = await getAllEvents();
  return {
    props: { events: allEvents},
    revalidate: 1800
  }
}


// export async function getStaticProps(){
//    const transformedEvents = await fetchEvents();

//    return {
//     props: { events: transformedEvents},
//     revalidate: 10
//    }
// }

export default AllEvents;
