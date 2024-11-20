"use client";

import { api } from "@/api";
import { PostApi } from "@core/api/post";
import { useEffect } from "react";
export default function ServerTest() {
  useEffect(() => {
    api.get("/posts").then(console.log);
  }, []);
  return <div></div>;
}
