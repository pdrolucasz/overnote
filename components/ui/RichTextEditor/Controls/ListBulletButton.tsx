import React from "react"
import { useEditorState } from "@tiptap/react"

import { List } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const ListBulletButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			active: ctx.editor.isActive("bulletList"),
			disabled: !ctx.editor.can().toggleBulletList(),
		}),
	})

	return (
		<Button
			variant={state.active ? "default" : "ghost"}
			type="button"
			onClick={() => editor.chain().focus().toggleBulletList().run()}
			disabled={state.disabled}
		>
			<List className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}
