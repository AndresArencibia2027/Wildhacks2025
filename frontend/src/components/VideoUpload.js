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
    <section className="flex flex-col justify-center items-center p-20 mt-20 w-full rounded-lg bg-zinc-100 max-md:p-10 max-sm:p-5">
      <div className="flex flex-col items-center max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-black leading-[76.8px] max-md:text-5xl max-sm:text-4xl">
            Upload a video of your beehive to get started!
        </h2>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/070a0b1ad689c950c95ac1ffa5ef3bb1d820f97b"
          alt="Upload icon"
          className="w-[103px] h-[102px] mb-[40px] drop-shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
        />
      </div>

    <div className="upload-container">
        <h2 className="text-2xl font-semibold text-black leading-[76.8px] max-md:text-5xl max-sm:text-4xl">
            Upload a video of your beehive to get started!
        </h2>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <p>{status}</p>
        {file && (
            <video width="320" controls src={URL.createObjectURL(file)} />
        )}
    </div>

  </section>
  );
};

export default VideoUpload;
