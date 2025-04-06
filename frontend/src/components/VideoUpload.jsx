import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VideoUploader.css'
import uploadImage from "../assets/upload.png"; 


const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please upload a video first.");
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
    <section className="flex flex-col justify-center items-center p-20 mt-20 w-full rounded-lg bg-zinc-100 max-md:p-10 max-sm:p-5">
      <div className="upload-container">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        id="file-input"
      />

      <button
        onClick={() => document.getElementById('file-input').click()} 
        className="upload-btn"
      >
       <img
          src= {uploadImage}
          alt="Upload"
          className="upload-icon"
        />
      </button>

      <p>{status}</p>
      {file && <video width="700" height = "400" controls src={URL.createObjectURL(file)} />}

      <div className="spacer"></div>
      <button
        onClick={handleUpload}
        className="confirm-upload-btn mt-4"
      >
        Confirm Upload
      </button>


    </div>


  </section>
  );
};

export default VideoUpload;
