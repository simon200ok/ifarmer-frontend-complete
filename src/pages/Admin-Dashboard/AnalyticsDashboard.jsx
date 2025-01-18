import { Line, Pie } from "react-chartjs-2";
import "./AnalyticsDashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);

  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning, Admin";
    } else if (currentHour < 18) {
      return "Good Afternoon, Admin";
    } else {
      return "Good Night, Admin";
    }
  };

  const years = Array.from({ length: 2099 - 2025 + 1 }, (_, i) => 2025 + i);

  const fetchData = async (year) => {
    setLoading(true);
    try {
      const [usageTimeResponse, demographicsResponse] = await Promise.all([
        axios.get(
          `http://localhost:8080/api/v1/admin/average-usage-time?year=${year}`
        ),
        axios.get(`http://localhost:8080/api/v1/admin/user-demographics`),
      ]);

      setLineChartData({
        labels: Object.keys(usageTimeResponse.data),
        datasets: [
          {
            label: `Average Usage Time (${year})`,
            data: Object.values(usageTimeResponse.data),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      });

      const maleCount = demographicsResponse.data.male;
      const femaleCount = demographicsResponse.data.female;
      const totalUsers = maleCount + femaleCount;

      const malePercentage =
        totalUsers > 0 ? (maleCount / totalUsers) * 100 : 0;
      const femalePercentage =
        totalUsers > 0 ? (femaleCount / totalUsers) * 100 : 0;

      setPieChartData({
        labels: ["Male", "Female"],
        datasets: [
          {
            data: [malePercentage, femalePercentage],
            backgroundColor: ["#36A2EB", "#FF6384"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      });
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const renderCustomLegend = () => {
    if (!pieChartData || !pieChartData.labels) return null;

    return pieChartData.labels.map((label, index) => {
      const color = pieChartData.datasets[0].backgroundColor[index];
      const percentage = pieChartData.datasets[0].data[index];

      return (
        <div key={label} className="custom-legend-item">
          <span
            className="custom-legend-dot"
            style={{ backgroundColor: color }}
          ></span>
          <span className="custom-legend-text">{label}</span>
          <span className="custom-legend-percentage">{`${percentage.toFixed(
            2
          )}%`}</span>
        </div>
      );
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="analytics-dashboard-container">
      <h1>{getCurrentGreeting()}</h1>

      <div className="chart-container line-chart-container">
        <div className="line-chart-header">
          <h2>Average Usage Time</h2>
          <div className="dropdown-wrapper">
            <select
              value={
                selectedYear === new Date().getFullYear().toString()
                  ? "Current Year"
                  : selectedYear
              }
              onChange={handleYearChange}
              className="styled-dropdown"
            >
              <option value="Current Year">Current Year</option>
              {years
                .filter((year) => year !== "2025")
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>

            <span className="dropdown-icon">
              {" "}
              <ChevronDown />
            </span>
          </div>
        </div>
        {lineChartData && (
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `Total Duration: ${context.raw}`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Usage Time (in minutes)",
                  },
                  ticks: {
                    stepSize: 50,
                    max: 250,
                    min: 0,
                    callback: function (value) {
                      return value % 50 === 0 ? value : "";
                    },
                  },

                  suggestedMin: 0,
                  suggestedMax: 250,
                },
              },
            }}
          />
        )}
      </div>

      <div className="chart-container pie-chart-container">
        <h2>User Demographics</h2>
        {pieChartData && (
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        )}
        <div className="custom-legend">{renderCustomLegend()}</div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
