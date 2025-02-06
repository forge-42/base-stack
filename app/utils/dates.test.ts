import { convertDateToUserTz, convertTz } from "app/utils/dates"

describe("convertTz Test suite", () => {
	it("should convert date to user tz if there is a difference (1h)", () => {
		const date = new Date()
		const serverTz = "Europe/London"
		const convertedServerDate = convertTz(date, serverTz)
		const userTz = "Europe/Berlin"
		const convertedClientDate = convertTz(date, userTz)
		const differenceInMinutes = Math.round(
			Math.abs(convertedClientDate.getTime() - convertedServerDate.getTime()) / 60000
		)
		expect(differenceInMinutes).toBe(60)
	})

	it("should stay the same if no difference", () => {
		const date = new Date()
		const serverTz = "Europe/London"
		const convertedServerDate = convertTz(date, serverTz)
		const userTz = "Europe/London"
		const convertedClientDate = convertTz(date, userTz)
		const differenceInMinutes = Math.round(
			Math.abs(convertedClientDate.getTime() - convertedServerDate.getTime()) / 60000
		)
		expect(differenceInMinutes).toBe(0)
	})
})

describe("convertDateToUserTz Test suite", () => {
	it("should convert date to user tz if there is a difference", () => {
		const request = new Request("http://localhost:3000", {
			headers: {
				"CH-time-zone": "Europe/London",
			},
			method: "GET",
		})
		const date = new Date()
		const serverDate = convertTz(date, "Europe/Berlin")
		const clientDate = convertDateToUserTz(date, request)
		const differenceInMinutes = Math.round(Math.abs(clientDate.getTime() - serverDate.getTime()) / 60000)
		expect(differenceInMinutes).toBe(60)
	})

	it("should convert date to user tz if there is a difference", () => {
		const request = new Request("http://localhost:3000", {
			headers: {
				"CH-time-zone": "Europe/London",
			},
			method: "GET",
		})
		const date = new Date()
		const serverDate = convertTz(date, "Europe/London")
		const clientDate = convertDateToUserTz(date, request)
		const differenceInMinutes = Math.round(Math.abs(clientDate.getTime() - serverDate.getTime()) / 60000)
		expect(differenceInMinutes).toBe(0)
	})
})
