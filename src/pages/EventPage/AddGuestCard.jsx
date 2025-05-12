import { useState } from "react";
import styles from "./AddGuestCard.module.css";
import { addGuest, deleteGuest, updateGuest } from "../../api/guestRequests.js";
import guestSchema from "../../validations/guestValidation.js";

const AddGuestCard = ({
  guest,
  type,
  setGuestStatus,
  setGuests,
  allGuests,
  eventId,
}) => {
  const [formData, setFormData] = useState({
    fullName: guest?.full_name || "",
    birthYear: guest?.birth_year || undefined,
    email: guest?.email || "",
    eventId: eventId,
    age: guest?.age || "",
  });
  const [error, setError] = useState(null);

  const handleGuestSave = async (e) => {
    e.preventDefault();

    try {
      await guestSchema.validate(formData);
      //   for adding new guest
      if (type === "newGuest") {
        const result = await addGuest(formData);
        console.log(result);

        if (result?.error) {
          setError(result.error);
        } else {
          setError(null);
          setGuests((prev) => [result.data.guest, ...prev]);
          setFormData({
            fullName: "",
            birthYear: undefined,
            email: "",
            eventId: eventId,
            age: "",
          });
          e.nativeEvent.submitter.id === "guestSaveBtn"
            ? setGuestStatus(false)
            : null;
        }

        // when updating existing guest
      } else if (type === "editGuest") {
        const result = await updateGuest(guest.id, formData);

        if (result?.error) {
          setError(result.error);
        } else {
          setError(null);
          const updatedGuest = result.data.guest;
          console.log(updatedGuest);
          const updatedGuests = allGuests.map((g) =>
            g.id === guest.id ? updatedGuest : g
          );
          setGuests(updatedGuests);
          setFormData({
            fullName: "",
            birthYear: undefined,
            email: "",
            eventId: eventId,
            age: "",
          });
        }
        setGuestStatus(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGuestDelete = async (id) => {
    try {
      const response = await deleteGuest(id);
      if (response.status === 200) {
        console.log("Guest deleted successfully");
      } else {
        return console.error("Error deleting event:", response.data.message);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
    setGuestStatus(false);
    setFormData({
      fullName: "",
      birthYear: null,
      email: "",
      eventId: eventId,
    });
  };

  return (
    <>
      <form
        onSubmit={handleGuestSave}
        noValidate
        className={`${styles.form} grid grid-cols-12  bg-gray-200 px-2 py-2 rounded mb-2 relative`}
      >
        <input
          type="text"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
          }
          value={formData.fullName}
          className="col-span-5 mr-4 mt-2 rounded"
        />
        <input
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          value={formData.email}
          type="email"
          className="mr-4 mt-2 rounded col-span-4"
        />
        <input
          type="number"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, birthYear: e.target.value }))
          }
          value={formData.birthYear}
          id="birthYear"
          className="col-span-3 mt-2 rounded mt-1"
        ></input>
        <label
          className="w-full mt-2 rounded col-span-12 font-medium"
          htmlFor=""
        >
          Guest Age
        </label>
        <input
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, age: e.target.value }))
          }
          value={formData.age}
          type="number"
          className="w-full mt-2 rounded col-span-12"
        />
        {error && (
          <div className="text-red-500 text-center py-4 col-span-12">
            {error}
          </div>
        )}
        {type === "newGuest" ? (
          <div className="mt-4 mb-1 col-span-3"></div>
        ) : (
          <button
            type="button"
            onClick={() => handleGuestDelete(guest.id)}
            className={`${styles.deleteBtn} rounded mt-4 mb-1 col-span-3`}
          >
            Delete
          </button>
        )}
        <div className="flex	justify-end gap-4 col-span-9 mt-4 mb-1">
          <button
            onClick={() => setGuestStatus(false)}
            className={`${styles.cancelBtn} text-white px-4 py-1 rounded`}
          >
            Cancel
          </button>
          <button
            type="submit"
            id="guestSaveBtn"
            className="text-white px-10 py-1 rounded"
          >
            Save
          </button>
          {type !== "newGuest" ? (
            <div className="mt-4 mb-1 col-span-3"></div>
          ) : (
            <button
              type="submit"
              id="guestSavePlusNewBtn"
              className="text-white px-4 py-1 rounded"
            >
              Save + New
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AddGuestCard;
