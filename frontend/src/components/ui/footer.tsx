import type { Component } from "solid-js";

export const Footer: Component = () => {
	return (
		<footer class="footer sm:footer-horizontal bg-base-100 text-base-content items-center p-4">
			<aside class="grid-flow-col items-center justify-self-center md:justify-self-start">
				<img src="/favicon.png" alt="TVTrash logo" class="size-8" />
				<p>TVTrash -</p>
				<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
			</aside>
			<div class="grid-flow-col justify-self-center md:justify-self-end">
				Made with ❤️ by <a href="https://mattiadevivo.dev">Mattia De Vivo</a>
			</div>
		</footer>
	);
};
