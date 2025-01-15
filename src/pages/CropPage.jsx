import { useEffect, useState } from "react";

import dots from "../assets/icons/dots.png";

import Corn from "../assets/corn.png";
import Arrow from "../assets/arrow.png";

import "./CropPage.css";
import UpcomingTask from "./UpcomingTask";

function CropPage() {
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

  const [crops, setCrops] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [cropStatusCounts, setCropStatusCounts] = useState({
    GROWING: 0,
    FLOWERING: 0,
    TOTAL: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedFirstName = localStorage.getItem("firstName");

    setfirstName(storedFirstName);

    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("http://localhost:8080/api/v1/crops/status-count", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const total = Object.values(data).reduce(
          (acc, count) => acc + count,
          0
        );
        setCropStatusCounts({
          ...data,
          TOTAL: total,
        });
      })
      .catch((error) =>
        console.error("Error fetching crop status counts:", error)
      );

    fetch(
      "http://localhost:8080/api/v1/crops/statistics/get_all_crops_by_user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.responseData)) {
          setCrops(data.responseData);
        } else {
          setCrops([]);
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => console.error("Error fetching crops:", error));
  }, []);

  const getCropCountText = (count) => {
    return `${count} Crop${count === 1 ? "" : "s"}`;
  };

  return (
    <div className="containers">
      <div className="crop-wrapper">
        <div className="greetings">
          <h1>
            {getCurrentGreeting()}, {firstName}
          </h1>
        </div>
        <div className="background">
          <div className="green">
            <h1>Manage Your Crops</h1>
            <div className="crop">
              <div className="total">
                <h1>Total Crops</h1>
                <p>{getCropCountText(cropStatusCounts.TOTAL)}</p>
              </div>
              <div className="total">
                <h1>Mature Crops</h1>
                <p>{getCropCountText(cropStatusCounts.GROWING)}</p>
              </div>
              <div className="total">
                <h1>Flowering Crops</h1>
                <p>{getCropCountText(cropStatusCounts.FLOWERING)}</p>
              </div>
            </div>
            <a>
              Add new Crop
              <span>
                <img src={Arrow} alt="arrow Icon" />
              </span>
            </a>
          </div>
          <div className="crop-image">
            <img src={Corn} alt="corn Image" />
          </div>
        </div>
        <div className="table">
          <h1>Current Crops</h1>
          <table border="1">
            <thead>
              <tr>
                <th>Crop name</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Sow Date</th>
                <th>Harvest Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop.cropId}>
                  <td>{crop.cropName}</td>
                  <td>{crop.cropStatus}</td>
                  <td>{crop.quantity}</td>
                  <td>{crop.location}</td>
                  <td>{crop.sowDate}</td>
                  <td>{crop.harvestDate}</td>
                  <td>
                    <img src={dots} alt="Menu" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpcomingTask />
    </div>
  );
}

export default CropPage;
