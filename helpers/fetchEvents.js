export async function fetchEvents(){
    const response = await fetch('https://react-http-48ff4-default-rtdb.firebaseio.com/events.json');
    const data = await response.json();
    const transformedEvents = [];
    for(const key in data){
        transformedEvents.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            location: data[key].location,
            date: data[key].date,
            image: data[key].image,
            isFeatured: data[key].isFeatured,
        })
    }
    return transformedEvents;
};