import { cacheHeader } from "pretty-cache-header"
import { z } from "zod/v4"
import { type Language, type Namespace, resources } from "~/localization/resource"
import { globalAppContext } from "~/server/context"
import type { Route } from "./+types/resource.locales"

export async function loader({ request, context }: Route.LoaderArgs) {
	const { isProductionDeployment } = context.get(globalAppContext)
	const url = new URL(request.url)

	const lng = z.enum(Object.keys(resources) as Language[]).parse(url.searchParams.get("lng"))

	const namespaces = resources[lng]

	const ns = z.enum(Object.keys(resources[lng]) as Namespace[]).parse(url.searchParams.get("ns"))

	const headers = new Headers()

	// On production, we want to add cache headers to the response
	if (isProductionDeployment) {
		headers.set(
			"Cache-Control",
			cacheHeader({
				maxAge: "5m",
				sMaxage: "1d",
				staleWhileRevalidate: "7d",
				staleIfError: "7d",
			})
		)
	}

	return Response.json(namespaces[ns], { headers })
}
