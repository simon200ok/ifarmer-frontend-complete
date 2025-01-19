import { useState } from "react";
import { ArrowLeft } from 'lucide-react';
import SelectFile from "../assets/selectFile.png";
import "./CreatePost.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
};


const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("File size exceeds 50MB. Please select a smaller file.");
        return;
      }
      setFileName(file.name);
      setFormData({ ...formData, file });
    }
  };

  const handleDropAreaClick = (event) => {
    event.stopPropagation();
    document.querySelector(".file-input").click();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if(!token) {
      toast.error("Please log in before creating a post");
      return;
    }

    const data = new FormData();
    data.append("post", new Blob([JSON.stringify({
      title: formData.title,
      description: formData.description,
    })], {type: "application/json" }));
    

    if (formData.file) {
      data.append("file", formData.file);
    } else {
      toast.error("Please select a file to upload.");
      return;
    }


  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/posts/create-post`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );


    if (response.ok) {
      console.log("Post Created successfully!");
      toast.success("Post created successfully!");
      setTimeout(() => {
        navigate("/dashboard/community");
      }, 3000);
    } else {
        const errorDetails = await response.json().catch(() => ({}));
        console.error("Error:", errorDetails);
        alert(`Failed: ${errorDetails.message || response.statusText}`);
        toast.error("Failed to create the post")
    }
  } catch (error) {
    console.error("An error occurred:", error);
    toast.error("An error occurred. Please try again.");
  }
};


  return (
    <div className="main">
        <ToastContainer />
        <div className="post-wrapper">
            <div className="backPage">
              <ArrowLeft /> <p>Back</p>
            </div>
        </div>
        <form  onSubmit={handleSubmit} className="post-form">
            <div className="file-drop-area"
              onClick={handleDropAreaClick}
            >
              <div className="upload-icon" >
                <img src={SelectFile} alt="file selection" />
              </div>
                  <p className="drop-text">Drop your files here or <span className="browse">browse</span></p>
                  <p className="file-size-text">Maximum size: 50MB</p>
                  <input
                    type="file"
                    className="file-input"
                    id="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {fileName && (
                  <div className="file-details">
                    <h3>Selected File: <strong>{fileName}</strong></h3>
                </div>
              )}
            </div>
            <div className="form-field">
              <div>
                <label htmlFor="title">Title</label>
                <input type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                />
                {formErrors.title && (
                  <p className="error">{formErrors.title}</p>
                )}
              </div>
            </div>
            <div className="form-field">
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Type here"
                />
                {formErrors.description && (
                  <p className="error">{formErrors.description}</p>
                )}
              </div>
              <div className="buttonContainer">
                <button type="submit">Create Post</button>
              </div>
            </div>
        </form>
    </div>
  );
};

export default CreatePost;