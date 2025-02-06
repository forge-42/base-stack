import { getHintUtils } from "@epic-web/client-hints"
import { clientHint as colorSchemeHint, subscribeToSchemeChange } from "@epic-web/client-hints/color-scheme"
import { clientHint as reducedMotionHint, subscribeToMotionChange } from "@epic-web/client-hints/reduced-motion"
import { clientHint as timeZoneHint } from "@epic-web/client-hints/time-zone"
import { useEffect } from "react"
import { useRevalidator, useRouteLoaderData } from "react-router"
import type { Route } from "../+types/root"

export const { getHints, getClientHintCheckScript } = getHintUtils({
	theme: colorSchemeHint,
	timeZone: timeZoneHint,
	reducedMotion: reducedMotionHint,
	// add other hints here
})

export const getTimeZone = (request?: Request) => getHints(request).timeZone

export function useHints() {
	const requestInfo = useRouteLoaderData<Route.ComponentProps["loaderData"]>("root")
	return requestInfo?.hints
}

export function ClientHintCheck({ nonce }: { nonce?: string }) {
	const { revalidate } = useRevalidator()
	useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate])
	useEffect(() => subscribeToMotionChange(() => revalidate()), [revalidate])

	return (
		<script
			nonce={nonce}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: We want to run this script on the client
			dangerouslySetInnerHTML={{
				__html: getClientHintCheckScript(),
			}}
		/>
	)
}
