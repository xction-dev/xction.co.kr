export type LogInRequestDto = {
  username: string;
  password: string;
};

export type LogInResponseDto = {
  token: string;
};
