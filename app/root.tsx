import { useTranslation } from "react-i18next"
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "react-router"
import type { LinksFunction } from "react-router"
import { useChangeLanguage } from "remix-i18next/react"
import type { Route } from "./+types/root"
import { LanguageSwitcher } from "./library/language-switcher"
import { ClientHintCheck, getHints } from "./services/client-hints"
import tailwindcss from "./tailwind.css?url"

export async function loader({ context, request }: Route.LoaderArgs) {
	const { lang, clientEnv } = context
	const hints = getHints(request)
	return { lang, clientEnv, hints }
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: tailwindcss }]

export const handle = {
	i18n: "common",
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { lang, clientEnv } = loaderData
	useChangeLanguage(lang)
	return (
		<>
			<Outlet />
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: We set the window.env variable to the client env */}
			<script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(clientEnv)}` }} />
		</>
	)
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const { i18n } = useTranslation()
	return (
		<html className="overflow-y-auto overflow-x-hidden" lang={i18n.language} dir={i18n.dir()}>
			<head>
				<ClientHintCheck />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="w-full h-full">
				<LanguageSwitcher />
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export const ErrorBoundary = () => {
	const error = useRouteError()
	const { t } = useTranslation()

	const errorStatusCode = isRouteErrorResponse(error) ? error.status : "500"

	return (
		<div className="placeholder-index relative h-full min-h-screen w-screen flex items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-blue-950 dark:to-blue-900 justify-center dark:bg-white sm:pb-16 sm:pt-8">
			<div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
				<div className="relative  min-h-72 flex flex-col justify-center sm:overflow-hidden sm:rounded-2xl p-1 md:p-4 lg:p-6">
					<h1 className="text-center w-full text-red-600 text-2xl pb-2">{t(`error.${errorStatusCode}.title`)}</h1>
					<p className="text-lg dark:text-white text-center w-full">{t(`error.${errorStatusCode}.description`)}</p>
				</div>
			</div>
		</div>
	)
}
