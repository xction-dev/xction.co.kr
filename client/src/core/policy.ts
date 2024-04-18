"use client";

import { integrateWithReact } from "@pvi/react";
import { intentPolicy } from "@core/policy/intentPolicy";
import { viewPolicy } from "@core/policy/viewPolicy";
import getQueryClient from "@/utils/next-query-resolver/getQueryClient";

export const {
  policy,
  hooks: { useView, useViewState, useStaticView, useIntent },
} = integrateWithReact({
  viewPolicy,
  intentPolicy,
  queryClient: getQueryClient(),
});
