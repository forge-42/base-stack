import { generateRobotsTxt } from "@forge42/seo-tools/robots"

import { globalAppContext } from "~/server/context"
import { createDomain } from "~/utils/http"
import type { Route } from "./+types/robots[.]txt"

export async function loader({ request, context }: Route.LoaderArgs) {
	const { env } = context.get(globalAppContext)
	const isProductionDeployment = env.APP_DEPLOYMENT_ENV === "production"
	const domain = createDomain(request)
	const robotsTxt = generateRobotsTxt([
		{
			userAgent: "*",
			[isProductionDeployment ? "allow" : "disallow"]: ["/"],
			sitemap: [`${domain}/sitemap-index.xml`],
		},
	])
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain",
		},
	})
}
