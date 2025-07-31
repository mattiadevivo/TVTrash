import { Component, createSignal } from "solid-js";

export const Counter: Component = (props) => {
  const [count, setCount] = createSignal<number>(0);
  return (
    <>
      <h1 class="text-3xl text-blue-700 text-center py-20">{count()}</h1>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>
    </>
  );
};
