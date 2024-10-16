"use client"
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import Video.js styles

const VideoPlayer = ({ sources }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Initialize Video.js
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
      });

      // Set default source
      const defaultSource = sources.find(source => source.quality === 'default');
      playerRef.current.src({ src: defaultSource.url, type: 'application/x-mpegURL' });

      // Add quality selector options
      const qualityLevels = sources.map(source => ({
        src: source.url,
        label: source.quality
      }));

      // Cleanup on unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [sources]);

  // Function to change quality based on selection
  const handleQualityChange = (url) => {
    if (playerRef.current) {
      playerRef.current.src({ src: url, type: 'application/x-mpegURL' });
      playerRef.current.play();
    }
  };

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="360" />
      <h1>Hello</h1>
      {/* Quality buttons */}
      <div>
        {sources.map((source, index) => (
          <button key={index} onClick={() => handleQualityChange(source.url)}>
            {source.quality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
