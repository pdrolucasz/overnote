import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCallback, useMemo } from "react"
import { useEditorState } from "@tiptap/react"

import { ChevronDown } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

const HEADING_LEVELS = [1, 2, 3, 4, 5] as const
type LevelProps = 1 | 2 | 3 | 4 | 5

type Heading = "p" | `h${(typeof HEADING_LEVELS)[number]}`

export const HeadingDropDownMenu = () => {
	const { editor } = useRichTextEditorContext()

	const current = useEditorState({
		editor,
		selector: (ctx) => {
			const { editor } = ctx
			if (editor.isActive("paragraph")) return "p" as Heading

			const headingLevel = HEADING_LEVELS.find((level) => editor.isActive("heading", { level }))
			if (headingLevel) return `h${headingLevel}` as Heading

			return null
		},
	})

	const options = useMemo(() => [
		{
			value: "p",
			label: "Paragraph",
		},
		{
			value: "h1",
			label: "Heading 1",
		},
		{
			value: "h2",
			label: "Heading 2",
		},
		{
			value: "h3",
			label: "Heading 3",
		},
		{
			value: "h4",
			label: "Heading 4",
		},
		{
			value: "h5",
			label: "Heading 5",
		},
	], [])

	const onSelect = useCallback((value: Heading) => {
		if (value.startsWith("h")) {
			editor
				.chain()
				.focus()
				.setHeading({ level: +value[1] as LevelProps })
				.run()
		} else {
			editor.chain().focus().setParagraph().run()
		}
	}, [editor])

	const currentLabel = useMemo(() => {
		return options.find((option) => option.value === current)?.label || "Headings"
	}, [current, options])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{currentLabel}</span>
					</div>
					<ChevronDown className="ml-auto size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-max rounded-lg"
				side="bottom"
				align="center"
				sideOffset={4}
			>
				{options.map(option => (
					<DropdownMenuItem
						key={option.value}
						data-active={option.value === current || undefined}
						data-heading={option.value}
						className="cursor-pointer"
						onSelect={() => onSelect(option.value as Heading)}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
