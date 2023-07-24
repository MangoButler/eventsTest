import { getFeaturedEvents } from "../dummy-events";
import EventsList from "../components/events/EventsList";


function HomePage() {
    const featuredEvents = getFeaturedEvents();
    return (
        <div>
           <EventsList items={featuredEvents}/>
        </div>
    );
};

export default HomePage;