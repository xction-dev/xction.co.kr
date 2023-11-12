import { PublicId } from "../.shared/Id";

/**
 * 1. 재생이 끝나면 넘어간다.
 * 2. 버튼이 뜨고, 누르는 것에 따라 넘어간다.
 * 3. 안 넘어가고 무한 루프
 *   a. 전화번호를 입력하면 넘어가고, 그 때까지는 영상이 루프
 *   b. 서버에 문자가 전송되면 넘어가고, 그 때까지는 영상이 루프
 */

/**
 * 다음으로 넘어가기 or 프로젝트 전체가 종료
 * Game과, Game 상태에 따라 영상을 전환하는 함수가 존재.
 */

type Basics = {
  id: PublicId;
  videoSrc: string;
  edges: TimeEdge[];
};

type Selector = {
  frameCount: number;
};

type TimeEdge = {
  to: TimeNodeEntity;
};

export type TimeNodeEntity = Basics & Selector;
