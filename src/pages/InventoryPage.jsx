import { useEffect, useState } from "react";
import dots from "../assets/icons/dots.png";
import Tractor from "../assets/tractor.png";
import Arrow from "../assets/arrow.png";
import "./InventoryPage.css";
import InventoryUpcomingTask from "./InventoryUpcomingTask";
import AddNewInventory from "./AddNewInventory";

function InventoryPage() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [inventoryStatusCounts, setInventoryStatusCounts] = useState({
    VALUE: 0.00,
    TOTAL: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedFirstName = localStorage.getItem("firstName");

    setFirstName(storedFirstName);

    if (!token) {
      console.error("No token found");
      return;
    }

    const statusCountApi = "http://localhost:8080/api/v1/crops/status-count";
    console.log("Fetching crop status counts from:", statusCountApi);

    fetch(statusCountApi, {
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
        setInventoryStatusCounts({
          ...data,
          TOTAL: total,
        });
      })
      .catch((error) =>
        console.error("Error fetching crop status counts:", error)
      );

    const allInventoriesApi =
      "http://localhost:8080/api/v1/crops/statistics/get_all_crops_by_user";
    console.log("Fetching all crops from:", allInventoriesApi);

    fetch(allInventoriesApi, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.responseData)) {
          setInventories(data.responseData);
        } else {
          setInventories([]);
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => console.error("Error fetching crops:", error));
  }, []);

  const getInventoryCountText = (count) => {
    return `${count} Inventory${count === 1 ? "" : "s"}`;
  };

  return (
    <div className="containers">
      <div className="inventory-wrapper">
        <div className="greetings">
          <h1>
            {getCurrentGreeting()}, {firstName}
          </h1>
        </div>
        <div className="background_inventory">
          <div className="green_inventory">
            <h1>Manage Your Inventory</h1>
            <div className="inventory">
              <div className="total">
                <h1>Total Inventory</h1>
                <p>{getInventoryCountText(inventoryStatusCounts.TOTAL)}</p>
              </div>
              <div className="total">
                <h1>Inventory Value</h1>
                <p>{getInventoryCountText(inventoryStatusCounts.COST)}</p>
              </div>
            </div>
            <a onClick={() => setIsModalOpen(true)}>
              Add New Inventory
              <span>
                <img src={Arrow} alt="arrow Icon" />
              </span>
            </a>
          </div>
          <div className="inventory-image">
            <img src={Tractor} alt="tractor Image" />
          </div>
        </div>
        <div className="table">
          <h1>Current Inventory</h1>
          <table border="1">
            <thead>
              <tr>
                <th>Item Type</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Date Acquired</th>
                <th>Cost/Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {inventories.map((inventory) => (
                <tr key={inventory.inventoryId}>
                  <td>{inventory.category}</td>
                  <td>{inventory.name}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.location}</td>
                  <td>{inventory.dateAcquired}</td>
                  <td>{inventory.cost}</td>
                  <td>
                    <img src={dots} alt="Menu" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <AddNewInventory onClose={() => setIsModalOpen(false)} />
      )}
      <InventoryUpcomingTask />
    </div>
  );
}

export default InventoryPage;
