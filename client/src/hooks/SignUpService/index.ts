import { SignUpService } from "@core/usecase/SignUpService";
import { SignUpRequestDto } from "@core/dto/SignUpService";
import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "@/api/SignUpService";

type InjectedUsecase = SignUpService<SignUpRequestDto>;

export const useSignUpService = (): InjectedUsecase => {
  const { mutate } = useMutation({
    mutationFn: postSignUp,
  });

  return { trySignUp: mutate };
};
