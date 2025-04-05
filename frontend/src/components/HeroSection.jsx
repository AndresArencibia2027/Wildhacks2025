import * as React from "react";
import "./HeroSection.css"; // Import the CSS
import beesImage from "../assets/bees.jpg"; // Import the image

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <article className="hero-text">
        <h2>Beehive management simplified</h2>
        <p>
          Our tool will automatically analyze a video of your beehive, examine
          your video for information on your bees, generate a detailed report of
          the status of your hive, and provide you with necessary to-do list
          items.
        </p>
      </article>
      <img
        src= {beesImage}
        alt="Beehive"
        className="hero-image"
      />
    </section>
  );
};
