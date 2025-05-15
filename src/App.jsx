import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import EventsPage from "./pages/EventsPage/EventsPage.jsx";
import EventPage from "./pages/EventPage/EventPage.jsx";
import NotFound from "./pages/NotFound.jsx";

const transitionProps = {
  initial: { opacity: 0, y: 50 }, // Enters from bottom
  animate: { opacity: 1, y: 0 }, // Settles in place
  exit: { opacity: 0, y: -50 }, // Exits upward
  transition: { duration: 0.3, ease: "easeOut" },
};

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div {...transitionProps}>
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div {...transitionProps}>
                <LoginPage />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div {...transitionProps}>
                <RegisterPage />
              </motion.div>
            }
          />
          <Route
            path="/events"
            element={
              <motion.div {...transitionProps}>
                <EventsPage />
              </motion.div>
            }
          />
          <Route
            path="/event/:id"
            element={
              <motion.div {...transitionProps}>
                <EventPage />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div {...transitionProps}>
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
