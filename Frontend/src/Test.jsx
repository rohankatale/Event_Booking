import React, { useState } from 'react';

function Test() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/events", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImageURL(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload Image</button>
      </form>
      {imageURL && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageURL} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
}

export default Test;
