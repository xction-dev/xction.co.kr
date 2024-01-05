export const mockWriter = (writerId: number) => {
  if (writerId === 0) {
    return {
      id: writerId,
      name: "준영",
    };
  }
  if (writerId === 1)
    return {
      id: writerId,
      name: "창인",
    };

  if (writerId === 2)
    return {
      id: writerId,
      name: "수빈",
    };

  if (writerId === 3)
    return {
      id: writerId,
      name: "윤식",
    };

  return {
    id: writerId,
    name: "어떤 사용자",
  };
};
