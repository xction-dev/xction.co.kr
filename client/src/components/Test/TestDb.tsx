"use client";

import { useEffect } from "react";

export const TestDb = () => {
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_HOST ?? "no_env")
      .then((res) => {
        console.log("simple success:");
        res.text().then(console.log);
      })
      .catch((err) => {
        console.error("simple error: ");
        console.log(err);
      });

    fetch((process.env.NEXT_PUBLIC_SERVER_HOST ?? "no_env") + "/db")
      .then((res) => {
        console.log("db success:");
        res.text().then(console.log);
      })
      .catch((err) => {
        console.error("db error: ");
        console.log(err);
      });
  }, []);

  return <div>Test Server & DB</div>;
};
