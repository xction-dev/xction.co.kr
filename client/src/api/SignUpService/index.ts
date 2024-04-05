import { SignUpRequestDto } from "@core/dto/SignUpService";

// export const postSignUp = (body: SignUpRequestDto): Promise<void> =>
//   fetch(`http://localhost:8000/users/signup`, {
//     method: "POST",
//     body: JSON.stringify(body),
//   }).then(async (res) => {
//     if (!res.ok) {
//       const errorMessage = await res.text();
//       console.error(errorMessage);
//       console.table(res);
//       return Promise.reject(res);
//     }
//   });

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
      console.log(JSON.stringify(body));
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("An error occurred during sign-up:", error);
    throw error;
  }
};
