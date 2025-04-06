import * as React from "react";
import { useState } from 'react';
import axios from 'axios';
import "./HeroSection.css"; // Import the CSS
import beesImage from "../assets/bees.jpg"; // Import the image

export const HeroSection = () => {
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
  }
  
  return (
    <section className="hero-section">
      <article className="hero-text">
        <h2>Beehive management simplified 🐝🍯</h2>
        <p>
          Our tool will automatically analyze a video of your beehive, examine
          your video for information on your bees, generate a detailed report of
          the status of your hive, and provide you with necessary to-do list
          items.
        </p>

        <div className="flex flex-col items-center max-w-2xl w-full">
        <h3 className="text-2xl font-semibold text-black leading-[76.8px] max-md:text-5xl max-sm:text-4xl">
            Upload a video of your beehive to get started!
        </h3>
        
      </div>

      <div className="upload-container">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        id="file-input"
      />
      
      {/* <label htmlFor="file-input" className ="file-label">
        <button className="upload-btn">
          Choose File
        </button>
      </label> */}
      <button
        onClick={() => document.getElementById('file-input').click()} // Manually trigger file input click
        className="upload-btn"
      >
        Choose File
      </button>

      <p>{status}</p>
      {file && <video width="700" height = "400" controls src={URL.createObjectURL(file)} />}

      <div className="spacer"></div>
      <button
        onClick={handleUpload}
        className="upload-btn mt-4"
      >
        Upload Selected File
      </button>


    </div>


    
        

      </article>
      <img
        src= {beesImage}
        alt="Beehive"
        className="hero-image"
      />
    </section>
  );
};
