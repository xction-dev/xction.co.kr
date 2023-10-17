<<<<<<< refs/remotes/origin/main
<<<<<<< refs/remotes/origin/main
<<<<<<< refs/remotes/origin/main
import Player from "@/components/Watch/Player/Player";
=======
import Video from "@/components/Watch/Video";
>>>>>>> Refact: Rename 'Video' components to 'Watch'
=======
import Player from "@/components/Watch/Player/Player";
>>>>>>> refact: Make separate video contols components
=======
"use client";

import Player from "@/components/Watch/Player/Player";
import { useState, useEffect } from "react";

type WatchParams = {
  id: string;
};

export default function Watch(props: WatchParams) {
  const id = props.id;
  const [videoSource, setVideoSource] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) {
      const callVideo = async () => {
        try {
          const response = await fetch(`/api/mock/project/${id}`);

          if (response.ok) {
            const data = await response.json();
            setVideoSource(data.src);
          } else {
            const data = await response.json();
            setErrorMessage(data.error_message);
          }
        } catch (error) {
          console.error(error);
        }
      };

      callVideo();
    }
  }, [id]);
>>>>>>> feat: Add fetching from mock api

  return (
    <>
      <Player src={videoSource} />
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
