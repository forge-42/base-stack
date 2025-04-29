import { useTranslation } from "react-i18next"
import { href, useNavigate } from "react-router"
import { Icon } from "~/library/icon/Icon"
import { Link } from "~/library/link"

export default function Route404() {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const to = href("/")
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 dark:from-blue-950 dark:to-blue-900 dark:text-white">
			<div className="w-full max-w-2xl text-center">
				<div className="mb-8 flex justify-center">
					<Icon name="Ghost" className="h-24 w-24 animate-float text-indigo-600" />
				</div>

				<h1 className="mb-4 font-bold text-6xl text-gray-900 dark:text-white">404</h1>
				<h2 className="mb-4 font-semibold text-3xl text-gray-800 dark:text-white">{t("error.404.title")}</h2>
				<p className="mb-8 text-gray-600 text-lg dark:text-white">{t("error.404.description")}</p>

				<div className="flex flex-col justify-center gap-4 sm:flex-row">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 font-medium text-base text-indigo-700 transition-colors duration-300 hover:bg-indigo-200"
					>
						{t("navigation.back")}
					</button>
					<Link
						to={to}
						className="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 font-medium text-base text-white transition-colors duration-300 hover:bg-indigo-700"
					>
						{t("navigation.home")}
					</Link>
				</div>
			</div>
		</div>
	)
}
