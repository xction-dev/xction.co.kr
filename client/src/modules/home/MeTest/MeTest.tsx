"use client";

import viewPolicy from "@core/policy/view";
import { UserRepository } from "@core/repository/user";
import { useViewMaybe } from "library/policy-maker/next";

export default function MeTest() {
  const { view } = useViewMaybe({
    policy: viewPolicy.user.me(),
    from: UserRepository.getMe,
  });

  if (!view) return <div>로그인을 해주세요</div>;

  return <div>{view.name}로 로그인 되었습니다</div>;
}
