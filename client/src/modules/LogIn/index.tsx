"use client";

import { useLogInService } from "@/hooks/LogInService";
import { useState } from "react";
import { LogInRequestDto } from "@core/dto/LogInService";

export default function LogInModule() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const data: LogInRequestDto = { username: username, password: password };
  const { tryLogin } = useLogInService();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          tryLogin(data);
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
