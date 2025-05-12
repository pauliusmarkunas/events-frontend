const GuestCard = ({ guest, setEditGuestStatus }) => {
  return (
    <>
      <div
        onClick={() => setEditGuestStatus(guest.id)}
        className={` grid grid-cols-12  bg-gray-200 px-2 py-2 rounded mb-2 relative`}
      >
        <span className="col-span-5">{guest?.full_name || "full_name"}</span>
        <span className="col-span-4">{guest?.email || "Email Address"}</span>
        <span className="col-span-3">{guest?.birth_year || "Birth Year"}</span>
      </div>
    </>
  );
};

export default GuestCard;
