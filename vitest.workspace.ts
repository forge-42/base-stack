import { defineWorkspace } from "vitest/config"

export default defineWorkspace([
	{
		extends: "./vitest.config.ts",
		test: {
			name: "server tests",
			environment: "node",
			include: ["./**/*.server.test.{ts,tsx}"],
		},
	},
	{
		extends: "./vitest.config.ts",
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
			include: ["./**.test.{ts,tsx}", "!./**.server.test.{ts,tsx}"],
			setupFiles: ["./tests/setup.browser.tsx"],
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
	},
])
