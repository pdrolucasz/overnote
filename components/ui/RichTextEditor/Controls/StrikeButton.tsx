import React from "react"
import { useEditorState } from "@tiptap/react"

import { Strikethrough } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const StrikeButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			active: ctx.editor.isActive("strike"),
			disabled: !ctx.editor.can().toggleStrike(),
		}),
	})

	return (
		<Button
			variant={state.active ? "default" : "ghost"}
			type="button"
			onClick={() => editor.chain().focus().toggleStrike().run()}
			disabled={state.disabled}
		>
			<Strikethrough className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}
