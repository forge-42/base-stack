import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		css: true,
		environment: "happy-dom",
		setupFiles: ["./tests/setup.unit.tsx"],
		include: ["./app/**/*.test.{ts,tsx}"],
		coverage: {
			include: ["app/**/*"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
	},
})
