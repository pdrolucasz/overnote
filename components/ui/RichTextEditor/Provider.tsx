import {
	createContext,
	ReactNode,
	RefObject,
	useContext,
	useRef,
} from "react"

import { Editor, EditorContent, useEditor, type UseEditorOptions } from "@tiptap/react"

type RichTextEditorContextType = {
	editor: Editor
	contentElement: RefObject<Element>
}

const RichTextEditorContext = createContext<RichTextEditorContextType>({} as RichTextEditorContextType)
const useRichTextEditorContext = () => useContext(RichTextEditorContext)

type RichTextEditorProviderProps = {
	slotBefore?: ReactNode
	editorOptions: UseEditorOptions
	children?: ReactNode
}

const RichTextEditorProvider = ({
	children,
	editorOptions,
	slotBefore,
}: RichTextEditorProviderProps) => {
	const contentElement = useRef<HTMLDivElement>(null)
	const editor = useEditor(editorOptions)

	if (!editor) {
		return null
	}

	const editorContent = (
		<div className="flex flex-col w-full rounded-md border border-input bg-transparent shadow-sm">
			{slotBefore}
			<EditorContent ref={contentElement} editor={editor} required id="content" name="content" />
			{children}
		</div>
	)

	return (
		<RichTextEditorContext.Provider
			value={{
				editor,
				contentElement
			}}
		>
			{editorContent}
		</RichTextEditorContext.Provider>
	)
}

export { RichTextEditorProvider, useRichTextEditorContext }
