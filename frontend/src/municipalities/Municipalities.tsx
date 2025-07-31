import { Component, createResource, For, Match, Show, Switch } from "solid-js";
import { create as createConfig } from "../config";
import { create as createSupabase, getMunicipalities } from "../supabase";

export const Municipalities: Component = () => {
  const config = createConfig();
  const supabase = createSupabase(config.supabase);

  const [municipalities] = createResource(supabase, getMunicipalities);

  return (
    <>
      <Show when={municipalities.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={municipalities.error}>
          <span>Error: {municipalities.error}</span>
        </Match>
        <Match when={municipalities()}>
          <For each={municipalities()}>
            {(municipality) => <p>{municipality.name}</p>}
          </For>
        </Match>
      </Switch>
    </>
  );
};
