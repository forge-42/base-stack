import { reactRouter } from "@react-router/dev/vite"
import { reactRouterDevTools } from "react-router-devtools"
import { devServer } from "react-router-hono-server/dev"
import { defineConfig } from "vite"
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [
		devServer({
			exclude: [/^\/(resources)\/.+/],
		}),
		reactRouterDevTools(),
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
		// biome-ignore lint/nursery/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
})
