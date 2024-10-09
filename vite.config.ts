import { reactRouter } from "@react-router/dev/vite"
import { devServer } from "react-router-hono-server/dev"
import { remixDevTools } from "remix-development-tools"
import { defineConfig } from "vite"
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [
		devServer({
			exclude: [/^\/(resources)\/.+/],
		}),
		remixDevTools(),
		reactRouter(),
		tsconfigPaths(),
		iconsSpritesheet({
			inputDir: "./resources/icons",
			outputDir: "./app/library/icon/icons",
			fileName: "icon.svg",
			withTypes: true,
		}),
	],
	build: {
		target: "esnext",
	},
	server: {
		open: true,
		port: 4280,
	},
})
