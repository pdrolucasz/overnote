import React from "react"
import { useEditorState } from "@tiptap/react"

import { Italic } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const ItalicButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			active: ctx.editor.isActive("italic"),
			disabled: !ctx.editor.can().toggleItalic(),
		}),
	})

	return (
		<Button
			variant={state.active ? "default" : "ghost"}
			type="button"
			onClick={() => editor.chain().focus().toggleItalic().run()}
			disabled={state.disabled}
		>
			<Italic className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}