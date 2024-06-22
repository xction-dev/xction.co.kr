"use client";

import viewPolicy from "@core/policy/view";
import { UserRepository } from "@core/repository/user";
import { delay } from "library/fetch";
import { useView } from "library/policy-maker/next";

export default function ServerTest() {
  const { view } = useView({
    policy: viewPolicy.user.user(1),
    from: () => UserRepository.getUser(1).then(delay(1000)),
  });

  return <div>{view.name}</div>;
}
