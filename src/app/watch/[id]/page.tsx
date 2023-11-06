"use client";

import Player from "@/components/Watch/Player/Player";
import { useSampleProjectService } from "@/hooks/SampleProjectService";

type WatchProps = {
  params: {
    id: string;
  };
};

export default function Watch(props: WatchProps) {
  const id = props.params.id;
  const { status, project, finishWatchingProject } =
    useSampleProjectService(id);

  return (
    <>
      <button onClick={() => finishWatchingProject()}>test button</button>
      {status === "fetching" && <div>로딩 중</div>}
      {status === "fail" && <div>실패</div>}
      {status === "success" && <Player src={project.src} />}
    </>
  );
}
