import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { getEventsStats, getOrganizersStats } from "../api/statsRequests";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState("total");
  const [statsData, setStatsData] = useState({
    total: { events: 0, guests: 0, organizers: 0 },
    week: { events: 0, guests: 0, organizers: 0 },
  });

  const [activeData, setActiveData] = useState({
    events: 0,
    guests: 0,
    organizers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await getEventsStats();
        const organizersResponse = await getOrganizersStats();
        if (
          eventsResponse.status === 200 &&
          organizersResponse.status === 200
        ) {
          const eventData = eventsResponse.data.stats;
          const organizerData = organizersResponse.data.stats;

          setStatsData({
            total: {
              events: eventData.total_events || 0,
              guests: eventData.total_guests || 0,
              organizers: organizerData.total_organizers || 0,
            },
            week: {
              events: eventData.events_created_last_week || 0,
              guests: eventData.guests_registered_last_week || 0,
              organizers: organizerData.organizers_added_last_week || 0,
            },
          });

          handleTimePeriodChange("total");
          console.log(eventsResponse.data, organizersResponse.data);
        }
      } catch (error) {
        console.error("Error fetching stats data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  useEffect(() => {
    console.log("Time period changed:", timePeriod);
    // This will run whenever statsData or timePeriod changes
    setActiveData({
      events: statsData[timePeriod].events,
      guests: statsData[timePeriod].guests,
      organizers: statsData[timePeriod].organizers,
    });
  }, [timePeriod, statsData]);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={`${styles.heroSection} py-16`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className={`${styles.heroHeading} mb-6`}>
            Make Your Event Management Simple
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Easy to use tool for organizers, register guests for all your events
          </p>
          <button
            onClick={() => navigate("/register")}
            className={`${styles.ctaButton} rounded-lg`}
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className={`${styles.aboutSection}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                About Us
              </h2>
              <div>
                <p className="text-gray-600 mb-4">
                  We're transforming event management through easy to use and
                  user-centered design. Our platform empowers organizers to
                  track event guest easily and efficiently.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Real-time guest management</li>
                <li>Advanced analytics</li>
                <li>Customizable check-in solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Platform Statistics
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleTimePeriodChange("total")}
                className={`px-6 py-2 rounded-full ${
                  timePeriod === "total"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-colors`}
              >
                All Time
              </button>
              <button
                onClick={() => handleTimePeriodChange("week")}
                className={`px-6 py-2 rounded-full ${
                  timePeriod === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-colors`}
              >
                Last Week
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-gray-600 mb-2">Events Created</h3>
              <p className="text-4xl font-bold text-blue-600">
                {activeData.events}
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl">
              <h3 className="text-gray-600 mb-2">Guests Registered</h3>
              <p className="text-4xl font-bold text-green-600">
                {activeData.guests}
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl">
              <h3 className="text-gray-600 mb-2">Organizers Joined</h3>
              <p className="text-4xl font-bold text-red-600">
                {activeData.organizers}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Join hundreds of organizers already revolutionizing their events
          </p>
          <button
            onClick={() => navigate("/register")}
            className={`${styles.ctaButton} rounded-lg`}
          >
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// process
// load data on initial render,
// set data to variable
