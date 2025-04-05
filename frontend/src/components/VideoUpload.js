// src/components/VideoUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("video", file);
    try {
      setStatus("Uploading...");
      const response = await axios.post("http://localhost:5000/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setStatus("Upload complete! Redirecting to logs...");
      window.location.href = "/logs";
    } catch (err) {
      console.error(err);
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Beehive Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
      {file && (
        <video width="320" controls src={URL.createObjectURL(file)} />
      )}
    </div>
  );
};

export default VideoUpload;
