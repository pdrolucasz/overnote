import React from "react"
import { useEditorState } from "@tiptap/react"

import { Underline } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const UnderlineButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			active: ctx.editor.isActive("underline"),
			disabled: !ctx.editor.can().toggleUnderline(),
		}),
	})

	return (
		<Button
			variant={state.active ? "default" : "ghost"}
			type="button"
			onClick={() => editor.chain().focus().toggleUnderline().run()}
			disabled={state.disabled}
		>
			<Underline className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}
