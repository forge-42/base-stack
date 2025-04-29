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
		<div className="relative h-full min-h-screen w-screen bg-white placeholder-index sm:pt-8 sm:pb-16 dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900 dark:text-white">
			<div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
				<div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
					<section className="absolute inset-0">
						<img className="h-full w-full object-cover" src="/banner.png" alt="Cover" />
						<div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply" />
					</section>
					<section className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32 lg:pb-18">
						<h1 className="select-none overflow-hidden text-center font-medium text-7xl sm:text-6xl lg:text-8xl">
							<span className="block pr-2 pb-2 text-center font-space text-white uppercase drop-shadow-md">
								<img className="m-auto size-80 rounded-full" src="/logo.png" alt="Forge42 Logo" />
								<span className="block h-full bg-gradient-to-tr from-[#48DDF3] to-[#FB4BB5] bg-clip-text pr-1 pb-1 text-center text-transparent sm:inline sm:pb-0 dark:from-indigo-500 dark:to-sky-300">
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
								className="font-bold text-white no-underline hover:cursor-pointer focus:text-white"
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

			<div className="mt-4 w-full text-center text-2xl">{t("hi")}</div>
			<section className="absolute bottom-1 mb-2 w-full pt-2 pb-1 text-center sm:bottom-2 sm:pb-3 md:mt-0 md:mb-0">
				Crafted with ❤️ / Time without timezone mismatch {timezoneDate}
			</section>
		</div>
	)
}
