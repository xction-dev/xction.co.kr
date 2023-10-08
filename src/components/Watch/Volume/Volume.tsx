import "./Volume.css";
import Slider from "@mui/material/Slider";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

interface VolumeProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

function Volume({
  videoRef,
  volume,
  setVolume,
  isMuted,
  setIsMuted,
}: VolumeProps) {
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const newVolume = typeof newValue === "number" ? newValue : newValue[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      setVolume(videoRef.current.muted ? 0 : 1);
    }
  };

  return (
    <div className="volume-control">
      <button className="volume-button" onClick={handleMute}>
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </button>
      <Slider
        className="volume-slider"
        aria-label="Volume"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
        style={{ width: 50 }}
        size="small"
        defaultValue={0}
      />
    </div>
  );
}

export default Volume;
