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
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (videoRef.current && src) {
      // Update currentTime and duration when the video can play
      videoRef.current.addEventListener("canplay", () => {
        if (!videoRef.current?.duration || !src) return;
        setDuration(videoRef.current.duration);
      });

      // // Update currentTime while the video is playing
      videoRef.current.addEventListener("timeupdate", () => {
        if (!videoRef.current?.duration || !src) return;
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
  }, [videoRef, src]);

  return (
    <div className="video-player-container">
      <div className="video-player">
        <video ref={videoRef}>
          {src && <source src={src} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>

        <div className="timebar-contianer">
          <TimeBar
            videoRef={videoRef}
            currentTime={currentTime}
            duration={duration}
          />
        </div>

        <div className="controls">
          <PlayPause
            videoRef={videoRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setDuration={setDuration}
          />
          <Skip videoRef={videoRef} />
          <Volume
            videoRef={videoRef}
            volume={volume}
            setVolume={setVolume}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
          <FullScreen videoRef={videoRef} isFullScreen={isFullScreen} />
        </div>
      </div>
    </div>
  );
}

export default Player;
