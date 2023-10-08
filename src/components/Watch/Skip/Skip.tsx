import "./Skip.css";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";

interface SkipProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

function Skip({ videoRef }: SkipProps) {
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

  return (
    <div className="skip-container">
      <button className="skip-button" onClick={skipBackward}>
        <Replay10Icon />
      </button>
      <button className="skip-button" onClick={skipForward}>
        <Forward10Icon />
      </button>
    </div>
  );
}

export default Skip;
