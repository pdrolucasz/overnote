import { FC } from "react"
import { UseEditorOptions } from "@tiptap/react"
import { mergeAttributes } from '@tiptap/core'

import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import Paragraph from "@tiptap/extension-paragraph"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"

import { Controls } from "./Controls"
import { RichTextEditorProvider } from "./Provider"

type LevelProps = 1 | 2 | 3 | 4 | 5

interface RichTextEditorProps {
	defaultValue?: string
	handleUpdate: (value: string) => void
}

export const RichTextEditor: FC<RichTextEditorProps> = ({ handleUpdate, defaultValue = "" }) => {

	const editorOptions: UseEditorOptions = {
		content: defaultValue,
		extensions: [
			StarterKit.configure({
				heading: false,
				paragraph: false,
				orderedList: {
					HTMLAttributes: {
						class: "list-decimal ml-3",
					},
				},
				bulletList: {
					HTMLAttributes: {
						class: "list-disc ml-3",
					},
				}
			}),
			Paragraph.configure({
				HTMLAttributes: {
					class: "text-base"
				}
			}),
			Heading.configure({ levels: [1, 2, 3, 4, 5] }).extend({
				levels: [1, 2, 3, 4, 5],
				renderHTML({ node, HTMLAttributes }) {
					const level: LevelProps = this.options.levels.includes(node.attrs.level)
						? node.attrs.level
						: this.options.levels[0]

					const classes = {
						1: "text-4xl font-bold",
						2: "text-3xl font-bold",
						3: "text-2xl font-bold",
						4: "text-xl font-bold",
						5: "text-lg",
					}

					return [
						`h${level}`,
						mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
							class: `${classes[level]}`,
						}),
						0,
					]
				}
			}),
			Underline.configure(),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "min-h-[256px] max-h-[640px] p-4 text-base overflow-auto cursor-text rounded-b-md md:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			}
		},
		onUpdate: ({ editor }) => {
			handleUpdate(editor.getHTML())
		},
	}

	return (
		<RichTextEditorProvider
			slotBefore={<Controls />}
			editorOptions={editorOptions}
		/>
	)
}
