"use client";

import Player from "@/components/Watch/Player/Player";
import { useState, useEffect } from "react";

type WatchProps = {
  params: {
    id: string;
  };
};

export default function Watch(props: WatchProps) {
  const id = props.params.id;
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
            // 에러 발생 시 조건부로 errorMessage를 useState에 저장
            const data = await response.json();
            data.error_fields
              ? setErrorMessage(data.error_fields[0].error_message)
              : setErrorMessage(data.error_message);
          }
        } catch (error) {
          console.error(error);
        }
      };

      callVideo();
    }
  }, [id]);

  console.log(errorMessage);

  return (
    <>
      <Player src={videoSource} />
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
