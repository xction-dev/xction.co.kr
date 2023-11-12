/**
 * SampleUserService라는 유즈케이스에 귀속된 DTO이므로
 * 같은 이름으로 폴더를 만들어 배치합니다.
 */

/**
 * SampleLogin 엔드포인트에 POST를 요청할 때 필요한 Dto입니다.
 * RequestDto는 request body에 들어갈 데이터를 정의합니다.
 */
export type PostSampleLoginRequestDto = {
  email: string;
  password: string;
};

/**
 * SampleMe 엔드포인트에 GET 요청을 하면 응답하는 Dto입니다.
 * ResponseDto는 response body에 들어갈 데이터를 정의합니다.
 */
export type GetSampleMeResponseDto = {
  name: string;
};
