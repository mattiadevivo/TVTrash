import { createContext } from "solid-js";

export const CounterContext = createContext<{
  count: number;
  setCount: (count: number) => void;
}>({
  count: 0,
  setCount: () => {},
});
