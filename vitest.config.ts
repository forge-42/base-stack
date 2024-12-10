import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		css: true,
		root: "app",
		coverage: {
			all: false,
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
	},
})
