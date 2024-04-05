"use client";

import { useLogInService } from "@/hooks/LogInService";
import { useState } from "react";
import { LogInRequestDto } from "@core/dto/LogInService";

export default function LogInModule() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { tryLogin } = useLogInService();

  const handleSubmit = () => {
    const data: LogInRequestDto = { username: username, password: password };
    tryLogin(data);
  };

  return (
    <div>
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
      <button onClick={handleSubmit}>Log In</button>
    </div>
  );
}
