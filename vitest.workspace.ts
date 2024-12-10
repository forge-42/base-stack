import { defineConfig, defineWorkspace } from "vitest/config"

import tsconfigPaths from "vite-tsconfig-paths"

const serverTestConfig = defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		name: "server tests",
		globals: true,
		css: true,
		environment: "node",
		include: ["./app/**/*.server.test.{ts,tsx}"],
		coverage: {
			include: ["./app/**/*"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
	},
})

const browserTestConfig = defineConfig({
	plugins: [tsconfigPaths()],
	optimizeDeps: {
		include: ["react/jsx-dev-runtime"],
	},
	server: {
		fs: {
			strict: false,
		},
	},
	test: {
		globals: true,
		css: true,
		includeTaskLocation: true,
		include: ["./**.test.{ts,tsx}", "!./**.server.test.{ts,tsx}"],
		setupFiles: ["./tests/setup.browser.tsx"],
		coverage: {
			include: ["./app/**/*"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},

		name: "browser tests",
		browser: {
			// biome-ignore lint/nursery/noProcessEnv: we want to use process.env here
			headless: !!process.env.CI,
			enabled: true,
			name: "chromium",
			provider: "playwright",

			// https://playwright.dev
			providerOptions: {},
		},
	},
})

export default defineWorkspace([serverTestConfig, browserTestConfig])
