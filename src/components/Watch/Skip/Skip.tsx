import "./Skip.css";

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
        -10s
      </button>
      <button className="skip-button" onClick={skipForward}>
        +10s
      </button>
    </div>
  );
}

export default Skip;
