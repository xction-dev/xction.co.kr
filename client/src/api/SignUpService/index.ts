import { SignUpRequestDto } from "@core/dto/SignUpService";

export const postSignUp = async (body: SignUpRequestDto): Promise<void> => {
  try {
    const res = await fetch(`http://localhost:8000/users/signup`, {
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
  } catch (error) {
    console.error("An error occurred during sign-up:", error);
    throw error;
  }
};
