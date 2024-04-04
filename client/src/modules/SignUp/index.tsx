"use client";

import { useSignUpService } from "@/hooks/SignUpService";
import { useState } from "react";
import { SignUpRequestDto } from "@core/dto/SignUpService";
import { postSignUp } from "@/api/SignUpService";

export default function SignUpModule() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const data: SignUpRequestDto = {
  //     name: name,
  //     thumbnail: thumbnail,
  //     username: username,
  //     password: password,
  //   };
  const { trySignUp } = useSignUpService();

  const handleSubmit = () => {
    const data: SignUpRequestDto = {
      name: name,
      thumbnail: thumbnail || undefined,
      username: username,
      password: password,
    };
    console.log(typeof data["thumbnail"]);
    trySignUp(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Thumbnail"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
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
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
}
