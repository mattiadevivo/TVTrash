import { CounterContext } from "./counter";

export function Provider(props) {
  return (
    <CounterContext.Provider value={{ count: 0, setCount: () => {} }}>
      {props.children}
    </CounterContext.Provider>
  );
}
