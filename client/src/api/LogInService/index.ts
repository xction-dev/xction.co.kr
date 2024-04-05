import { LogInRequestDto, LogInResponseDto } from "@core/dto/LogInService";

export const postLogIn = async (
  body: LogInRequestDto,
): Promise<LogInResponseDto> => {
  try {
    const res = await fetch(`http://localhost:8000/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    const { token } = await res.json();
    sessionStorage.setItem("token", token);

    return { token };
  } catch (error) {
    console.error("An error occurred during sign-up:", error);
    throw error;
  }
};
