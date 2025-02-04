import React from "react"
import { useEditorState } from "@tiptap/react"

import { Bold } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const BoldButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			active: ctx.editor.isActive("bold"),
			disabled: !ctx.editor.can().toggleBold(),
		}),
	})

	return (
		<Button
			variant={state.active ? "default" : "ghost"}
			type="button"
			onClick={() => editor.chain().focus().toggleBold().run()}
			disabled={state.disabled}
		>
			<Bold className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}