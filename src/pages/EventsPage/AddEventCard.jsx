import { useState } from "react";
import styles from "./AddEventCard.module.css";
import eventSchema from "../../validations/eventValidation";
import { addEvent, updateEvent } from "../../api/eventRequests";

const AddEventCard = ({
  event,
  type,
  setEventStatus,
  setEvents,
  allEvents,
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    eventDate: event?.event_date.slice(0, 10) || "",
    description: event?.description || "",
  });
  const [error, setError] = useState(null);

  const handleEventSave = async (e) => {
    e.preventDefault();
    try {
      await eventSchema.validate(formData);

      //   for adding new event
      if (type === "newEvent") {
        const result = await addEvent(formData);

        if (result?.error) {
          setError(result.error);
        } else {
          setError(null);
          setEvents((prev) => [result.data.event, ...(prev || [])]);
          setFormData({
            title: "",
            eventDate: "",
            description: "",
          });
        }

        // when updating existing event
      } else if (type === "editEvent") {
        const result = await updateEvent(event.id, formData);

        if (result?.error) {
          setError(result.error);
        } else {
          setError(null);
          const updatedEvent = result.data.event;
          const updatedEvents = allEvents.map((ev) =>
            ev.id === event.id ? updatedEvent : ev
          );
          setEvents(updatedEvents);
          setFormData({
            title: "",
            eventDate: "",
            description: "",
          });
        }
      }
      setEventStatus(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleEventSave}
        noValidate
        className={`${styles.addEventCard} grid grid-cols-3  bg-gray-200 px-2 py-2 rounded mb-2 relative`}
      >
        <input
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          value={formData.title}
          className="col-span-2 mr-4 mt-2 rounded"
        />
        <input
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, eventDate: e.target.value }))
          }
          value={formData.eventDate}
          type="date"
          className="w-full mt-2 rounded"
        />
        <label htmlFor="eventDescription" className="mt-2">
          Event Description
        </label>
        <textarea
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          value={formData.description}
          name=""
          id="eventsDescription"
          className="col-span-3 rounded mt-1"
        ></textarea>
        {error && (
          <div className="text-red-500 text-center py-4 col-span-3">
            {error}
          </div>
        )}
        <div className="flex items-center	justify-end gap-4 col-span-3 mt-4 mb-1">
          <button
            onClick={() => setEventStatus(false)}
            className={`${styles.cancelBtn} text-white px-4 py-1 rounded`}
          >
            Cancel
          </button>
          <button type="submit" className="text-white px-4 py-1 rounded">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEventCard;
