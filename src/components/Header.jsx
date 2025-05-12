import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../contexts/authContext.jsx";
import HeaderDropdown from "./HeaderDropdown.jsx";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className={styles.container}>
      <div onClick={() => navigate("/")} className={styles.logo}>
        GuestFlow
      </div>
      {user ? (
        <div className={`flex items-center gap-4 ${styles.authContainer}`}>
          <h3 className="margin-zero">
            Logged in as: <br></br>
            <b className="underline">{`${user?.first_name} ${user?.last_name}`}</b>
          </h3>
          <HeaderDropdown />
        </div>
      ) : (
        <div className={`flex items-center gap-4`}>
          <button
            onClick={() => navigate("/register")}
            className={`${styles.registerBtn} px-4 py-2 rounded`}
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
