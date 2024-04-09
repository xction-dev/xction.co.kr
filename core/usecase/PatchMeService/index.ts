/**
 * 내 정보 수정 유즈케이스입니다.
 * 내 정보 수정을 시도하는 tryPatchMe 함수(intent)를 가지고 있습니다.
 */

export type PatchMeService<PatchMeRequestBody, PatchMeResponseBody> = {
  tryPatchMe: (body: PatchMeRequestBody) => PatchMeResponseBody;
};
