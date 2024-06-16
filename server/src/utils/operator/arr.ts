const joinById = (main: any[], ...targets: any[][]) =>
  main.map((item) => {
    const joinedItem = { ...item };
    targets.forEach((target) => {
      const targetItem = target.find((a) => a.id === item.id);
      Object.assign(joinedItem, targetItem);
    });
    return joinedItem;
  });

  export const arr = {
    joinById
  }
