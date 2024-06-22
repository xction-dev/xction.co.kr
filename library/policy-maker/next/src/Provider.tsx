import { PropsWithChildren, useRef } from "react";
import { createStore } from "./createStore";
import { StoreContext } from "./storeContext";

export default function Provider({ children }: PropsWithChildren) {
  const store = useRef(createStore());
  return (
    <StoreContext.Provider value={store.current}>
      {children}
    </StoreContext.Provider>
  );
}
