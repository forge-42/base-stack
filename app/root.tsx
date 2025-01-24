import { useTranslation } from "react-i18next"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import type { LinksFunction } from "react-router"
import { useChangeLanguage } from "remix-i18next/react"
import type { Route } from "./+types/root"
import { LanguageSwitcher } from "./library/language-switcher"
import tailwindcss from "./tailwind.css?url"

export async function loader({ context }: Route.LoaderArgs) {
	const { lang, clientEnv } = context
	return { lang, clientEnv }
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
