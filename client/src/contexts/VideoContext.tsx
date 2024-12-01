import { createContext, useContext } from "react";
import { SetStateAction, Dispatch } from "react";

type ClipID = string;
export type Clip = { id: ClipID; url: string; next: ClipID[] };

type ContextType = {
  DB: Clip[];
  currClip: Clip | null;
  setCurrClip: Dispatch<SetStateAction<Clip | null>>;
  currFrame: number | null;
  setCurrFrame: Dispatch<SetStateAction<number | null>>;
};

const initialContext: ContextType = {
  DB: [],
  currClip: null,
  setCurrClip: () => {}, // no-op
  currFrame: null,
  setCurrFrame: () => {}, // no-op
};

const VideoContext = createContext<ContextType>(initialContext);

const useVideoContext = () => useContext(VideoContext);

export { VideoContext, useVideoContext };
