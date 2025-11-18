import * as Solid from "solid-js";
import { createFileRoute, redirect, useRouter, useRouterState } from "@tanstack/solid-router";
import { z } from "zod";

import { SignInForm } from "../features/auth/components/signInForm";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const fallback = "/" as const;

export const Route = createFileRoute("/login")({
	validateSearch: z.object({
		redirect: z.string().optional().catch(""),
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.user()) {
			throw redirect({ to: search.redirect || fallback });
		}
	},
	component: LoginComponent,
});

function LoginComponent() {
	const router = useRouter();
	const isLoading = useRouterState({ select: (s) => s.isLoading });
	const navigate = Route.useNavigate();

	const search = Route.useSearch();

	const handleAuthSuccess = async () => {
		//await router.invalidate();
		//await navigate({ to: search().redirect || fallback });
	};

	return (
		<div class="min-h-screen max-w-screen flex items-center justify-center p-4">
			<SignInForm onSuccess={handleAuthSuccess} />
		</div>
	);
}
