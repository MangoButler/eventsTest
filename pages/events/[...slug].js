import { useRouter } from "next/router";
import { getAllEvents, getFilteredEvents } from "../../helpers/api-util";
import Button from "../../components/UI/Button";
import { Fragment, useEffect, useState } from "react";
import EventsList from "../../components/events/EventsList";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/events/error-alert";
import useSWR from "swr";

function FilteredEvents(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const filterData = router.query.slug;
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  .then((data) => {
    const events = [];
    for (const key in data) {
      events.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        location: data[key].location,
        date: data[key].date,
        image: data[key].image,
        isFeatured: data[key].isFeatured,
      });
    }
    return events;
  })
  const { data, error } = useSWR(
    "https://react-http-48ff4-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if(data){
      setLoadedEvents(data);
    }

  }, [data])

  // useEffect(() => {
  //   if (data) {
  //     const events = [];
  //     for (const key in data) {
  //       events.push({
  //         id: key,
  //         title: data[key].title,
  //         description: data[key].description,
  //         location: data[key].location,
  //         date: data[key].date,
  //         image: data[key].image,
  //         isFeatured: data[key].isFeatured,
  //       });
  //     }
  //     setLoadedEvents(events);
  //   }
  // }, [data]);

  if (!loadedEvents) {
    return <p>Loading...</p>;
  }
  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth > 12 ||
    numMonth < 1 ||
    error
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

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // if (props.hasError) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>Invalid filter, please adjust!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button onClick={goBack}>Go back!</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }
  // const filteredEvents = props.events;

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

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//   const year = filterData[0];
//   const month = filterData[1];

//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2020 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

