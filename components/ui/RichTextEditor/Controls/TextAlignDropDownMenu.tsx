import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCallback, useMemo } from "react"
import { useEditorState } from "@tiptap/react"

import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown } from "lucide-react"

import { Button } from "../../button"
import { useRichTextEditorContext } from "../Provider"

const TEXT_ALIGN = ["left", "center", "right", "justify"] as const
type TextAlignProps = "left" | "center" | "right" | "justify"

export const TextAlignDropDownMenu = () => {
	const { editor } = useRichTextEditorContext()

	const current = useEditorState({
		editor,
		selector: (ctx) => {
			const { editor } = ctx

			const textAlign = TEXT_ALIGN.find((align) => editor.isActive({ "textAlign": align }))
			if (textAlign) return textAlign

			return null
		},
	})

	const options = useMemo(() => [
		{
			value: "left",
			icon: <AlignLeft className="h-4 w-4 text-muted-500" strokeWidth={3} />,
		},
		{
			value: "center",
			icon: <AlignCenter className="h-4 w-4 text-muted-500" strokeWidth={3} />,
		},
		{
			value: "right",
			icon: <AlignRight className="h-4 w-4 text-muted-500" strokeWidth={3} />,
		},
		{
			value: "justify",
			icon: <AlignJustify className="h-4 w-4 text-muted-500" strokeWidth={3} />,
		},
	], [])

	const onSelect = useCallback((value: TextAlignProps) => {
		editor
			.chain()
			.focus()
			.setTextAlign(value)
			.run()
	}, [editor])

	const currentTextAlign = useMemo(() => {
		return options.find((option) => option.value === current)?.icon || options[0].icon
	}, [current, options])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="px-2 py-1 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="grid flex-1 text-left text-sm leading-tight">
						{currentTextAlign}
					</div>
					<ChevronDown className="ml-auto size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="flex w-[--radix-dropdown-menu-trigger-width] min-w-max rounded-lg"
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
						onSelect={() => onSelect(option.value as TextAlignProps)}
					>
						{option.icon}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
