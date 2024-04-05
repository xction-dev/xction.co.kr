import { GetMeResponseDto } from "@core/dto/GetMeService";

export const getMe = async (): Promise<GetMeResponseDto> => {
  try {
    const res = await fetch(`http://localhost:8000/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${sessionStorage.getItem("token")}`, // 세션 스토리지에 저장된 토큰을 불러와 헤더로 넘겨줍니다.
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred during loading my info:", error);
    throw error;
  }
};
