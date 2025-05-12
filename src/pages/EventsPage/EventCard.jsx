import { useState } from "react";
import styles from "./EventCard.module.css";
import { deleteEvent } from "../../api/eventRequests";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, setEvents, setEditEventStatus }) => {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleEventDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await deleteEvent(id);
      if (response.status === 200) {
        console.log("Event deleted successfully");
      } else {
        return console.error("Error deleting event:", response.data.message);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
    setEvents((prev) => prev.filter((event) => event.id !== id));
    setMenuOpenId(null);
  };

  return (
    <>
      <div
        onClick={() => navigate(`/event/${event.id}`, { state: event })}
        className={`${styles.eventCard} grid grid-cols-3  bg-gray-200 px-2 py-2 rounded mb-2 relative`}
      >
        <span className="col-span-2">{event?.title || "name"}</span>
        <div className="flex items-center	justify-between gap-4">
          <span>{event?.event_date.slice(0, 10) || "date"}</span>
          <button
            className={`${styles.dropdownButton} text-xl font-bold text-gray-600 bg-transparent`}
            onClick={(e) => toggleMenu(event?.id, e)}
          >
            ☰
          </button>
        </div>

        {menuOpenId === event.id && (
          <div
            className={`${styles.toggleMenu} absolute right-2 top-full mt-1 bg-gray-100 border rounded shadow w-24 text-sm z-10`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditEventStatus(event.id);
              }}
              className="w-full px-2 py-1 hover:bg-gray-200 text-left"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={(e) => handleEventDelete(event.id, e)}
              className="w-full px-2 py-1 hover:bg-gray-200 text-left rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EventCard;
