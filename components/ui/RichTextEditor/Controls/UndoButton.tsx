import { useEditorState } from "@tiptap/react"
import { Undo } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

export const UndoButton = () => {
	const { editor } = useRichTextEditorContext()

	const state = useEditorState({
		editor,
		selector: (ctx) => ({
			disabled: !ctx.editor.can().undo(),
		}),
	})

	return (
		<Button
			variant="ghost"
			type="button"
			onClick={() => editor.chain().focus().undo().run()}
			disabled={state.disabled}
		>
			<Undo className="h-4 w-4 text-muted-500" strokeWidth={3} />
		</Button>
	)
}
