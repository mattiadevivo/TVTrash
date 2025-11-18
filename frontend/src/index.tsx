/* @refresh reload */
import "solid-devtools";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";
import { render } from "solid-js/web";

// Create the router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    // Add any router context here if needed
	auth: undefined!,
	theme: undefined!,
	config: undefined!,
	supabase: undefined!,
  },
});

// Register the router for type safety
declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}
import type { Component, ParentProps, JSX } from "solid-js";
import { AuthProvider, useAuth } from "./app/context/auth";
import { ThemeProvider, useTheme } from "./app/context/theme";
import { ConfigProvider, useConfig } from "./app/context/config";
import { SupabaseProvider, useSupabase } from "./app/context/supabase";

export interface AppProps extends ParentProps {
	children?: JSX.Element;
}

export const InnerApp: Component<AppProps> = (props) => {
	const theme = useTheme();
	const config = useConfig();
	const supabase = useSupabase();
	const auth = useAuth();
	return (
		<RouterProvider router={router} context={{
			auth,
			theme,
			config,
			supabase,
		}}/>
	);
};


export const App: Component = () => {
	return (
				<ThemeProvider>
					<ConfigProvider>
						<SupabaseProvider>
							<AuthProvider>
								<InnerApp />
							</AuthProvider>
						</SupabaseProvider>
					</ConfigProvider>
				</ThemeProvider>
	);
};

// Render the app
const rootElement = document.getElementById("root");
if (import.meta.env.DEV && !(rootElement instanceof HTMLElement)) {
  throw new Error("Root element not found");
}

render(
  () => (
	<App />
  ),
  rootElement!,
);
