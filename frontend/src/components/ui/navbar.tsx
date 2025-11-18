import { type Component, Show } from "solid-js";
import { UserMenu } from "../../features/auth/components/userMenu";
import { Link } from "@tanstack/solid-router";
import { Session } from "@supabase/supabase-js";

interface Navbar {
	session: Session | null;
	onSignOut: () => Promise<void>;
}

export const Navbar: Component<Navbar> = (props) => {
	return (
		<div class="navbar justify-between bg-base-100 text-base-content shadow-sm">
			<div class="flex-1">
				<Link class="btn btn-ghost text-xl" to="/">
					<img src="/favicon.png" alt="TVTrash logo" class="size-8 " />
					TVTrash
				</Link>
			</div>

			<div class="flex items-center h-14 gap-2">
				<Link to="/" class="btn btn-primary btn-sm">
					Calendar
				</Link>

				<Show
					when={props.session}
					fallback={
						<Link to="/login" class="btn btn-accent btn-sm">
							Sign in
						</Link>
					}
				>
					{props.session && <UserMenu user={props.session.user} onSignOut={props.onSignOut} />}
				</Show>
			</div>
		</div>
	);
};
