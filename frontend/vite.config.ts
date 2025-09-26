import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import devtools from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [
		solidPlugin(),
		tailwindcss(),
		devtools({
			autoname: true, // e.g. enable autoname
		}),
	],
	server: {
		host: "127.0.0.1",
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	resolve: {
		alias: {
			"@ui": path.resolve(__dirname, "./src/components/ui"),
		},
	},
});
