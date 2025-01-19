import { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import "../pages/AddTaskAndInventory.css";
import "./UpcomingTask.css";
import "./CropPage.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

function AddNewTask({ onClose }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    type: "",
    dueDate: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    location: "",
    category: "",
    type: "",
    dueDate: "",
    description: "",
  });

  const categoryOptions = {
    ANIMAL: "Animal",
    CROP: "Crop",
    INVENTORY: "Inventory",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in before adding a task.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/tasks/create?category=${formData.category}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            location: formData.location,
            type: formData.type,
            dueDate: formData.dueDate + "T00:00:00",
            description: formData.description,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Task created successfully:", data);
        toast.success("Task created successfully!");
        setTimeout(() => {
          navigate("/homepage/crops");
        }, 3000);
      } else {
        const errorDetails = await response.json();
        console.error("Failed to create task:", errorDetails);
        toast.error(errorDetails.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-new-task-modal">
    <div className="openModal">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="modal-form">
        <div>
          <h4>Add New Task</h4>
          <button onClick={onClose} className="close">
            <X />
          </button>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Object.entries(categoryOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {formErrors.category && (
            <p className="error">{formErrors.category}</p>
          )}
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
          {formErrors.type && <p className="error">{formErrors.type}</p>}
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          {formErrors.location && (
            <p className="error">{formErrors.location}</p>
          )}
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
          {formErrors.dueDate && <p className="error">{formErrors.dueDate}</p>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {formErrors.description && (
            <p className="error">{formErrors.description}</p>
          )}
        </div>
        <div className="buttonContainer">
          <button type="submit">Save Task</button>
        </div>
      </form>
    </div>
    </div>
  );
}

AddNewTask.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddNewTask;
