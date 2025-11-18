import { createFileRoute, redirect } from "@tanstack/solid-router";

export const Route = createFileRoute("/_authed")({
	beforeLoad: async ({ context }) => {
		const session = await context.auth.getSession();
		console.log("Session:", session);
		if (!session || !session.user) {
			throw redirect({ to: "/login" });
		}
	},
});
