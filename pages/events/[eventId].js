import { useRouter } from "next/router";
import { getEventById } from "../../dummy-events";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/events/error-alert";

function EventDetailPage() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);
  const goBack = () => {
    router.back();
  };

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Cannot find that event.</p>
        </ErrorAlert>
        <div className="center">
          <Button onClick={goBack}>Go back!</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default EventDetailPage;
