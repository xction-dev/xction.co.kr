"use client";

import { useState } from "react";
import { VideoContext } from "@/contexts/VideoContext";
import VideoController from "@/components/VideoController";
import { Clip } from "@/contexts/VideoContext";

export default function Video() {
  const [currClip, setCurrClip] = useState<Clip | null>(null);
  const [currFrame, setCurrFrame] = useState<number | null>(null); //useRef로 변경 가능

  // DB fetch pseudo code
  const baseURL = "https://d2yo7lrb9dagdw.cloudfront.net/";
  const getV2 = (id: string): string => `${baseURL}v2/v2_${id}.mp4`;

  const V2_A = getV2("A");
  const V2_A2 = getV2("A2");

  const DB = [
    {
      id: "A",
      url: V2_A,
      next: ["A2"],
    },
    {
      id: "A2",
      url: V2_A2,
      next: [],
    },
  ];

  return (
    <VideoContext.Provider
      value={{ DB, currClip, setCurrClip, currFrame, setCurrFrame }}
    >
      <VideoController />
    </VideoContext.Provider>
  );
}
