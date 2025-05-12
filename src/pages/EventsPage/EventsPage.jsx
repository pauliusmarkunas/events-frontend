import { useEffect, useState } from "react";
import EventCard from "./EventCard.jsx";
import { getAllEvents } from "../../api/eventRequests.js";
import AddEventCard from "./AddEventCard.jsx";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [addEventStatus, setAddEventStatus] = useState(false);
  const [editEventStatus, setEditEventStatus] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log(addEventStatus);
      try {
        const response = await getAllEvents();
        if (response.status === 200) {
          setEvents(response.data.events);
        } else {
          console.error("Error fetching events:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Events</h1>
      <button
        onClick={() => setAddEventStatus(true)}
        className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
      >
        Add event
      </button>
      {events?.length > 0 || addEventStatus ? (
        <div className="grid grid-cols-3 text-gray-700 font-medium mb-1 px-1">
          <span className="col-span-2">Event Title</span>
          <span>Event Date</span>
        </div>
      ) : (
        <div>No events created yet</div>
      )}
      {addEventStatus && (
        <AddEventCard
          type="newEvent"
          setEventStatus={setAddEventStatus}
          setEvents={setEvents}
        />
      )}
      {events?.map((event) => {
        return editEventStatus !== event.id ? (
          <EventCard
            key={event.id}
            event={event}
            setEvents={setEvents}
            setEditEventStatus={setEditEventStatus}
          />
        ) : (
          <AddEventCard
            event={event}
            type="editEvent"
            setEventStatus={setEditEventStatus}
            setEvents={setEvents}
            allEvents={events}
            key={`${event.id}-edit`}
          />
        );
      })}
    </div>
  );
}
