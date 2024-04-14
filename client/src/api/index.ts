import { createFetch } from "@library/fetch";
import { Authorization } from "@core/utility/Authorization";

export const { api } = createFetch({
  baseUrl: "http://localhost:8080",
});
