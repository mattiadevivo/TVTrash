import { createSignal, ErrorBoundary, type Component } from "solid-js";
import { create as createConfig } from "./config";
import { create as createSupabase } from "./supabase";

//const config = createConfig();
//const supabase = createSupabase(config.supabase);

const App: Component = () => {
  const [count, setCount] = createSignal<number>(0);
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <p>Something went wrong: {error.message}</p>
          <button onClick={reset}>Try Again</button>
        </div>
      )}
    >
      <h1 class="text-3xl text-blue-700 text-center py-20">{count()}</h1>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>
    </ErrorBoundary>
  );
};

export default App;
