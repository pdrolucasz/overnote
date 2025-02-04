import React from "react"
import { useEditorState } from "@tiptap/react"

import { ListOrdered } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const ListOrderedButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			active: ctx.editor.isActive("orderedList"),
			disabled: !ctx.editor.can().toggleOrderedList(),
		}),
	})

	return (
		<Button
			variant={state.active ? "default" : "ghost"}
			type="button"
			onClick={() => editor.chain().focus().toggleOrderedList().run()}
			disabled={state.disabled}
		>
			<ListOrdered className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}
