"use client";

import "./Video.css";
import React, { useState, useRef, useEffect } from "react";

interface VideoProps {
  src: string;
}

function Video({ src }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const togglePlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setDuration(videoRef.current.duration); // 처음 play부터 duration을 가져오기 위해
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Skip forward by 10 seconds
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10; // Skip backward by 10 seconds
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleFullScreenToggle = () => {
    if (videoRef.current) {
      if (!isFullScreen) {
        // Enter full screen
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
          // Firefox
          videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          // IE/Edge
          videoRef.current.msRequestFullscreen();
        }
      } else {
        // Exit full screen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          // Chrome, Safari and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
          document.msExitFullscreen();
        }
      }
    }
  };

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

  const progressBarWidth = (currentTime / duration) * 100 + "%";

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = event.currentTarget;
      const clickX = event.clientX - progressBar.getBoundingClientRect().left;
      const percentClicked = clickX / progressBar.clientWidth;
      const newTime = percentClicked * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="video-player">
      <video ref={videoRef}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="controls">
        <button
          className={`play-pause-button ${isPlaying ? "pause" : "play"}`}
          onClick={togglePlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button className="skip-button" onClick={skipBackward}>
          -10s
        </button>
        <button className="skip-button" onClick={skipForward}>
          +10s
        </button>
        <div className="progress-bar" onClick={handleProgressBarClick}>
          <div
            className="progress-bar-fill"
            style={{ width: progressBarWidth }}
          ></div>
        </div>
        <div className="volume-control">
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <button className="fullscreen-button" onClick={handleFullScreenToggle}>
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </button>
      </div>
    </div>
  );
}

export default Video;
