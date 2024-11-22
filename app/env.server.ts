import { z } from "zod"

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	APP_DEPLOYMENT_ENV: z.enum(["staging", "production"]),
})

type APP_ENV = z.infer<typeof envSchema>
let env: APP_ENV
/**
 * Helper method used for initializing .env vars in your entry.server.ts file. It uses
 * zod to validate your .env and throws if it's not valid.
 * @returns Initialized env vars
 */
export const initEnv = () => {
	// biome-ignore lint/nursery/noProcessEnv: This should be the only place to use process.env directly
	const envData = envSchema.safeParse(process.env)

	if (!envData.success) {
		// biome-ignore lint/suspicious/noConsole: We want this to be logged
		console.error("❌ Invalid environment variables:", envData.error.flatten().fieldErrors)
		throw new Error("Invalid environment variables")
	}

	env = envData.data

	// Do not log the message when running tests
	if (env.NODE_ENV !== "test") {
		// biome-ignore lint/suspicious/noConsole: We want this to be logged
		console.log("✅ Environment variables loaded successfully")
	}
	return envData.data
}

/**
 * Helper method for you to return client facing .env vars, only return vars that are needed on the client.
 * Otherwise you would expose your server vars to the client if you returned them from here as this is
 * directly sent in the root to the client and set on the window.env
 * @returns Subset of the whole process.env to be passed to the client and used there
 */
export const getClientEnv = () => {
	const serverEnv = env
	return {
		NODE_ENV: serverEnv.NODE_ENV,
	}
}

type CLIENT_ENV = ReturnType<typeof getClientEnv>

declare global {
	interface Window {
		env: CLIENT_ENV
	}
	namespace NodeJS {
		interface ProcessEnv extends APP_ENV {}
	}
}
