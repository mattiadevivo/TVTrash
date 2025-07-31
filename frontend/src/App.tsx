import { createSignal, ErrorBoundary, JSX, type Component } from "solid-js";

import { create as createConfig } from "./config";
import { create as createSupabase } from "./supabase";
import { Counter } from "./Counter";

//const config = createConfig();
//const supabase = createSupabase(config.supabase);

type Props = { children: JSX.Element };

const App: Component = (props) => {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <p>Something went wrong: {error.message}</p>
          <button onClick={reset}>Try Again</button>
        </div>
      )}
    >
      <Counter />
    </ErrorBoundary>
  );
};

export default App;
