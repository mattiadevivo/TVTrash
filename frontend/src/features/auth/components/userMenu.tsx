import { Component } from "solid-js";
import { User } from "@supabase/supabase-js";
import { Link } from "@tanstack/solid-router";

type Props = {
	readonly user: User;
	readonly onSignOut: () => Promise<void>;
};

export const UserMenu: Component<Props> = (props) => {
	const email = props.user.email;

	return (
		<div class="dropdown dropdown-end">
			<button tabindex="0" type="button" class="flex flex-row items-center gap-2 btn btn-ghost p-0">
				<span
					class="avatar bg-accent items-center justify-center overflow-hidden text-xs rounded-md hover:border-transparent h-8 w-8"
					data-state="closed"
				>
					<span class="items-center justify-center">{email?.charAt(0).toUpperCase()}</span>
				</span>
				<div class="hidden md:flex">
					<p class="min-w-0 max-w-48 truncate">{email || "User"}</p>
				</div>
			</button>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<Link to="/account/notifications">Notification Settings</Link>
				</li>
				<li>
					<button type="button" onClick={props.onSignOut}>
						Logout
					</button>
				</li>
			</ul>
		</div>
	);
};
