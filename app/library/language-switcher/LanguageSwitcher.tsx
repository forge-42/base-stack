import { useTranslation } from "react-i18next"
import { useLocation } from "react-router"
import { supportedLanguages } from "~/localization/resource"
import { Link } from "../link"

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const location = useLocation()
	const to = location.pathname

	return (
		<div className="flex gap-2 p-2 fixed top-0 right-0 w-min z-10">
			{supportedLanguages.map((language) => (
				<Link
					className="text-blue-500 dark:text-white hover:underline transition-all"
					key={language}
					to={`${to}?lng=${language}`}
					onClick={() => i18n.changeLanguage(language)}
				>
					{language}
				</Link>
			))}
		</div>
	)
}

export { LanguageSwitcher }
