import "./Volume.css";

interface VolumeProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

function Volume({ videoRef, volume, setVolume }: VolumeProps) {
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <div className="volume-control">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default Volume;
