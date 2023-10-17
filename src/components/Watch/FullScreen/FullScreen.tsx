import "./FullScreen.css";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

type VideoElementWithFullScreen = HTMLVideoElement & {
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
  msRequestFullscreen?: () => void;
};

interface FullScreenProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isFullScreen: boolean;
}

function FullScreen({ videoRef, isFullScreen }: FullScreenProps) {
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
        const document = window.document as Document & {
          mozCancelFullScreen: () => void;
          webkitExitFullscreen: () => void;
          msExitFullscreen: () => void;
        };
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

  return (
    <button className="fullscreen-button" onClick={handleFullScreenToggle}>
      {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </button>
  );
}

export default FullScreen;
