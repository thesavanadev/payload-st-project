import { Config } from "payload";

import {
	BoldFeature,
	ItalicFeature,
	LinkFeature,
	ParagraphFeature,
	UnderlineFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";

const lexical: Config["editor"] = lexicalEditor({
	features: () => {
		return [
			ParagraphFeature(),
			UnderlineFeature(),
			BoldFeature(),
			ItalicFeature(),
			LinkFeature({
				enabledCollections: [],
				fields: ({ defaultFields }) => {
					const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
						if ("name" in field && field.name === "url") return false;
						return true;
					});

					return [
						...defaultFieldsWithoutUrl,
						{
							name: "url",
							label: ({ t }) => t("fields:enterURL"),
							type: "text",
							required: true,
							admin: {
								condition: ({ linkType }) => linkType !== "internal",
							},
						},
					];
				},
			}),
		];
	},
});

export { lexical };
