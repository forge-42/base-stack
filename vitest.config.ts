import { playwright } from "@vitest/browser-playwright"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		css: true,
		coverage: {
			include: ["app/**"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
		projects: [
			{
				extends: true,
				test: {
					name: "server tests",
					environment: "node",
					// Include generic .test files that should work anywhere and .server.test files for server only, ignore .browser.test
					include: ["./**/*.server.test.{ts,tsx}", "!./**/*.browser.test.{ts,tsx}", "./**/*.test.{ts,tsx}"],
				},
			},
			{
				extends: true,
				optimizeDeps: {
					include: ["react/jsx-dev-runtime"],
				},
				server: {
					fs: {
						strict: false,
					},
				},
				test: {
					includeTaskLocation: true,
					// Include generic .test files that should work anywhere and .browser.test files for browser only, ignore .server.test
					include: ["./**/*.test.{ts,tsx}", "./**/*.browser.test.{ts,tsx}", "!./**/*.server.test.{ts,tsx}"],
					setupFiles: ["./tests/setup.browser.tsx"],
					name: "browser tests",
					browser: {
						enabled: true,
						instances: [{ browser: "chromium" }],
						provider: playwright(),
					},
				},
			},
		],
	},
})
