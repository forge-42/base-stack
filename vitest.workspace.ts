import { defineWorkspace } from "vitest/config"

// biome-ignore lint/nursery/noProcessEnv: Figure out the bug with --browser.headless, should work without this at all
const isHeadless = process.argv.includes("--browser.headless") || !!process.env.CI

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
				enabled: true,
				headless: isHeadless,
				name: "chromium",
				provider: "playwright",
				// https://playwright.dev
				providerOptions: {},
			},
		},
	},
])
