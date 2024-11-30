import * as Module from "./_index"

describe("Home route", () => {
	it("should render the home page text properly in english", async ({
		renderStub,
		/** debug */
	}) => {
		const { container } = await renderStub({
			entries: [
				{
					id: "home",
					path: "/",
					Component: Module.default,
				},
			],
		})
		// debug()
		expect(
			container.queryByText("React Router is awesome!", {
				exact: false,
			})
		).not.toBeNull()
	})

	it("should render the home page text properly in bosnian", async ({ renderStub }) => {
		const { container } = await renderStub({
			entries: [
				{
					id: "home",
					path: "/",
					Component: Module.default,
				},
			],
			i18n: {
				lng: "bs",
			},
		})

		expect(
			container.queryByText("React Router je zakon!", {
				exact: false,
			})
		).not.toBeNull()
	})
})
