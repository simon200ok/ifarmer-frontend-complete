import { useState, useEffect } from "react";
import axios from "axios";
import livestockImage from "../assets/livestock.png";
import Arrow from "../assets/arrow.png";
import LivestockUpcomingTask from "./LivestockUpcomingTask";
import "./LivestockPage.css";
import dots from "../assets/icons/dots.png";
import AddNewLivestock from "../modals/AddNewLivestock";
import { useNavigate } from "react-router";

function LivestockPage() {
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const [data, setData] = useState({ totalCrops: null, totalLivestock: null });
  const [livestockData, setLivestockData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedFirstName = localStorage.getItem("firstName");

    setFirstName(storedFirstName || "User");

    if (!token) {
      console.error("No token found");
      setError("No authentication token found");
      return;
    }

    axios
      .get("http://localhost:8080/api/user/resources/total", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });

    axios
      .get("http://localhost:8080/api/user/resources", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data) {
          setLivestockData(response.data.responseData.livestock || []);
        } else {
          console.error("No livestock data found");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleRowClick = (animalId) => {
    navigate(`/homepage/update-livestock/${animalId}`);
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  //   const formatDate = (date) => {
  //     const d = new Date(date);
  //     return isNaN(d) ? date : `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  //   };

  const formatDate = (dateArray) => {
    if (Array.isArray(dateArray) && dateArray.length >= 3) {
      const [year, month, day] = dateArray;
      const formattedDay = day.toString().padStart(2, "0");
      const formattedMonth = month.toString().padStart(2, "0");
      return `${formattedDay}/${formattedMonth}/${year}`;
    }
    return "Invalid Date";
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="containers">
      <div className="livestock-wrapper">
        <div className="greetings">
          <h1>
            {getCurrentGreeting()}, {firstName}
          </h1>
        </div>
        <div className="background_livestock">
          <div className="green_livestock">
            <h1>Manage Your Livestock</h1>
            <div className="total_livestock">
              <h1>Total Livestock</h1>
              <p>
                {data.totalLivestock !== null
                  ? `${data.totalLivestock} Livestock`
                  : "No data available"}
              </p>
            </div>
            <button onClick={toggleModal} className="add-livestock-btn">
              Add new Livestock
              <span>
                <img src={Arrow} alt="arrow Icon" />
              </span>
            </button>
          </div>
          <div className="livestock-image">
            <img src={livestockImage} alt="livestock" />
          </div>
        </div>

        <div className="livestock-table">
          <h1>Current Livestock</h1>
          <table border="1">
            <thead>
              <tr>
                <th>Animal Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Location</th>
                <th>Date Acquired</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {livestockData.map((data) => (
                <tr
                  key={data.animalId}
                  onClick={() => handleRowClick(data.animalId)}
                >
                  <td>{capitalize(data.animalName)}</td>
                  <td>{data.quantity}</td>
                  <td>{capitalize(data.animalStatus)}</td>
                  <td>{capitalize(data.location)}</td>
                  <td>{formatDate(data.createdAt)}</td>
                  <td>
                    <img src={dots} alt="Menu" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && <AddNewLivestock onClose={toggleModal} />}
      </div>
      <LivestockUpcomingTask />
    </div>
  );
}

export default LivestockPage;
