import "./TimeBar.css";

interface TimeBarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  duration: number;
}

function TimeBar({ videoRef, currentTime, duration }: TimeBarProps) {
  const TimeBarWidth = (currentTime / duration) * 100 + "%";

  const handleTimeBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const TimeBar = event.currentTarget;
      const clickX = event.clientX - TimeBar.getBoundingClientRect().left;
      const percentClicked = clickX / TimeBar.clientWidth;
      const newTime = percentClicked * duration;
      videoRef.current.currentTime = newTime;
    }
  };
  return (
    <div className="time-bar" onClick={handleTimeBarClick}>
      <div className="time-bar-fill" style={{ width: TimeBarWidth }}></div>
    </div>
  );
}

export default TimeBar;
