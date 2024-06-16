import { useQuery } from "@tanstack/react-query";
import { ImplementedViewPolicy, ViewModel } from "library/policy-maker/core";
import { useMemo } from "react";
import { TypeOf } from "zod";

type Param<Model extends ViewModel> = {
  policy: ImplementedViewPolicy<Model>;
};

export const useStoredView = <Model extends ViewModel>({
  policy,
}: Param<Model>): TypeOf<Model> | null => {
  const { data } = useQuery({
    queryKey: policy.key,
    staleTime: Infinity,
    gcTime: 0,
  });

  const result: TypeOf<Model> | null = useMemo(() => {
    try {
      return policy.model.parse(data);
    } catch (e) {
      console.log(e);
      return null;
    }
  }, [data]);
  return result;
};
