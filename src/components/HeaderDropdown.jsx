import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import styles from "./HeaderDropdown.module.css";

const HeaderDropdown = () => {
  const [open, setOpen] = useState(false);
  const { setLogout } = useAuth();

  return (
    <div className="relative inline-block text-left flex">
      <button
        onClick={() => setOpen(!open)}
        className={`${styles.button} text-2xl p-2 rounded hover:bg-gray-100`}
      >
        ☰
      </button>

      {open && (
        <div
          className={`${styles.menu} absolute right-0 mt-2 w-60 md:w-40 border rounded shadow-md flex flex-col p-1`}
        >
          <button
            className="p-0 md:px-4 py-2 text-left hover:bg-gray-100"
            title="Settings"
          >
            ⚙️ Settings
          </button>
          <button
            onClick={setLogout}
            className="p-0 md:px-4 md:py2 text-left hover:bg-gray-100"
            title="Logout"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
