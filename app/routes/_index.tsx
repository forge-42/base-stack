import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"
import { convertDateToUserTz } from "~/utils/dates"
import type { Route } from "./+types/_index"

export const meta: MetaFunction = () => {
	return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export const loader = ({ request }: Route.LoaderArgs) => {
	const timezoneDate = convertDateToUserTz(new Date(), request)
	return {
		timezoneDate: timezoneDate.toTimeString(),
	}
}

export default function Index({ loaderData }: Route.ComponentProps) {
	const { timezoneDate } = loaderData
	const { t } = useTranslation()

	return (
		<div className="placeholder-index relative h-full min-h-screen w-screen dark:bg-gradient-to-b bg-white  dark:from-blue-950 dark:to-blue-900 dark:text-white sm:pb-16 sm:pt-8">
			<div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
				<div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
					<section className="absolute inset-0">
						<img className="h-full w-full object-cover" src="/banner.png" alt="Cover" />
						<div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply" />
					</section>
					<section className="lg:pb-18 relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pt-32">
						<h1 className="select-none overflow-hidden text-center text-7xl font-medium sm:text-6xl lg:text-8xl">
							<span className="block pb-2 pr-2 text-center font-space uppercase text-white drop-shadow-md">
								<img className="rounded-full size-80 m-auto" src="/logo.png" alt="Forge42 Logo" />
								<span className="block h-full bg-gradient-to-tr from-[#48DDF3] to-[#FB4BB5] bg-clip-text pb-1 pr-1 text-center text-transparent dark:from-indigo-500 dark:to-sky-300 sm:inline sm:pb-0">
									Base&nbsp;
								</span>
								<span className="text-center">Stack</span>
							</span>
						</h1>
						<p className="mx-auto mt-8 max-w-lg text-center text-lg text-white sm:max-w-3xl md:mt-12">
							Welcome to Forge 42 base stack. The minimal stack required to get you up and running. This stack was
							chosen to provide a solid foundation for your project, without the bloat. Check the{" "}
							<a
								href="https://github.com/forge42dev/base-stack"
								target={"_blank"}
								className="text-white no-underline font-bold hover:cursor-pointer focus:text-white"
								rel="noreferrer"
							>
								README.md
							</a>{" "}
							file for detailed instructions.
						</p>
						<div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
							<div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0" />
						</div>
					</section>
				</div>
			</div>

			<div className="w-full text-center text-2xl mt-4">{t("hi")}</div>
			<section className="absolute bottom-1 mb-2 w-full pb-1 pt-2 text-center sm:bottom-2 sm:pb-3 md:mb-0 md:mt-0">
				Crafted with ❤️ / Time without timezone mismatch {timezoneDate}
			</section>
		</div>
	)
}
