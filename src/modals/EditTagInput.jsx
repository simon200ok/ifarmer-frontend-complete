import React, { useState } from "react";
import "./EditTagInput.css";

const EditTagInput = ({ placeholder }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTag = (e) => {
    if (e) e.preventDefault();

    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="tag-input-container-edit">
      {tags.map((tag, index) => (
        <div className="tag-edit" key={index}>
          {tag}
          <button
            type="button"
            className="remove-tag-edit"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        className="tag-input-edit"
        placeholder={placeholder || "Enter a tag"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="add-button-edit"
        onClick={addTag}
      >
        + Add
      </button>
    </div>
  );
};

export default EditTagInput;
