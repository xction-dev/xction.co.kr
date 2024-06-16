import { createFetch } from "fetch";

export const { api } = createFetch({
  baseUrl: "http://localhost:8080",
});
