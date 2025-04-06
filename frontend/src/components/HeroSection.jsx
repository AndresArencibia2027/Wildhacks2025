import * as React from "react";
import "./HeroSection.css"; // Import the CSS
import beesImage from "../assets/bees.jpg"; // Import the image
import "./VideoUpload.jsx";
import VideoUpload from "./VideoUpload.jsx";

export const HeroSection = () => {
  // const [file, setFile] = useState(null);
  // const [status, setStatus] = useState("");

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (!file) return;
  //   const formData = new FormData();
  //   formData.append("video", file);
  //   try {
  //     setStatus("Uploading...");
  //     const response = await axios.post("http://localhost:5000/", formData, {
  //       headers: { "Content-Type": "multipart/form-data" }
  //     });
  //     setStatus("Upload complete! Redirecting to logs...");
  //     window.location.href = "/logs";
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("Upload failed.");
  //   }
  // }
  
  return (
    <section className="hero-section">
      <article className="hero-text">
        <h2>Beehive Management Simplified 🐝🍯</h2>
        <p>
        Powered by AI, BeeHacks analyzes video footage of your bees and detects any potential agitation, 
        generates a detailed report on the status of your hive, and summarizes any potential next steps. 
        </p>
        <div className="flex flex-col items-center max-w-2xl w-full">
        <h3 className="text-2xl font-semibold text-black leading-[76.8px] max-md:text-5xl max-sm:text-4xl">
            Upload a video of your beehive to get started!
        </h3>
        
      </div>

      
      <VideoUpload />
    

      </article>
      <img
        src= {beesImage}
        alt="Beehive"
        className="hero-image"
      />
    </section>
  );
};
