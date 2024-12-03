import { useVideoContext } from "@/contexts/VideoContext";
import Player from "../Player";

export default function VideoController() {
  //   const context = useVideoContext();
  const { DB, currClip, setCurrClip } = useVideoContext();
  if (!currClip) {
    // currClip이 없을 경우 초기 클립 설정
    setCurrClip(DB[0]);
  }

  const nextClips = currClip?.next || [];

  return <>{currClip && <Player url={currClip.url} />}</>;
}
