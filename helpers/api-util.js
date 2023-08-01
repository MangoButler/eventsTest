import fs from "fs";
import path from "path";



export async function getAllEvents() {
  const response = await fetch(
    "https://react-http-48ff4-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
    //   ...data[key]
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  const event = allEvents.find(event => event.id === id);
  return event;

}


export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }



export async function getAllIds() {
  const allEvents = await getAllEvents();
  return allEvents.map((event) => event.id);
}





export function buildPath(fileName) {
    const filePath = path.join(process.cwd(), 'data', `${fileName}.json`);
    return filePath;
}

export function readData (filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

