"use client";

import { useGetMeService } from "@/hooks/GetMeService";

export default function GetMeModule() {
  const { me, status } = useGetMeService();

  return (
    <div>
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error occurred</div>}
      {status === "success" && <div>{me?.name}</div>}
    </div>
  );
}
