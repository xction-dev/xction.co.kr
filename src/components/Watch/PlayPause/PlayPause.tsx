import "./PlayPause.css";

interface PlayPauseProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

function PlayPause({
  videoRef,
  isPlaying,
  setIsPlaying,
  setDuration,
}: PlayPauseProps) {
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
  return (
    <button className="play-pause-button" onClick={togglePlay}>
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
}

export default PlayPause;
