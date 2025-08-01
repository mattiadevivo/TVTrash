import { createSignal, ErrorBoundary, JSX, type Component } from "solid-js";

import { create as createConfig } from "./config";
import { create as createSupabase } from "./supabase";
import { Counter } from "./Counter";
import { Navbar } from "@ui/navbar";
import { Municipalities } from "./municipalities/Municipalities";

//const config = createConfig();
//const supabase = createSupabase(config.supabase);

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
      <Navbar></Navbar>
      <Counter />
      <Municipalities></Municipalities>
    </ErrorBoundary>
  );
};

export default App;
