import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a video first.");
      return;
    }
    
    const formData = new FormData();
    formData.append("video", file);

    try {
      setStatus("Uploading...");
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(response.data);
      setStatus("Upload complete! Redirecting to logs...");
      // Navigate to Logs page, passing the backend response data as state
      navigate("/logs", { state: response.data });
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus(`Upload failed: ${err.response?.data?.error || err.message}`);
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
