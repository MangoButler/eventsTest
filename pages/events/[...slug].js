import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-events";
import Button from "../../components/UI/Button";
import { Fragment } from "react";
import EventsList from "../../components/events/EventsList";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/events/error-alert";

function FilteredEvents() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  if (
    isNaN(numYear) ||
    isNaN(filteredMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter, please adjust!</p>
        </ErrorAlert>
        <div className="center">
          <Button onClick={goBack}>Go back!</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events in the selected time period!</p>
        </ErrorAlert>
        <div className="center">
          <Button onClick={goBack}>Go back!</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEvents;
