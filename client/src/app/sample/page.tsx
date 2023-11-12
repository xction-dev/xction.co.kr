"use client";

import { useSampleUserService } from "@/hooks/SampleUserService";
import { useState } from "react";

export default function Sample() {
  const { status, me, tryLogin } = useSampleUserService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => tryLogin({ email, password })}>로그인</button>

      {status === "fetching" && <div>로딩 중</div>}
      {status === "fail" && <div>실패</div>}
      {status === "success" && <div>성공: {me.name}</div>}
    </div>
  );
}
