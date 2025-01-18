import { useEffect, useState, useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";
import "./Dashboard.css";
import Tomato from "../../assets/tomato.png";

// Register all required components
ChartJS.register(...registerables);

const Dashboard = () => {
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Night";
    }
  };

  const [glanceData, setGlanceData] = useState(null);
  const [weeklyActiveData, setWeeklyActiveData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [currentActiveUsers, setCurrentActiveUsers] = useState(0);

  const getStartOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const difference = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Adjust for Monday being the start of the week
    const startOfWeek = new Date(now.setDate(now.getDate() + difference));
    startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight

    // Format as YYYY-MM-DDTHH:mm:ss
    const formattedDate = startOfWeek
      .toLocaleString("sv-SE", { timeZone: "UTC" }) // Ensures ISO-like format in local timezone
      .replace(" ", "T");
    return formattedDate;
  };

  useEffect(() => {
    setAdminName(localStorage.getItem("adminName") || "Admin");

    const fetchData = async () => {
      try {
        const startOfWeekISO = getStartOfWeek();
        const glanceResponse = await axios.get(
          "http://localhost:8080/api/v1/admin/glance"
        );
        const weeklyActiveResponse = await axios.get(
          `http://localhost:8080/api/v1/admin/weekly-logins?startOfWeek=${startOfWeekISO}`
        );
        const userGrowthResponse = await axios.get(
          "http://localhost:8080/api/v1/admin/user-growth"
        );
        const currentActiveUsers = await axios.get(
          "http://localhost:8080/api/v1/admin/current-active-users"
        );

        setGlanceData(glanceResponse.data);
        setWeeklyActiveData(weeklyActiveResponse.data);
        setUserGrowthData(userGrowthResponse.data);
        setCurrentActiveUsers(currentActiveUsers.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Weekly Active Users Chart Data
  const weeklyActiveChartData = useMemo(
    () => ({
      datasets: [
        {
          label: "Weekly Active Users",
          data: weeklyActiveData,
          backgroundColor: "darkgreen",
          borderRadius: 50,
          borderWidth: 0,
          barThickness: 20, // Adjust bar thickness here
        },
      ],
    }),
    [weeklyActiveData]
  );

  const weeklyActiveChartOptions = useMemo(
    () => ({
      responsive: true,
      scales: {
        x: {
          grid: {
            display: true, // Optional: Hide grid lines
          },
        },
        y: {
          ticks: {
            stepSize: 2,
          },
          beginAtZero: true,
        },
      },
    }),
    []
  );

  // User Growth Chart Data
  const userGrowthChartData = useMemo(
    () => ({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "User Growth",
          data: userGrowthData,
          borderColor: "#2196f3",
          fill: true,
          backgroundColor: "rgba(3, 255, 221, 0.2)",
        },
      ],
    }),
    [userGrowthData]
  );

  const userGrowthChartOptions = useMemo(
    () => ({
      responsive: true,
      scales: {
        x: {
          grid: {
            display: true, // Optional: Hide grid lines
          },
        },
        y: {
          grid: {
            display: true, // Optional: Hide grid lines
          },
          ticks: {
            stepSize: 5,
          },
          beginAtZero: true,
        },
      },
    }),
    []
  );

  return (
    <div className="dashboard-container">
      <div className="frame1">
        <div className="greetings">
          <h1>
            {getCurrentGreeting()}, {adminName}
          </h1>
        </div>

        <div className="background">
          <div className="green">
            <h1>Your Farm at a Glance</h1>
            {glanceData && (
              <div className="green1">
                <div className="total-info">
                  <div className="total">
                    <h1>Total Users</h1>
                    <p>{glanceData.totalUsers}</p>
                  </div>
                  <div className="total">
                    <h1>Active Users</h1>
                    <p>{currentActiveUsers}</p>
                  </div>
                </div>

                <div className="new-registrations">
                  <h1>New Registrations</h1>
                  <p>{glanceData.newUsers} New Users (Last 24 hours)</p>
                </div>
              </div>
            )}
          </div>
          <div className="crop-image">
            <img src={Tomato} alt="tomato guy" />
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-item">
          <h3>User Growth</h3>
          <Line data={userGrowthChartData} options={userGrowthChartOptions} />
        </div>
        <div className="chart-item">
          <h3>Weekly Active Users</h3>
          <Bar
            data={weeklyActiveChartData}
            options={weeklyActiveChartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
