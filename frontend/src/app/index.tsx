/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";

import { Route, Router } from "@solidjs/router";
import { App } from "./app";
import { NotFound } from "./routes/notFound";
import { Municipalities } from "../features/municipalities/components/municipalities";
import { Counter } from "./counter";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Counter} />
      <Route path="/municipalities" component={Municipalities} />
      <Route path="*paramName" component={NotFound} />
    </Router>
  ),
  root!
);
