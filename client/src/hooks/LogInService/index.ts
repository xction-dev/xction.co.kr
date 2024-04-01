import { LogInRequestDto, LogInResponseDto } from "@core/dto/LogInService";
import { LogInService } from "@core/usecase/LogInService";
import { useMutation } from "@tanstack/react-query";
import { postLogIn } from "@/api/LogInService";

type InjectedUsecase = LogInService<LogInRequestDto>;

export const useLogInService = (): InjectedUsecase => {
  const { mutate } = useMutation({
    mutationFn: postLogIn,
  });

  return { tryLogin: mutate };
};
