import React, { useState } from "react";
import { X } from "lucide-react";
import TagInput from "./tagInput";
import PhotoUploadInput from "./PhotoUploadInput";
import "./AddNewCropAndLivestock.css";

const AddNewCrop = ({ onClose }) => {
  const [formData, setFormData] = useState({
    cropName: "",
    cropType: "",
    plantingSeason: "",
    harvestDate: "",
    sowDate: "",
    numberOfSeedlings: 0,
    costOfSeedlings: 0,
    wateringFrequency: "",
    fertilizingFrequency: "",
    pestsAndDiseases: [],
    quantity: "",
    location: "",
    cropStatus: "",
    description: "",
    photo: null,
  });

  const cropTypeOptions = {
    CEREAL: "Cereal",
    LEGUME: "Legume",
    FRUIT: "Fruit",
    VEGETABLE: "Vegetable",
    TUBER: "Tuber",
    OILSEED: "Oilseed",
    FORAGE_CROP: "Forage Crop",
    FIBER_CROP: "Fiber Crop",
    SPICE: "Spice",
    MEDICAL_PLANT: "Medical Plant",
    AROMATIC_PLANT: "Aromatic Plant",
    PULSE: "Pulse",
  };

  const plantingSeasonOptions = {
    SUMMER: "Summer",
    WINTER: "Winter",
    AUTUMN: "Autumn",
    SPRING: "Spring",
    PERENNIAL: "Perennial",
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

  const fertilizingFrequencyOptions = {
    EVERY_DAY: "Every day",
    EVERY_MONDAY: "Every Monday",
    EVERY_TUESDAY: "Every Tuesday",
    EVERY_WEDNESDAY: "Every Wednesday",
    EVERY_THURSDAY: "Every Thursday",
    EVERY_FRIDAY: "Every Friday",
    TWICE_A_WEEK: "Twice a week",
  };

  const cropStatusOptions = {
    GROWING: "Growing",
    FLOWERING: "Flowering",
    MATURING: "Maturing",
    SEEDLING_STAGE: "Seedling Stage",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUploadChange = (updatedPhoto) => {
    setFormData((prev) => ({ ...prev, photo: updatedPhoto }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleTagsChange = (tags) => {
    setFormData({ ...formData, pestsAndDiseases: tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem("token");
    if (!token) {
      alert("Permission denied! Please log in.");
      return;
    }

    const handleClose = () => {
      console.log("Close button clicked");
      onClose();
    };

    const data = new FormData();

    const cropData = JSON.stringify({
      cropName: formData.cropName,
      cropType: formData.cropType,
      plantingSeason: formData.plantingSeason,
      harvestDate: formData.harvestDate,
      sowDate: formData.sowDate,
      numberOfSeedlings: formData.numberOfSeedlings,
      costOfSeedlings: formData.costOfSeedlings,
      wateringFrequency: formData.wateringFrequency,
      fertilizingFrequency: formData.fertilizingFrequency,
      pestsAndDiseases: formData.pestsAndDiseases.join(", "),
      quantity: formData.quantity,
      location: formData.location,
      cropStatus: formData.cropStatus,
      description: formData.description,
    });

    data.append("data", cropData);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/crops/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        alert("Crop data saved successfully!");
      } else {
        alert("Failed to save crop data, please check fields.");
      }
    } catch (error) {
      console.error("Error saving crop data:", error);
      alert("An error occurred while saving crop data.");
    }
  };

  return (
    <div className="modal-e">
      <form className="form-e" onSubmit={handleSubmit}>
        <div className="div-field">
          <h4>Add New Crop</h4>
          <button type="button" onClick={onClose} className="xButton-e" >
            <X />
          </button>
        </div>

        <div className="div-field">
          <h4>Crop Name</h4>
          <input type="text" name="cropName" value={formData.cropName} onChange={handleChange} required />
        </div>

        <div className="div-field">
          <h4>Crop Type</h4>
          <select name="cropType" value={formData.cropType} onChange={handleChange} required>
            <option value="">Select Crop Type</option>
            {Object.entries(cropTypeOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="div-field">
          <h4>Planting Season</h4>
          <select name="plantingSeason" value={formData.plantingSeason} onChange={handleChange} required>
            <option value="">Select Season</option>
            {Object.entries(plantingSeasonOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="div-field">
          <h4>Sow Date</h4>
          <input type="date" name="sowDate" value={formData.sowDate} onChange={handleChange} required />
        </div>

        <div className="div-field">
          <h4>Harvest Date</h4>
          <input type="date" name="harvestDate" value={formData.harvestDate} onChange={handleChange} required />
        </div>

        <div className="div-field">
          <h4>Number of Seedlings</h4>
          <input type="number" name="numberOfSeedlings" min="0" value={formData.numberOfSeedlings} onChange={handleChange} required />
        </div>

        <div className="div-field">
          <h4>Cost of Seedlings</h4>
          <input type="number" name="costOfSeedlings" min="0" value={formData.costOfSeedlings} onChange={handleChange} required />
        </div>

        <div className="div-field">
          <h4>Watering Frequency</h4>
          <select name="wateringFrequency" value={formData.wateringFrequency} onChange={handleChange} required>
            {Object.entries(wateringFrequencyOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="div-field">
          <h4>Fertilizing Frequency</h4>
          <select name="fertilizingFrequency" value={formData.fertilizingFrequency} onChange={handleChange} required>
            <option value="">Select Frequency</option>
            {Object.entries(fertilizingFrequencyOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="div-field">
          <h4>Pests and Diseases</h4>
          <TagInput tags={formData.pestsAndDiseases} setTags={handleTagsChange} />
        </div>


        <div className="div-field">
          <h4>Quantity</h4>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>

        <div className="div-field">
          <h4>Location</h4>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="div-field">
          <h4>Status</h4>
          <select name="cropStatus" value={formData.cropStatus} onChange={handleChange} required>
            <option value="">Select Crop Status</option>
            {Object.entries(cropStatusOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
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
}

export default AddNewCrop;
