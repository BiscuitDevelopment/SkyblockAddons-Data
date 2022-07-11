import { writeFileSync } from "node:fs"

import Ota from "@crowdin/ota-client"

const otaClient = new Ota("d7578b29286a48bcaf7fec87zgb");

(async function () {
	const [translations, formattedLangs, languages] = await Promise.all([
			otaClient.getTranslations(),
			otaClient.getReplacedLanguages("%locale_with_underscore%"),
			otaClient.listLanguages(),
		]),
		result: Record<string, string> = {}

	for (const [languageCode, translation] of Object.entries(translations).sort(([a], [b]) => a.localeCompare(b)))
		result[formattedLangs[languages.indexOf(languageCode)]] = translation[0].content.language

	writeFileSync("./languageNames.json", JSON.stringify(result, null, "\t"))
})()
