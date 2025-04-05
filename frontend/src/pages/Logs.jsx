import React from 'react';
import { useLocation } from 'react-router-dom';

const Logs = () => {
  const location = useLocation();
  // Retrieve data passed from the VideoUpload component
  const data = location.state || {};

  return (
    <div className="logs">
      <h2>Beehive Logs</h2>
      {data.gemini_analysis ? (
        <div>
          <h3>Video Details:</h3>
          <p>Frames: {data.video_details.n_frames}</p>
          <p>Dimensions: {data.video_details.width} x {data.video_details.height}</p>
          <p>FPS: {data.video_details.fps}</p>
          <h3>Gemini Analysis:</h3>
          <p>{data.gemini_analysis}</p>
        </div>
      ) : (
        <p>No logs available. Please upload a video first.</p>
      )}
    </div>
  );
};

export default Logs;
