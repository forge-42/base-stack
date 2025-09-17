import { PassThrough } from "node:stream"
import { createReadableStreamFromReadable } from "@react-router/node"
import { createInstance } from "i18next"
import { isbot } from "isbot"
import { renderToPipeableStream } from "react-dom/server"
import { I18nextProvider, initReactI18next } from "react-i18next"
import {
	type EntryContext,
	type HandleDataRequestFunction,
	type RouterContextProvider,
	ServerRouter,
} from "react-router"
import i18n from "./localization/i18n" // your i18n configuration file
import i18nextOpts from "./localization/i18n.server"
import { resources } from "./localization/resource"
import { globalAppContext } from "./server/context"

// Reject all pending promises from handler functions after 10 seconds
export const streamTimeout = 10000

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	context: EntryContext,
	appContext: RouterContextProvider
) {
	const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady"
	const instance = createInstance()
	const ctx = appContext.get(globalAppContext)
	const lng = ctx.lang
	const ns = i18nextOpts.getRouteNamespaces(context)

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
				<ServerRouter context={context} url={request.url} />
			</I18nextProvider>,
			{
				[callbackName]: () => {
					const body = new PassThrough()
					const stream = createReadableStreamFromReadable(body)
					responseHeaders.set("Content-Type", "text/html")

					resolve(
						// @ts-expect-error - We purposely do not define the body as existent so it's not used inside loaders as it's injected there as well
						ctx.body(stream, {
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
					// biome-ignore lint/suspicious/noConsole: We console log the error
					console.error(error)
				},
			}
		)
		// Abort the streaming render pass after 11 seconds so to allow the rejected
		// boundaries to be flushed
		setTimeout(abort, streamTimeout + 1000)
	})
}

/**
 * This adds a cache header to the response for prefetch requests
 *  to avoid double requests as suggested here:
 * https://sergiodxa.com/tutorials/fix-double-data-request-when-prefetching-in-remix
 */
export const handleDataRequest: HandleDataRequestFunction = async (response: Response, { request }) => {
	const isGet = request.method.toLowerCase() === "get"
	const purpose =
		request.headers.get("Purpose") ||
		request.headers.get("X-Purpose") ||
		request.headers.get("Sec-Purpose") ||
		request.headers.get("Sec-Fetch-Purpose") ||
		request.headers.get("Moz-Purpose")
	const isPrefetch = purpose === "prefetch"

	// If it's a GET request and it's a prefetch request and it doesn't have a Cache-Control header
	if (isGet && isPrefetch && !response.headers.has("Cache-Control")) {
		// we will cache for 10 seconds only on the browser
		response.headers.set("Cache-Control", "private, max-age=10")
	}

	return response
}
