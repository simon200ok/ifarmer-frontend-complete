import { useState } from "react";
import { X } from "lucide-react";
import TagInput from "./tagInput";
import PhotoUploadInput from "./PhotoUploadInput";
import "./AddNewCropAndLivestock.css";

// eslint-disable-next-line react/prop-types
const AddNewLivestock = ({ onClose }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUploadChange = (updatedPhoto) => {
    setFormData((prev) => ({ ...prev, photo: updatedPhoto }));
  };

  const handleTagsChange = (tags) => {
    setFormData({ ...formData, healthIssues: tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Permission denied! Please log in.");
      return;
    }

    const data = new FormData();

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
      healthIssues: formData.healthIssues.join(", "),
      description: formData.description,
    });

    data.append("data", livestockData);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/livestock/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (response.ok) {
        alert("Livestock data saved successfully!");
        // navigate("/");
      } else {
        alert("Failed to save livestock data, please check fields.");
      }
    } catch (error) {
      console.error("Error saving livestock data:", error);
      alert("An error occurred while saving livestock data.");
    }
  };

  return (
    <div className="modal-e">
      <form className="form-e" onSubmit={handleSubmit}>
        <div className="div-field">
          <h4>Add New Livestock</h4>
          <button type="button" onClick={onClose} className="xButton-e">
            <X />
          </button>
        </div>

        <div className="div-field">
          <h4>Animal Name</h4>
          <input
            type="text"
            name="animalName"
            value={formData.animalName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="div-field">
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

        <div className="div-field">
          <h4>Breed</h4>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>

        <div className="div-field">
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

        <div className="div-field">
          <h4>Age</h4>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="div-field">
          <h4>Location</h4>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="div-field">
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

        <div className="div-field">
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

        <div className="div-field">
          <h4>Watering Frequency</h4>
          <select
            name="wateringFrequency"
            value={formData.wateringFrequency}
            onChange={handleChange}
            required
          >
            <option value="">Select Watering Frequency</option>
            {Object.entries(wateringFrequencyOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="div-field">
          <h4>Vaccination Schedule</h4>
          <input
            type="date"
            name="vaccinationSchedule"
            value={formData.vaccinationSchedule}
            onChange={handleChange}
            required
          />
        </div>

        <div className="div-field">
          <h4>Health Issues</h4>
          <TagInput tags={formData.healthIssues} setTags={handleTagsChange} />
        </div>

        <div className="div-field">
          <h4>Photo Upload</h4>
          <PhotoUploadInput
            formData={{ photo: formData.photo }}
            setFormData={(updatedFormData) =>
              handlePhotoUploadChange(updatedFormData.photo)
            }
          />
        </div>

        <div className="div-field">
          <h4>Description</h4>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="buttonContainer-e">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewLivestock;
