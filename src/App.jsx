import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import EventsPage from "./pages/EventsPage/EventsPage.jsx";
import EventPage from "./pages/EventPage/EventPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
