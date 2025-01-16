import React from "react";
import "./PhotoUploadInput.css";
import { FolderOpen } from "lucide-react";


const PhotoUploadInput = ({ formData, setFormData }) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, photo: file });
    } else {
      alert("Please upload a valid image file.");
      e.target.value = "";
    }
  };

  return (
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
        <span>{formData.photo ? "Change File" : "File Selection"}</span>
      </label>
    </div>
  );
};

export default PhotoUploadInput;
