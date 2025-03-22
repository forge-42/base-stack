import english from "../../resources/locales/en/common.json"
import portuguese from "../../resources/locales/pt/common.json"
const languages = ["en", "pt"] as const
export const supportedLanguages = [...languages]
export type Language = (typeof languages)[number]

type Resource = {
	common: typeof english
}

export type Namespace = keyof Resource

export const resources: Record<Language, Resource> = {
	en: {
		common: english,
	},
	pt: {
		common: portuguese,
	},
}
