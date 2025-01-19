import { useState } from "react";
import { X, FolderOpen } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import "./AddNewInventory.css";

function AddNewInventory({ onClose }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        itemType: "",
        name: "",
        location: "",
        condition: "",
        category: "",
        quantity: "",
        dateAcquired: "",
        cost: "",
        description: "",
        photo: null,
    });
    const [formErrors, setFormErrors] = useState({
        itemType: "",
        name: "",
        location: "",
        condition: "",
        category: "",
        quantity: "",
        dateAcquired: "",
        cost: "",
        description: "",
    });

    const itemOptions = {
        CROP: "Crop",
        LIVESTOCK: "Livestock",
        EQUIPMENT: "Equipment",
    };
    
    const categoryOptions = {
        CROP: "Crop",
        ANIMAL: "Animal",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    // const [fileName, setFileName] = useState("");

// const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//         setFileName(e.target.files[0].name);
//         setFormData({ ...formData, photo: e.target.files[0] });
//     }
// };

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, photo: file });
    } else {
      alert("Please upload a valid image file.");
      e.target.value = "";
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in before adding inventory.");
        return;
    }


    const data = new FormData();
    data.append("request", new Blob([JSON.stringify({
        item: formData.item,
        name: formData.name,
        location: formData.location,
        condition: formData.condition,
        category: formData.category,
        quantity: formData.quantity,
        dateAcquired: formData.dateAcquired,
        cost: formData.cost,
        description: formData.description,
    })], { type: "application/json" }));

    if (formData.photo) {
        data.append("file", formData.photo);
    }

    setLoading(true);

    try {
        const response = await fetch("http://localhost:8080/api/v1/inventory", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        });

        setLoading(false);

        if (response.ok) {
            console.log("Inventory item saved successfully!");
            toast.success("Inventory item saved successfully!");
            setTimeout(() => {
                navigate("/homepage/inventory");
            }, 3000);
        } else {
            const errorDetails = await response.json().catch(() => ({}));
            console.error("Error:", errorDetails);
            alert(`Failed: ${errorDetails.message || response.statusText}`);
            toast.error("Failed to save the inventory")
        }
    } catch (err) {
        console.error("Error occurred while sending data:", err);
        toast.error("An error occurred. Please try again.");
    }
};


return (
    <div className="openModal">
        <ToastContainer />
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="add">
            <div>
                <h4>Add New Inventory</h4>
                <button onClick={onClose} className="xButton">
                    <X />
                </button>
            </div>
            <div>
                <label htmlFor="item">Item Type</label>
                <select
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Item Type</option>
                    {Object.entries(itemOptions).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                {formErrors.item && <p className="error">{formErrors.item}</p>}
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {formErrors.name && <p className="error">{formErrors.name}</p>}
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
                {formErrors.location && <p className="error">{formErrors.location}</p>}
            </div>
            <div>
                <label htmlFor="condition">Condition</label>
                <input
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                />
                {formErrors.condition && <p className="error">{formErrors.condition}</p>}
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
                {formErrors.category && <p className="error">{formErrors.category}</p>}
            </div>
            <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
                {formErrors.quantity && <p className="error">{formErrors.quantity}</p>}
            </div>
            <div>
                <label htmlFor="dateAcquired">Date</label>
                <input
                    type="date"
                    name="dateAcquired"
                    value={formData.dateAcquired}
                    onChange={handleChange}
                    required
                />
                {formErrors.dateAcquired && <p className="error">{formErrors.dateAcquired}</p>}
            </div>
            <div>
                <label htmlFor="cost">Cost</label>
                <input
                    type="text"
                    required
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                />
                {formErrors.cost && <p className="error">{formErrors.cost}</p>}
            </div>

            <div><label htmlFor="photo">Photo Upload</label>
            <div className="photo-upload-input-container">
                <span className="photo-upload-file-name">
                    {formData.photo
                    ? formData.photo.name.length > 22
                        ? `${formData.photo.name.slice(0, 22)}...`
                        : formData.photo.name
                    : "No file selected"}
                </span>

                <input
                    type="file"
                    className="photo-upload-hidden-input"
                    id="photo"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                />

                <label htmlFor="photo" className="photo-upload-button">
                    <FolderOpen />
                    <span>{formData.photo ? "File Selected" : "File Selection"}</span>
                </label>
            </div>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                {formErrors.description && (
                    <p className="error">{formErrors.description}</p>
                )}
            </div>
            <div className="buttonContainer">
                <button type="submit">Save Changes</button>
            </div>
        </form>
    </div>
);

}

AddNewInventory.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddNewInventory;