# Testing react-router apps

This directory contains the setup for testing react-router apps. It includes the `setup.unit.tsx` file which sets up the testing environment for unit tests.

The `setup.unit.tsx` file is used to set up the testing environment for unit tests in the following ways:
1. It sets up the i18next instance with the `i18n` configuration.
2. It extends your test context with the `renderStub` function which is used to render the react-router routes.
3. It extends your test context with the `debug` function which is used to debug your unit tests with `jest-preview`.

The `renderStub` function is used to render the react-router routes and return the container. It takes the following arguments:
- `props`: Optional props to be passed into the react-router stub.
- `entries`: Optional entries to be passed into the react-router stub.
- `i18n`: Optional i18n configuration to be passed into the react-router stub.

The `debug` function is used to debug your unit tests with `jest-preview`. To use it, run your tests by running:


```bash
pnpm test:live
```

This will run your tests in watch mode and you can use the `debug` function to debug your tests.
This will do two things:
1. Start the `jest-preview` server.
2. Open the `jest-preview` server in your browser.
3. Start `vitest` in UI mode.

You can use the `debug` function to debug your tests by adding the following code to your test:

```ts
it("should do something", ({ debug }) => {
	// Your test code here
	 debug()
})
```

This will render the tests current state into the `jest-preview` server and you can use the `debug` function to debug your tests.

## Benefits

- It sets up the i18next instance with the `i18n` configuration.
- It extends your test context with the `renderStub` function which is used to render the react-router routes.
- It extends your test context with the `debug` function which is used to debug your unit tests with `jest-preview`.
- It sets up the testing environment for unit tests

## How to use

1. Extract the `renderStub` function from the vitest test context.
```ts
test("should do something", async ({ renderStub }) => {
	 // Your test code here
})
```

2. Use the `renderStub` function to render the react-router routes.
```ts
test("should do something", async ({ renderStub }) => {
	const { container } = await renderStub({
		props: {
			initialEntries: ["/"],
		},
		entries: [
			{
				id: "home",
				path: "/",
				Component: Home,
				...Home,
			},
		],
	})
})
```

3. Test your routes by using the `container` object.
```ts
test("should do something", async ({ renderStub }) => {
	const { container } = await renderStub({
		props: {
			initialEntries: ["/"],
		},
		entries: [
			{
				id: "home",
				path: "/",
				Component: Home,
				...Home,
			},
		],
	})
	expect(container.queryByText("Home", { exact: false })).not.toBeNull()
})
```
