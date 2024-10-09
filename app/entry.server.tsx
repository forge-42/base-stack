import { PassThrough } from "node:stream"
import { createReadableStreamFromReadable } from "@react-router/node"
import type { Context } from "hono"
import { createInstance } from "i18next"
import { isbot } from "isbot"
import { renderToPipeableStream } from "react-dom/server"
import { I18nextProvider, initReactI18next } from "react-i18next"
import { type AppLoadContext, type EntryContext, ServerRouter } from "react-router"
import { createHonoServer } from "react-router-hono-server/node"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, initEnv } from "./env.server"
import i18n from "./localization/i18n" // your i18n configuration file
import i18nextOpts from "./localization/i18n.server"
import { resources } from "./localization/resource"
const ABORT_DELAY = 5000

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	context: EntryContext,
	appContext: AppLoadContext
) {
	const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady"
	const instance = createInstance()
	const lng = appContext.lang
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const ns = i18nextOpts.getRouteNamespaces(context as any)

	await instance
		.use(initReactI18next) // Tell our instance to use react-i18next
		.init({
			...i18n, // spread the configuration
			lng, // The locale we detected above
			ns, // The namespaces the routes about to render wants to use
			resources,
		})

	return new Promise((resolve, reject) => {
		let didError = false

		const { pipe, abort } = renderToPipeableStream(
			<I18nextProvider i18n={instance}>
				<ServerRouter abortDelay={ABORT_DELAY} context={context} url={request.url} />
			</I18nextProvider>,
			{
				[callbackName]: () => {
					const body = new PassThrough()
					const stream = createReadableStreamFromReadable(body)
					responseHeaders.set("Content-Type", "text/html")

					resolve(
						// @ts-expect-error - We purposely do not define the body as existent so it's not used inside loaders as it's injected there as well
						appContext.body(stream, {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						})
					)

					pipe(body)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				onError(error: unknown) {
					didError = true

					console.error(error)
				},
			}
		)

		setTimeout(abort, ABORT_DELAY)
	})
}

// Code below used to initialize our own Hono server!
// Setup the .env vars
const env = initEnv()

const getLoadContext = async (c: Context) => {
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

export const server = await createHonoServer({
	configure(server) {
		server.use("*", i18next(i18nextOpts))
	},
	defaultLogger: false,
	getLoadContext,
})
