import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventGuests } from "../../api/guestRequests.js";
import AddGuestCard from "./AddGuestCard.jsx";
import GuestCard from "./GuestCard.jsx";

export default function EventsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state;
  const [guests, setGuests] = useState([]);
  const [addGuestStatus, setAddGuestStatus] = useState(false);
  const [editGuestStatus, setEditGuestStatus] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventGuests(eventData.id);
        if (response.status === 200) {
          setGuests(response.data);
          console.log(response);
        } else {
          console.error("Error fetching guests:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching guests:", error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto p-4">
      <div className="goBackToEventsBtn" onClick={() => navigate("/events")}>
        <div class="absolute top-4 left-4 flex items-center space-x-2 cursor-pointer hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span class="text-sm font-medium">Back To Events</span>
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-center mb-4 mt-6">
        Event: <b>{eventData.title}</b>
      </h1>
      <button
        onClick={() => setAddGuestStatus(true)}
        className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
      >
        Register New Guest
      </button>

      {guests?.length !== 0 || addGuestStatus ? (
        <div className="grid grid-cols-12 text-gray-700 font-medium mb-1 px-1">
          <span className="col-span-5">Guest Full Name</span>
          <span className="col-span-4">Email Address</span>
          <span className="col-span-3">
            {addGuestStatus || editGuestStatus
              ? "Birth Year(optional)"
              : "Birth Year"}
          </span>
        </div>
      ) : (
        <div>No guests Registered yet</div>
      )}
      {addGuestStatus && (
        <AddGuestCard
          type="newGuest"
          setGuestStatus={setAddGuestStatus}
          setGuests={setGuests}
          eventId={eventData.id}
        />
      )}
      {guests?.map((guest) => {
        return editGuestStatus !== guest.id ? (
          <GuestCard
            key={guest.id}
            guest={guest}
            setEvents={setGuests}
            setEditGuestStatus={setEditGuestStatus}
          />
        ) : (
          <AddGuestCard
            guest={guest}
            type="editGuest"
            setGuestStatus={setEditGuestStatus}
            setGuests={setGuests}
            allGuests={guests}
            eventId={eventData.id}
            key={`${guest.id}-edit`}
          />
        );
      })}
    </div>
  );
}
