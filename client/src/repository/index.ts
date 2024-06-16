import { createFetch } from "library/fetch";

const { api: testApi } = createFetch({ baseUrl: "http://localhost:8080/" });

const getTests = () => testApi.get("tests").then(console.log);

export const TestRepository = {
  getTests,
};
