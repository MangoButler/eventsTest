// import { getFeaturedEvents } from "../dummy-events";
import EventsList from "../components/events/EventsList";
// import { fetchEvents } from "../helpers/fetchEvents";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  
  return (
    <div>
      <EventsList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
    revalidate: 1800
  };
}

// export async function getStaticProps(context) {

//     const transformedEvents = await fetchEvents();
//     const featuredEvents = transformedEvents.filter(event => event.isFeatured);

//     return {
//         props: { events: featuredEvents},
//         revalidate: 10
//     }
// }

export default HomePage;
