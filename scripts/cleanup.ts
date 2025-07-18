import { promises as fs } from "node:fs"
import chalk from "chalk"

const appDirectory = "app"

const removeAllReadmeFromApp = async (currentDirectory: string) => {
	const files = await fs.readdir(currentDirectory)

	for (const file of files) {
		// Check if the current file is directory
		const isDirectory = (await fs.stat(`${currentDirectory}/${file}`)).isDirectory()
		if (isDirectory) {
			await removeAllReadmeFromApp(`${currentDirectory}/${file}`)
		}
		if (file.includes("README.md")) {
			await fs.unlink(`${currentDirectory}/${file}`)
		}
	}
}

// biome-ignore lint/suspicious/noConsole: We want to log to the console here
const log = (message: string) => console.log(chalk.green(message))

const removeTheCleanupFromPackageJsonAndScripts = async () => {
	const packageJson = JSON.parse(await fs.readFile("package.json", { encoding: "utf-8" }))
	packageJson.scripts.cleanup = undefined
	packageJson.scripts.postinstall = undefined

	await fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), "utf-8")

	log(chalk.green("Cleanup script is removed from package.json"))
	await fs.unlink("scripts/cleanup.ts")
}

const revertIndexRoute = async () => {
	const file = `import type { MetaFunction } from "react-router";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("hi")}</h1>
    </div>
  );
}
`
	await fs.writeFile("app/routes/_index.tsx", file, "utf-8")
	log(chalk.green("Index route is reverted to empty state"))
}

const removeForgeAssets = async () => {
	await fs.unlink("public/logo.png")
	await fs.unlink("public/base-stack.png")
	await fs.unlink("public/banner.png")
	log(chalk.green("Forge assets are removed from public directory"))
}

const runCleanup = async () => {
	await removeForgeAssets()
	await revertIndexRoute()
	await removeAllReadmeFromApp(appDirectory).then(async () => {
		await fs.unlink("scripts/README.md")
		await fs.unlink("tests/README.md")
		log(chalk.green("All README.md files are removed from app directory"))
	})
	await removeTheCleanupFromPackageJsonAndScripts()
}

await runCleanup()
