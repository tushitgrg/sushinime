"use client"
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoWithHLS({source}) {
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    const hls = new Hls({
      debug: true,
    });

    if (Hls.isSupported() && videoRef.current) {
      hls.loadSource(source);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.ERROR, (err) => {
        console.log(err);
      });
    } else {
      console.log("load");
    }
    return () => {
      // cleanup (when component destroyed or when useEffect runs twice on StrictMode)
      hls.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      style={{ width: "250px", borderRadius: "10px" }}
    />
  );
}
