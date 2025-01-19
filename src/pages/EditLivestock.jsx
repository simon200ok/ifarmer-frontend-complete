import { useState, useEffect } from "react";
import "./EditLivestock.css";
import axios from "axios";
import EditTagInput from "../modals/EditTagInput.jsx";
import { useParams, useNavigate } from "react-router";
import LivestockUpcomingTask from "./LivestockUpcomingTask.jsx";
import BackArrow from "../assets/arrow-back.png";

const EditLivestock = () => {
  const { id } = useParams();
  // const [livestock, setLivestock] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    animalName: "",
    animalType: "",
    breed: "",
    quantity: 0,
    age: "",
    location: "",
    animalStatus: "",
    feedingSchedule: "",
    wateringFrequency: "",
    vaccinationSchedule: "",
    healthIssues: [],
    description: "",
    photo: null,
  });

  const animalStatusOptions = {
    HEALTHY: "Healthy",
    LAYING_EGGS: "Laying Eggs",
    BREEDING: "Breeding",
  };

  const animalTypeOptions = {
    CATTLE: "Cattle",
    SHEEP: "Sheep",
    GOAT: "Goat",
    PIG: "Pig",
    POULTRY: "Poultry",
    HORSE: "Horse",
    RABBIT: "Rabbit",
    BEE: "Bee",
    FISH: "Fish",
    OTHER: "Other",
  };

  const feedingScheduleOptions = {
    EVERY_DAY: "Every day",
    EVERY_MONDAY: "Every Monday",
    EVERY_TUESDAY: "Every Tuesday",
    EVERY_WEDNESDAY: "Every Wednesday",
    EVERY_THURSDAY: "Every Thursday",
    EVERY_FRIDAY: "Every Friday",
    TWICE_A_WEEK: "Twice a week",
  };

  const wateringFrequencyOptions = {
    EVERY_DAY: "Every day",
    EVERY_MONDAY: "Every Monday",
    EVERY_TUESDAY: "Every Tuesday",
    EVERY_WEDNESDAY: "Every Wednesday",
    EVERY_THURSDAY: "Every Thursday",
    EVERY_FRIDAY: "Every Friday",
    TWICE_A_WEEK: "Twice a week",
  };

  const handleBack = () => {
    navigate("/homepage/livestock");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (tags) => {
    setFormData({ ...formData, healthIssues: tags });
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("Invalid livestock ID.");
      return;
    }
    const data = new FormData();

    console.log("Form Data before conversion:", formData);

    const livestockData = JSON.stringify({
      animalName: formData.animalName,
      animalType: formData.animalType,
      breed: formData.breed,
      quantity: formData.quantity,
      age: formData.age,
      location: formData.location,
      animalStatus: formData.animalStatus,
      feedingSchedule: formData.feedingSchedule,
      wateringFrequency: formData.wateringFrequency,
      vaccinationSchedule: formData.vaccinationSchedule,
      healthIssues: Array.isArray(formData.healthIssues)
        ? formData.healthIssues.join(", ")
        : "",
      description: formData.description,
    });

    console.log("Livestock Data (JSON):", livestockData);

    data.append("data", livestockData);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    console.log("Form Data Object:");
    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authorization token is missing.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/livestock/updateLivestock?animalId=${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (response.ok) {
        alert("Livestock data saved successfully!");
        navigate("/homepage/livestock");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to update livestock data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating livestock data:", error);
      alert("An error occurred while saving livestock data.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Configuration error: API base URL or token is not defined");
      return;
    }

    const fetchLivestockData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/resources",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          const selectedLivestock = response.data.responseData.livestock.find(
            (item) => item.animalId === parseInt(id)
          );
          setFormData({
            animalName: selectedLivestock.animalName || "",
            animalType: selectedLivestock.animalType || "",
            breed: selectedLivestock.breed || "",
            quantity: selectedLivestock.quantity || 0,
            age: selectedLivestock.age || "",
            location: selectedLivestock.location || "",
            animalStatus: selectedLivestock.animalStatus || "",
            feedingSchedule: selectedLivestock.feedingSchedule || "",
            wateringFrequency: selectedLivestock.wateringFrequency || "",
            vaccinationSchedule: selectedLivestock.vaccinationSchedule || "",
            healthIssues: selectedLivestock.healthIssues || [],
            description: selectedLivestock.description || "",
          });
        } else {
          console.error("Failed to fetch livestock data");
        }
      } catch (error) {
        console.error("Error fetching livestock data:", error);
        setError("Error fetching livestock data.");
      }
    };

    fetchLivestockData();
  }, [id]);

  // const handleSave = () => {
  //   console.log("Saved data:", formData);
  //   navigate("/");
  // };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="edit-livestock-container">
      <div className="form-container">
        <div className="edit-back-btn-div">
          <button className="edit-back-btn" onClick={handleBack}>
            <span>
              <img src={BackArrow} alt="arrow Icon" />
            </span>
            Back
          </button>
        </div>
        <div className="cattle-livestock">
          <h3>Cattle Livestock</h3>
        </div>

        <div className="form-container-field">
          <div className="field-area">
            <h4>Animal Name</h4>
            <input
              type="text"
              name="animalName"
              value={formData.animalName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-area">
            <h4>Animal Type</h4>
            <select
              name="animalType"
              value={formData.animalType}
              onChange={handleChange}
              required
            >
              <option value="">Select Animal Type</option>
              {Object.entries(animalTypeOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="field-area">
            <h4>Breed</h4>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-area">
            <h4>Quantity</h4>
            <input
              type="number"
              name="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-area">
            <h4>Age</h4>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-area">
            <h4>Location</h4>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-area">
            <h4>Animal Status</h4>
            <select
              name="animalStatus"
              value={formData.animalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Animal Status</option>
              {Object.entries(animalStatusOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="field-area">
            <h4>Feeding Schedule</h4>
            <select
              name="feedingSchedule"
              value={formData.feedingSchedule}
              onChange={handleChange}
              required
            >
              <option value="">Select Feeding Schedule</option>
              {Object.entries(feedingScheduleOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="field-area">
            <h4>Watering Frequency</h4>
            <select
              name="wateringFrequency"
              value={formData.wateringFrequency}
              onChange={handleChange}
              required
            >
              <option value="">Select Watering Frequency</option>
              {Object.entries(wateringFrequencyOptions).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="field-area">
            <h4>Vaccination Schedule</h4>
            <input
              type="date"
              name="vaccinationSchedule"
              value={formData.vaccinationSchedule}
              onChange={handleChange}
            />
          </div>
          <div className="field-area">
            <h4>Health Issues</h4>
            <EditTagInput
              tags={formData.healthIssues}
              setTags={handleTagsChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                textAlign: "left",
                boxSizing: "border-box",
                flex: "2",
                marginRight: "25%",
              }}
            />
          </div>
          <div className="field-area">
            <h4>Description</h4>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="buttonContainer">
          <button type="button" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
      <LivestockUpcomingTask />
    </div>
  );
};

export default EditLivestock;
