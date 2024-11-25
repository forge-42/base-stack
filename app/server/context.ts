import type { Context } from "hono"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, initEnv } from "~/env.server"

// Setup the .env vars
const env = initEnv()

export const getLoadContext = async (c: Context) => {
	// get the locale from the context
	const locale = i18next.getLocale(c)
	// get t function for the default namespace
	const t = await i18next.getFixedT(c)

	const clientEnv = getClientEnv()
	return {
		lang: locale,
		t,
		env,
		clientEnv,
		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
		body: c.body,
	}
}

interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> {}

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
	interface AppLoadContext extends Omit<LoadContext, "body"> {}
}
