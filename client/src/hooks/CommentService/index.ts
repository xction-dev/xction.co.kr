import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentService } from "@core/usecase/CommentService";
import { GetCommentResponseDto } from "@core/dto/CommentService";
import { PostCommentRequestDto } from "@core/dto/CommentService";
import { PatchCommentRequestDto } from "@core/dto/CommentService";

type InjectedUsecase = CommentService<
  GetCommentResponseDto,
  PostCommentRequestDto,
  PatchCommentRequestDto
>; //DTO, Generic

export const useCommentService = (): InjectedUsecase => {
  //query 관리 객체
  const queryClient = useQueryClient();

  //comment 가져오기
  const { data, error, status } = useQuery<GetCommentResponseDto>({
    queryKey: ["comment", projectId],
    //api not implemented yet, here it is fetchCommentsById
    queryFn: () => fetchCommentsById(projectId),
  });

  // mutation(Post) to add comment
  const { mutate: postComment } = useMutation({
    mutationFn: (comment: PostCommentRequestDto) =>
      postCommentById(projectId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", projectId] }); // POST 성공 시 ["project", id] 쿼리를 새로고침해줍니다
    },
  });

  // mutation(Patch) to update comment
  const { mutate: patchComment } = useMutation({
    mutationFn: (commentId: string, comment: PatchCommentRequestDto) =>
      patchCommentById(projectId, commentId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", projectId] });
    },
  });

  const parsedFetchResult = useMemo(() => {
    switch (status) {
      case "loading":
        return {
          status: "fetching",
          comments: data ?? null,
          error: error ?? null,
        } as const; // 이렇게 하면 타입스크립트에게 status가 string union 타입임을 알려줄 수 있습니다.
      case "error":
        return { status: "fail", project: null, error } as const;
      case "success":
        return {
          status: "success",
          project: data ?? null,
          error: null,
        } as const;
      default:
        return { status: "idle", comments: null, error: null };
    }
  }, [status, data, error]);

  return { ...parsedFetchResult, postComment, patchComment }; // 유즈케이스의 타입과 동일한 객체를 반환합니다.
};
