import { LogInRequestDto, LogInResponseDto } from "@core/dto/LogInService";

export const postLogIn = (body: LogInRequestDto): Promise<LogInResponseDto> =>
  fetch(`/users/signin`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));
