import {
	createRootRouteWithContext,
	Outlet,
	RouteComponent,
	useRouterState,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import type { useAuth } from "../app/context/auth";
import type { useTheme } from "../app/context/theme";
import type { useConfig } from "../app/context/config";
import type { useSupabase } from "../app/context/supabase";
import { Navbar } from "@ui/navbar";
import { Footer } from "@ui/footer";
import { ThemeFloatButton } from "../features/theme/components/themeFloatButton";
import { Session } from "@supabase/supabase-js";
import { Component } from "solid-js";

// Define the type for your router context
type RouterContext = {
	auth: ReturnType<typeof useAuth>;
	theme: ReturnType<typeof useTheme>;
	config: ReturnType<typeof useConfig>;
	supabase: ReturnType<typeof useSupabase>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => {
		const loaderData = Route.useLoaderData();
		const loaderContext = Route.useRouteContext();

		return (
			<>
				<Navbar session={loaderData().session} onSignOut={loaderContext().auth.signOut} />
				<main class="px-2 py-5 bg-base-200 md:px-40">
					{/* Outlet is the component that will be rendered based on the current route */}
					<Outlet />
				</main>
				<Footer />
				<ThemeFloatButton />
				<TanStackRouterDevtools position="bottom-left" initialIsOpen={false} />
			</>
		);
	},
	loader: async (ctx): Promise<{ session: Session | null }> => {
		// Preload auth data for all routes
		const session = await ctx.context.auth.getSession();
		return {
			session: session,
		};
	},
});
