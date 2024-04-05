import { LogInRequestDto, LogInResponseDto } from "@core/dto/LogInService";

export const postLogIn = (body: LogInRequestDto): Promise<LogInResponseDto> =>
  fetch(`http://localhost:8000/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));
