import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/_authed/account/notifications")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/account/notifications"!</div>;
}
