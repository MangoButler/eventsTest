import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/events/error-alert";
import { getEventById } from "../../helpers/api-util";

import { getFeaturedEvents } from "../../dummy-events";
import Head from "next/head";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
  const router = useRouter();
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.event;
  const goBack = () => {
    router.back();
  };

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Cannot find that event</p>
        </ErrorAlert>
        <div className="center">
          <Button onClick={goBack}>Go back!</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
      {/* <CommentSection/> */}
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: { event: event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

// export async function getStaticProps(context) {
//   const { params } = context;
//   const eventId = params.eventId;
//   const transformedEvents = await fetchEvents();
//   const event = transformedEvents.find((event) => event.id === eventId);
//   return {
//     props: { event: event },
//   };
// }

// export async function getStaticPaths() {
//   const transformedEvents = await fetchEvents();
//   const ids = transformedEvents.map((event) => event.id);
//   const pathsWithParams = ids.map((id) => ({ params: { eventId: id } }));
//   return {
//     paths: pathsWithParams,
//     fallback: true,
//   };
// }

export default EventDetailPage;
