import type { Component } from "solid-js";
import { useI18n } from "../../i18n";

export const LanguageSwitcher: Component = () => {
	const { locale, setLocale } = useI18n();

	return (
		<div class="dropdown dropdown-end">
			<button type="button" class="btn btn-ghost btn-sm m-1">
				{locale() === "it" ? "🇮🇹 IT" : "🇬🇧 EN"}
			</button>
			<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<button
						type="button"
						onClick={() => setLocale("it")}
						class={locale() === "it" ? "active" : ""}
					>
						🇮🇹 Italiano
					</button>
				</li>
				<li>
					<button
						type="button"
						onClick={() => setLocale("en")}
						class={locale() === "en" ? "active" : ""}
					>
						🇬🇧 English
					</button>
				</li>
			</ul>
		</div>
	);
};
