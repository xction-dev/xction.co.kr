import { useEffect } from "react";
import "./TimeBar.css";
import Slider from "@mui/material/Slider";

interface TimeBarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  duration: number;
}

function TimeBar({ videoRef, currentTime, duration }: TimeBarProps) {
  const handleTimeBarClick = (event: Event, newValue: number | number[]) => {
    const seekTime = (duration * (newValue as number)) / 100;

    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  return (
    <Slider
      value={currentTime && duration ? (currentTime / duration) * 100 : 0} // Calculate the value based on current time and duration
      onChange={handleTimeBarClick}
      aria-label="Time Bar"
    />
  );
}

export default TimeBar;
