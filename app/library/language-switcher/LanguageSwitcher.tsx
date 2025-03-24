import { useTranslation } from "react-i18next"
import { useLocation } from "react-router"
import { supportedLanguages } from "~/localization/resource"
import { Link } from "../link"

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const location = useLocation()

	return (
		<div className="flex gap-2 p-2 fixed top-0 right-0 w-min z-10">
			{supportedLanguages.map((language) => (
				<Link
					className="text-blue-500 dark:text-white hover:underline transition-all"
					key={language}
					to={`${location.pathname}`}
					// We override the default appending of the language to the search params via our language
					language={language}
					// We keep the search params if any on language change
					keepSearchParams
					onClick={() => i18n.changeLanguage(language)}
				>
					{language}
				</Link>
			))}
		</div>
	)
}

export { LanguageSwitcher }
