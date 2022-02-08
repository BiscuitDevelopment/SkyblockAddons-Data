import { writeFileSync } from "node:fs"

import Ota from "@crowdin/ota-client"

const otaClient = new Ota("d7578b29286a48bcaf7fec87zgb")

async function main() {
	const [translations, formattedLangs, languages] = await Promise.all([
			otaClient.getTranslations(),
			otaClient.getReplacedLanguages("%locale_with_underscore%"),
			otaClient.listLanguages(),
		]),
		result: Record<string, { translation: string; url: string }> = {}

	Object.entries(translations)
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([languageCode, translations], i) => {
			result[formattedLangs[languages.indexOf(languageCode)]] = translations[0].content.language
		})

	writeFileSync("./languageNames.json", JSON.stringify(result, null, "\t"))
}

main()
