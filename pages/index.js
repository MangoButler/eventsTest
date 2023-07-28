import EventsList from "../components/events/EventsList";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from "next/head";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        <meta name='description' content="Find a lot of events that will help you grow professionally and personally"/>
      </Head>
      <EventsList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
}

export default HomePage;
