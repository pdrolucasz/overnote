import { useEditorState } from "@tiptap/react"
import { Redo } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const RedoButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			disabled: !ctx.editor.can().redo(),
		}),
	})

	return (
		<Button
			variant="ghost"
			type="button"
			onClick={() => editor.chain().focus().redo().run()}
			disabled={state.disabled}
		>
			<Redo className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}
