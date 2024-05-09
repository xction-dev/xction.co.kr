import { ViewPolicy } from "@policy-maker-2/core";
import { useView } from "@policy-maker-2/react";
import { z } from "zod";

const VPSample = ViewPolicy(() => ({
  key: { name: "sample" },
  model: z.object({ id: z.number().int(), name: z.string() }),
}));

export function Example() {
  const { view } = useView({
    policy: VPSample(),
    from: () => Promise.resolve({ id: 1, name: "sample" }),
  });
  return (
    <div>
      <div>id: {view.id}</div>
      <div>name: {view.name}</div>
    </div>
  );
}
