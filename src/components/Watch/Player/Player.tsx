"use client";

import FullScreen from "../FullScreen/FullScreen";
import PlayPause from "../PlayPause/PlayPause";
import Skip from "../Skip/Skip";
import Volume from "../Volume/Volume";
import TimeBar from "../TimeBar/TimeBar";

import "./Player.css";
import React, { useState, useRef, useEffect } from "react";

interface PlayerProps {
  src: string;
}

function Player({ src }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Update currentTime and duration when the video can play
      videoRef.current.addEventListener("canplay", () => {
        setDuration(videoRef.current.duration);
      });

      // Update currentTime while the video is playing
      videoRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(videoRef.current.currentTime);
      });

      // Detect full-screen change
      const handleFullScreenChange = () => {
        setIsFullScreen(
          !!(
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
          ),
        );
      };

      document.addEventListener("fullscreenchange", handleFullScreenChange);
      document.addEventListener("mozfullscreenchange", handleFullScreenChange);
      document.addEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange,
      );
      document.addEventListener("msfullscreenchange", handleFullScreenChange);

      return () => {
        if (videoRef.current) {
          // Clean up event listeners when the component unmounts
          videoRef.current.removeEventListener("canplay", () => {});
          videoRef.current.removeEventListener("timeupdate", () => {});
        }

        // Clean up full-screen change listeners
        document.removeEventListener(
          "fullscreenchange",
          handleFullScreenChange,
        );
        document.removeEventListener(
          "mozfullscreenchange",
          handleFullScreenChange,
        );
        document.removeEventListener(
          "webkitfullscreenchange",
          handleFullScreenChange,
        );
        document.removeEventListener(
          "msfullscreenchange",
          handleFullScreenChange,
        );
      };
    }
  }, []);

  return (
    <div className="video-player">
      <video ref={videoRef}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="controls">
        <PlayPause
          videoRef={videoRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setDuration={setDuration}
        />
        <Skip videoRef={videoRef} />
        <TimeBar
          videoRef={videoRef}
          currentTime={currentTime}
          duration={duration}
        />
        <Volume videoRef={videoRef} volume={volume} setVolume={setVolume} />
        <FullScreen videoRef={videoRef} isFullScreen={isFullScreen} />
      </div>
    </div>
  );
}

export default Player;
