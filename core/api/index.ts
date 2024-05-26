import { createFetch } from "../../library/fetch";
import { parseQuery } from "./util";

export const { api, authApi } = createFetch({
  baseUrl: "http://localhost:8080",
});

type ParamBase = Record<string, "string" | "number">;
type ParsedParams<T extends ParamBase> = {
  [key in keyof T]: T[key] extends "string" ? string : number | string;
};
type StrictlyParsedParams<T extends ParamBase> = {
  [key in keyof T]: T[key] extends "string" ? string : number;
};

export const createApi = <
  Params extends Record<string, "string" | "number">,
  Query extends Record<string, unknown>,
  Body extends Record<string, unknown>,
  Dto,
  Entity = Dto,
>({
  method,
  params,
  endpoint,
  body,
  query,
  dto,
  map,
}: {
  method: "get" | "post" | "patch" | "put" | "delete";
  params: Params;
  endpoint: (params: ParsedParams<Params>) => string[];
  dto: (input: unknown) => Dto;
  body?: (input: unknown) => Body;
  query?: (input: unknown) => Query;
  map?: (input: Dto) => Entity;
}) => {
  const formattedParam = Object.keys(params).reduce(
    (acc, key) => ({ ...acc, [key]: `:${key}` }),
    {} as StrictlyParsedParams<Params>,
  );

  const server = {
    method,
    endpoint: endpoint(formattedParam),
    parseRequest: (req: {
      params: Record<string, any>;
      query: Record<string, any>;
      body?: unknown;
    }) => ({
      params: Object.keys(req.params).reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            params[key] === "number"
              ? Number(req.params[key])
              : req.params[key],
        }),
        {} as ParsedParams<Params>,
      ),
      query: query ? query(req.query ?? {}) : null,
      body: body ? body(req.body ?? {}) : undefined,
    }),
    parseResponse: (data: unknown) => (dto ? dto(data) : null),
  };

  const client = ({
    params = {} as ParsedParams<Params>,
    query = {} as Query,
    body: bodyInput = {} as Body,
  }: {
    params?: ParsedParams<Params>;
    query?: Query;
    body?: Body;
  }) => {
    const url = `${endpoint(params).join("")}${parseQuery(query)}`;

    return (
      method === "get"
        ? api[method](url)
        : api[method](url, body ? body(bodyInput) : undefined)
    ).then((data) => (map ? map(data as Dto) : (data as Entity)));
  };

  return { server, client };
};
