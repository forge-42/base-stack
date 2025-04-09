import { getTimeZone } from "../services/client-hints"

function convertTz(date: string | Date, tzString: string) {
	const dateToConvert = typeof date === "string" ? new Date(date) : date
	// Convert to the target timezone
	const convertedDate = new Date(dateToConvert.toLocaleString("en-US", { timeZone: tzString }))
	return convertedDate
}

export function convertDateToUserTz(date: Date | string, request?: Request) {
	const tz = getTimeZone(request)
	const dates = convertTz(date, tz)
	return dates
}
