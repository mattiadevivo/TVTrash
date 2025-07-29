import type { Component } from "solid-js";
import { create as createConfig } from "./config";
import { create as createSupabase } from "./supabase";

const config = createConfig();
const supabase = createSupabase(config.supabase);

const App: Component = () => {
  return (
    <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
  );
};

export default App;
